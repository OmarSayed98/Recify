const mongoose=require('mongoose');
let db=mongoose.connection;
mongoose.connect("mongodb://localhost:27017/Dijkstra", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>console.log('connected to db'))
    .catch(err=>console.log(err));
module.exports=db;