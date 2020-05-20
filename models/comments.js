const mongoose=require('mongoose');
const schema=mongoose.Schema;
const comments=new schema({
    content:{type:String,required:true},
    owner:{type:String,required:true},
});
const comment=mongoose.model('comments',comments);
module.exports=comment;
