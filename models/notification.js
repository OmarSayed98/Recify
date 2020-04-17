const mongoose=require('mongoose');
const schema=mongoose.schema;
const notifyschema=new schema({
    receiver:{type:String, required:true},
    content:{type:String, required:true},
    data:{type:Date,required:true},
    read:{type:Boolean, required:true}
});
const notify=mongoose.model('notification',notifyschema);
module.exports=notify;