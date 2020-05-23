const mongoose=require('mongoose');
let db=mongoose.connection;
mongoose.connect(process.env.mongodb_conn, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>console.log('connected to db'))
    .catch(err=>console.log(err));
module.exports=db;