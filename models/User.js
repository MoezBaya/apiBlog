const Joi = require("joi");
const  mongoose  = require("mongoose");
const jwt = require("jsonwebtoken");

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    profilePhoto:{
        type: Object,
        default:{
            url: "https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.jpg?s=1024x1024&w=is&k=20&c=Ny3oxWfK9DQgG1xgaI2-iYhaiErqbmbY2cjLa4F1xAE=",
            publicId: null,
        }
    },
    bio: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isAccountVerified:{
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
})

// Populate Posts That Belongs To This User When He/Her Profile
UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id"
})
// Generate Auth Token
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({id: this.id, isAdmin: this.isAdmin}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
}
// User Model 
const User = mongoose.model("User", UserSchema);

// Validate Register User 
function validateRegisterUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(2).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}


// Validate Login User 
function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(2).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}

// Validate Update User 
function validateUpdateUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        password: Joi.string().trim().min(8),
        bio:Joi.string(),
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
}