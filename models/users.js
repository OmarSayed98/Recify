const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userschema = new schema({
    name: {type:String,required:true},
    password: {type:String,required:true},
    likedMovies: [String],
    dislikedMovies: [String],
    notifications: [],
    email: {type:String,required:true},
    resetpasstoken:String,
    resetpassexpiry:Date,
    confirmtoken:String,
    similarity_indices:[],
    suggestions:[],
    series_suggestions:[],
    movie_suggestions:[]
});
const bcrypt = require('bcrypt');
userschema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
userschema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports=mongoose.model('user', userschema);