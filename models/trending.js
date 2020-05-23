const mongoose=require('mongoose');
const schema=mongoose.Schema;
const trend=new schema({
    trending_tv:[Object],
    trending_movie:[Object],
    upcoming:[Object],
    name:String
});
const trending=mongoose.model('trending',trend);
module.exports=trending;