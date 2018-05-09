var redisClient = require('../module/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
    // collaboration sessions
    // record all the participants in each session
    // so that server can send changes to all participants in a session
    const collaborations = {};
    // map from socketId to sessionId
    const socketIdToSessionId = {};
    // redis can serve different apps, each has its own session.
    var sessionPath = 'temp_session';

    io.on('connection', (socket) => {
        // get sessionId
        let sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;

        if (sessionId in collaborations) { // in memory
            collaborations[sessionId]['participants'].push(socket.id);
        } else { // if not in memmory, check in redis
            redisClient.get(sessionPath + '/' + sessionId, function(data) {
                // if in redis, restore changes from redis
                if (data) {
                    console.log('session terminated previously; pulling back from redis');
                    collaborations[sessionId] = {
                        'cachedChangeEvents': JSON.parse(data),
                        'participants': [] // we'll add the current participant later
                    };
                } else {
                    // first time created or expired
                    console.log('creating new session');
                    collaborations[sessionId] = {
                        'cachedChangeEvents': [],
                        'participants': []
                    };
                }
                collaborations[sessionId]['participants'].push(socket.id);
            })
        }

        // socket event listeners
        // delta is the change info
        // it records the row and cloumn of the changes
        socket.on('change', delta => {
            console.log("change " + socketIdToSessionId[socket.id] + " " + delta);

            // get session id based on socket.id
            let sessionId = socketIdToSessionId[socket.id];

            if (sessionId in collaborations) {
                collaborations[sessionId]['cachedChangeEvents'].push(['change', delta, Date.now()]);
                // get all participants on this session
                let participants = collaborations[sessionId]['participants'];
                // send changes to all participants
                for (let i = 0; i < participants.length; i++) {
                    // skip the one who created this change
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit('change', delta);
                    } }
            } else {
                console.log('WARNING: Could not tie socket id to any collaboration');
            }
        })

        socket.on('restoreBuffer', () => {
            let sessionId = socketIdToSessionId[socket.id];
            console.log('Restoring buffer for session: ' + sessionId + ', socket: ' + socket.id);
            // if session is in memory
            if (sessionId in collaborations) {
                // get history changes
                let changeEvents = collaborations[sessionId]['cachedChangeEvents'];
                // emit change event for every history change so that participants can get them
                for (let i = 0; i < changeEvents.length; i++) {
                    // changeEvents[i][0]: change
                    // changeEvents[i][1]: change value (delta)
                    socket.emit(changeEvents[i][0], changeEvents[i][1]);
                }
            } else {
                console.log('could not find any collaboration for the session')
            }
        })

        // disconnect when participants close the session
        socket.on('disconnect', function() {
            let sessionId = socketIdToSessionId[socket.id];
            console.log('socket ' + socket.id + 'disconnected.')

            let foundAndRemoved = false;
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                let index = participants.indexOf(socket.id);
                // if found, remove
                if (index >= 0) {
                    participants.splice(index, 1); //delete quitter's id
                    foundAndRemoved = true;
                    // then check if this is the last participant
                    if (participants.length == 0)  {
                        console.log('Last participant left. Store in redis and remove from memory.');
                        let key = sessionPath + '/' + sessionId;
                        // convert JSON object to string
                        let value = JSON.stringify(collaborations[sessionId]['cachedChangeEvents']);
                        // store in redis
                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaborations[sessionId];
                    }
                }
            }
            if(!foundAndRemoved) {
                // if reach here, debug needed
                console.log("Warning: could not find the socket.id in collaborations");
            }
        })
    })
}
