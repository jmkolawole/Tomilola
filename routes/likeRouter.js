
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Messages = require('../models/messages');

const likeRouter = express.Router();
//const cors = require('./cors');

  
likeRouter.use(bodyParser.json());

likeRouter.route('/:messageId')
.post((req,res,next) => {
    Messages.findByIdAndUpdate(req.params.messageId, {$inc : {likes: 1}},{new : true})
    .then((message) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    }, (err) => next(err))
    .catch((err) => next(err));
})






module.exports = likeRouter
