const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const messageSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    anonymous: {
        type: Boolean,
    },
    message : {
      type: String,
      required: true 
    }
},{
    timestamps: true
});

var Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;
