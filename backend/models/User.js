const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// creating user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Name required"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Email required"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        select: false
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    }
},{timestamps:true})

// hash password before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password ,10)

})

// jwt method
userSchema.method.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// compare password
userSchema.methods.comparePassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass , this.password)
}

module.exports = mongoose.model("User",userSchema)