const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Messages = require('../models/messages');

const messageRouter = express.Router();
//const cors = require('./cors');

  
messageRouter.use(bodyParser.json());


messageRouter.route('/')
.get((req,res,next) => {
    Messages.find({})
    .then((messages) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(messages);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Messages.create(req.body)
    .then((message) => {
        console.log('Message Created ', message);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /messages');
})
.delete((req, res, next) => {
    Message.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});



messageRouter.route('/:messageId')
.get((req,res,next) => {
    Messages.findById(req.params.messageId)
    .then((message) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /messages/'+ req.params.messageId);
})
.put((req, res, next) => {
    Messages.findByIdAndUpdate(req.params.messageId, {
        $set: req.body
    }, { new: true })
    .then((message) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Messages.findByIdAndRemove(req.params.messageId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = messageRouter;
