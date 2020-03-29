const mongoose = require('mongoose');
const schema = mongoose.Schema;
const movieschema = new schema({
    title: {type:String,required:true},
    release: {type:String,required:true},
    rated: {type:String,required:true},
    runtime: {type:String,required:true},
    genre: {type:String,required:true},
    director: {type:String,required:true},
    writer: {type:String,required:true},
    actors: {type:String,required:true},
    plot: {type:String,required:true},
    awards: {type:String,required:true},
    poster: {type:String,required:true},
    rating: {type:String,required:true},
    likedUsers: [Object],
    dislikedUsers: [Object],
    imdbID: {type:String,required:true},
    production: {type:String,required:true}
});
const movie = mongoose.model('movie', movieschema);
module.exports=movie;