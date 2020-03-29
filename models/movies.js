const mongoose = require('mongoose');
const schema = mongoose.Schema;
const movieschema = new schema({
    title: String,
    release: String,
    rated: String,
    runtime: String,
    genre: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    awards: String,
    poster: String,
    rating: String,
    likedUsers: [Object],
    dislikedUsers: [Object],
    imdbID: String,
    production: String
});
const movie = mongoose.model('movie', movieschema);
module.exports=movie;