const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const userSchema = new Schema({ 
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        minlength: 5
    },
    password: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        minlength: 5
    },
    displayName: { 
        type: String, 
        trim: true, 
        minlength: 3
    }
}, { 
    timestamps: true,
})

const User = mongoose.model('User', userSchema); 
module.exports = User; 