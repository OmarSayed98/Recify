const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userschema = new schema({
    firstName: String,
    lastName: String,
    password: String,
    likedMovies: [schema.ObjectId],
    dislikedMovies: [schema.ObjectId],
    notifications: [schema.ObjectId],
    email: String
});
const user = mongoose.model('user', userschema);
const bcrypt = require('bcrypt');
const saltRounds = 10;
user.pre("save",function(next){
    const user=this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if(err)
            return next(err);
        user.password=hash;
        next();
    });
});
userschema.methods.comparePassword=function(candidatepass,cb){
    bcrypt.compare(candidatePass, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports=user;