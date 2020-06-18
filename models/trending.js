const mongoose=require('mongoose');
const schema=mongoose.Schema;
const trend=new schema({
    trending_tv:[Object],
    trending_movie:[Object],
    upcoming:[Object],
    name:String,
    action_movies:[],
    drama_movies:[],
    comedy_movies:[],
    Science_Fiction_movies:[],
    action_tv:[],
    drama_tv:[],
    comedy_tv:[],
    Science_Fiction_tv:[],
    crime_tv:[],
    action_adventure_tv:[]
});
const trending=mongoose.model('trending',trend);
module.exports=trending;