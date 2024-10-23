const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({

    sessionId : {

        type: String,
        required: true,
        unique: true
    },

    hostId:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,

    },

    participants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],

    maxParticipant:{

        type: Number,
        required: true
    },

    sessionName :{

        type: String,
    },

    createdAt:{

        type: Date,
        default: Date.now()
    },

    status:{

        type: Boolean,
        default : true,
        required: true
    }
})

const Session = mongoose.model('Session', sessionSchema );

module.exports = Session;