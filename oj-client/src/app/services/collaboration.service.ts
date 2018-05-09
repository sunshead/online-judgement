import { Injectable } from '@angular/core';

declare var io: any; // io is alread imported in .angular.cli.json

@Injectable()
export class CollaborationService {
    collaborationSocket: any;
    constructor() { }

    init(editor: any, sessionId: string): void {
        // window.location.origion: the server location on the current page
        // for example, the current page on the browser is 'localhost:3000/problems/1',
        // then window.location.origin = 'http/localhost:3000'
        this.collaborationSocket = io(window.location.origin, {query: 'sessionId=' + sessionId});

        // handle change send from server
        this.collaborationSocket.on('change', (delta: string) => {
            console.log('collabration: editor changes by ' + delta);
            delta = JSON.parse(delta); // delta is json format
            editor.lastAppliedChange = delta;
            // apply the changes on editor
            editor.getSession().getDocument().applyDeltas([delta]);
        });
    }

    // emit event to make changes and inform server and other collaborators
    change(delta: string): void {
        // emit "change" event
        this.collaborationSocket.emit('change', delta);
    }

    restoreBuffer(): void {
      // emit "restoreBuffer" event
      // let server handle this event
      this.collaborationSocket.emit('restoreBuffer');
    }
}
