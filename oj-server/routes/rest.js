const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const nodeRestClient = require('node-rest-client').Client;
// for server to call the RESTful API
const restClient = new nodeRestClient();
// Flask server listens on port 5000 by default
EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';

restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

// business logic put in service
// router helps us to find which service we need
const problemService = require('../services/problemService')


//GET all problems
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

router.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.getProblem(id)
        .then(problem => res.json(problem))
});

router.post('/problems', jsonParser, (req, res) => {
    problemService.addProblem(req.body)
        .then(
            (problems) => {
                res.json(problems);
            },
            (error) => {
                res.status(400).send(error);
            }
        )
});

// jsonParser: middleware, used to parse the body of the POST request
router.post('/build_and_run', jsonParser, (req, res) => {
    const userCode = req.body.user_code;
    const lang = req.body.lang;
    console.log(`lang: ${lang}`, `user code: ${userCode}`);

    restClient.methods.build_and_run({
            data: {
                code: userCode,
                lang: lang
            },
            headers: {
                'Content-Type': 'application/json'
            }
        },
        (data, response) => { // response: original raw data, data: parsed response
            const text = `Build output: ${data.build}, execute output: ${data.run}`;
            res.json(text);
        }
    )
});

module.exports = router;
