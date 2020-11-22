const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const messageSchema = new Schema({
    name: {
        type: String,
    },
    anonymous: {
        type: Boolean,
    },
    message : {
      type: String,
      required: true 
    },
    likes : {
        type: Number,
        default : 0,
    }
},{
    timestamps: true
});

var Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;
