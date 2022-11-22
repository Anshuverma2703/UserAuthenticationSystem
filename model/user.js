const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{type :String , required: true , unique:true},
    lastname:{type :String , required: false },
    Email:{type :String , required: true , unique:true},
    phone:{type :Number , required: true , unique:true},
    company:{type :Number , required: false },
    occupation:{type :Number , required: false },
    dob:{type :String , required: true },
    password:{type :String , required: true }
},{collection:'users'}
)

const model = mongoose.model('UserSchema', UserSchema)
module.exports = model