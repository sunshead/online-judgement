const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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

module.exports = router;
