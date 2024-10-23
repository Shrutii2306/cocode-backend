const mongoose = require('mongoose');

const codeHistorySchema = new mongoose.Schema({

    hostId : {

        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },

    sessionId : {

        type: String,
        required: true,
        ref: 'Session'
    },
    codeSnippets: [

        {
            code :{

            type: String,
            required: true,
            },

            savedAt: {

                type: Date,
                default: Date.now()
            },

            savedBy :{

                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref : 'User',
            }
        },
    ]
});

const CodeHistory = mongoose.model('CodeHistory', codeHistorySchema);
module.exports = CodeHistory;