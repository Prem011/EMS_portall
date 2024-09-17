const { match } = require('assert');
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const loginSchema =new mongoose.Schema({

    sno : {
        type: Number,
    },
    username: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        select: false,
        maxLength:[15, "Password should not exceed more than 15 characters"],
        minLength:[3, "Password should have atleast 3 characters"],
        // match: [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,15}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"]
        
    }

}, {
    timestamps: true
});

loginSchema.plugin(plm)

loginSchema.plugin(AutoIncrement, { inc_field: 'sno' });


const Login = mongoose.model('Login', loginSchema);
module.exports = Login;