const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:[true,"please add username"],
    unique:true

},
email:{
    type:String,
    required:[true,"please add email"],
    unique:true

},
password:{
    type:String,
    required:[true,"please provide password"],

},
isVerified:{
    type:Boolean,
    default:false,
    /* user only will be verified when click the link */
},
isAdmin:{
    type:Boolean,
    default:false,
    /* user only will be verified when click the link */
},
forgotPasswordToken:String,
forgotPasswordTokenExpiry:Date,
verifyToken:String,
verifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model('users',userSchema)

export default User