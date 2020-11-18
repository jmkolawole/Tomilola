
const express = require('express');
const bodyParser = require('body-parser');

const messageRouter = express.Router();

messageRouter.use(bodyParser.json());

messageRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the messages to you!');
})
.post((req, res, next) => {
    res.end('Will add the message: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /messages');
})
.delete((req, res, next) => {
    res.end('Deleting all messages');
});

module.exports = messageRouter;
