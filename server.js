const mongoose=require('mongoose');
let db=mongoose.connection;
mongoose.connect("mongodb://localhost:27017/Dijkstra", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
module.exports=db;