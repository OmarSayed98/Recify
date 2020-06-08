const mongoose = require('mongoose');
const schema = mongoose.Schema;
const movieschema = new schema({
    title: {type:String,required:true},
    release: {type:String},
    rated: {type:String},
    runtime: {type:String},
    genre: {type:String},
    director: {type:String},
    writer: {type:String},
    actors: {type:String},
    plot: {type:String},
    awards: {type:String},
    poster: {type:String},
    rating: {type:String},
    likedUsers: [String],
    dislikedUsers: [String],
    imdbID: {type:String,required:true},
    production: {type:String},
    comments:{type:[String]},
});
const movie = mongoose.model('movie', movieschema);
module.exports=movie;