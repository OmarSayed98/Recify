const express=require('express');
const router=express.Router();
const url=require('url');
const omdb = new (require('omdbapi'))('e7aad19');
const {google}=require('googleapis');
const youtubev3=google.youtube({version:'v3',auth:process.env.API_KEY});
const movie=require('../models/movies');
const user=require('../models/users');
const comment=require('../models/comments');
const {ObjectId}=require('mongodb');
const sanitize = require('mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
const findusers=(commentarr)=>{
    return new Promise(async(resolve,reject)=>{
        let result = await comment.find({_id: { $in: commentarr }})
        if(result.length < 1){
            reject(new Error('failed to find users'));
        }else {
            resolve(result);
        }
    })
}
const getmovieitem=(result)=>{
    let arr = Object.values(result.actors);
    let arr1 = Object.values(result.genre);
    let arr2 = Object.values(result.director);
    let arr3=Object.values(result.writer);
    let actors = get(arr), genre = get(arr1), director = get(arr2),writer=get(arr3);
    const item=new movie({
        title:result.title,
        release:result.released,
        imdbID:result.imdbid,
        rating:result.imdbrating,
        runtime:result.runtime,
        rated:result.rated,
        genre:genre,
        director:director,
        writer:writer,
        actors:actors,
        plot:result.plot,
        awards:result.awards,
        poster:result.poster,
        production:result.production,
    });
    return item;
}
const savedb=(item,id,status)=>{
    if(status[1]==='1')
        item.likedUsers.push(id);
    else if(status[1]==='2')
        item.dislikedUsers.push(id);
    movie.findOne({imdbID:item.imdbID}).then((result,err)=>{
        if(err)
            console.log(err);
        if(!result){
            if(status[1]==='1') {
                user.updateOne({_id:id}, {$push: {likedMovies: item.imdbID}}).then(()=>console.log('movie added'));
            }
            else{
                user.updateOne({_id:id}, {$push: {dislikedMovies: item.imdbID}}).then(()=>console.log('movie disliked'));
            }
            item.save().then(console.log('item saved for first time'));
        }
        else{
            if(status[1]==='1') {
                movie.updateOne({imdbID: item.imdbID}, {$push: {likedUsers: id}}).then(()=>console.log('like added'));
                user.updateOne({_id:id}, {$push: {likedMovies: item.imdbID}}).then(()=>console.log('movie added'));
            }
            else{
                movie.updateOne({imdbID: item.imdbID}, {$push: {dislikedUsers: id}}).then(()=>console.log('dislike added'));
                user.updateOne({_id:id}, {$push: {dislikedMovies: item.imdbID}}).then(()=>console.log('movie added'));
            }
        }
    })
}
const deletedb=(id,status,userid)=>{
    if(status[0]==='1') {
        movie.updateOne({imdbID:id},{$pullAll:{likedUsers: [userid]}}).then(status => {
            console.log(status);
        });
        user.updateOne({_id:userid},{$pullAll:{likedMovies: [id]}}).then(status => {
            console.log(status);
        });
    }
    else{
        movie.updateOne({imdbID:id},{$pullAll:{dislikedUsers: [userid]}}).then(status => {
            console.log(status);
        });
        user.updateOne({_id:userid},{$pullAll:{dislikedMovies: [id]}}).then(status => {
            console.log(status);
        });
    }
};
const get=(arr)=>{
    let actors="";
    for(let i=0;i<arr.length;i++){
        if(i!==arr.length-1){
            actors+=arr[i];
            actors+=",";
        }
        else
            actors+=arr[i];
    }
    return actors;
};
router.get('/',(req,res)=>{
    const id=url.parse(req.url,true).query.id;
    omdb.get({
        id:id
    }).then((result)=>{
        const item=getmovieitem(result);
        movie.findOne({imdbID:result.imdbid}).then(resofmovie=>{
            if(!resofmovie)
                item.save().then(()=>console.log('movie saved for first time'));
        })
        youtubev3.search.list({
            part: 'snippet',
            type: 'video',
            q: result.title+" "+result.year+" trailer",
            maxResults: 10,
            order: 'relevance',
            safeSearch: 'moderate',
            videoEmbeddable: true
        }).then(result1=>{
            const trailerid=result1.data.items[0].id.videoId;
            const trailerurl="https://www.youtube.com/embed/"+trailerid;
            let buttonid=0;
            user.findOne({_id:req.session.user_id}).then((resmv)=>{
                if(resmv) {
                    const arr = resmv.likedMovies;
                    const arrdis = resmv.dislikedMovies;
                    arr.forEach((element) => {
                        if (element === result.imdbid) {
                            buttonid = 1;
                        }
                    });
                    arrdis.forEach((element) => {
                        if (element === result.imdbid) {
                            buttonid = 2;
                        }
                    });
                }
                movie.find({imdbID:result.imdbid},{comments:1}).then((rescm)=>{
                    const commenturl = `/movie/comment?movieid=${result.imdbid}&user_id=${req.session.user_id}`;
                    if(rescm[0].comments.length===0) {
                        user.findOne({_id:req.session.user_id}).then(username=>{
                            console.log(username.name);
                            res.render('moviePage', {
                                movie: result,
                                actors: item.actors,
                                genre: item.genre,
                                director:item.director,
                                trailer: trailerurl,
                                st: buttonid,
                                curl: commenturl,
                                comments_users: 0,
                                users:[],
                                name:username.name
                            });
                        });
                    }
                    else {
                        console.log(rescm);
                        const commentarr = rescm[0].comments;
                        const objectcomments = commentarr.map((i) => {
                            return ObjectId(i);
                        })
                        findusers(objectcomments).then(commentarray => {
                            const contentname=commentarray.map((i)=>{
                                let tmp=i;
                                return user.findOne({_id:tmp.owner}).then(userresult=>{
                                    tmp.owner=userresult.name;
                                    return tmp;
                                });
                            });
                            Promise.all(contentname).then(usercomments=>{
                                user.findOne({_id:req.session.user_id}).then(username=>{
                                    res.render('moviePage', {
                                        movie: result,
                                        actors: item.actors,
                                        genre: item.genre,
                                        director:item.director,
                                        trailer: trailerurl,
                                        st: buttonid,
                                        curl: commenturl,
                                        comments_users: commentarr.length,
                                        users:usercomments,
                                        name:username.name
                                    });
                                });
                            });
                        })
                    }
                })
            });
        }).catch(err=>console.log(err));
    }).catch(console.error);
});
router.post('/status',(req,res)=> {
        const query = url.parse(req.url, true).query;
        const id = query.id, st = query.st;
        console.log(st);
        console.log(req.session.user_id);
        omdb.get({
            id: id
        }).then((result) => {
            const item=getmovieitem(result);
            if (st[0] === '0') {
                savedb(item, req.session.user_id, st);
            }
            else if(st[0]==='1'){
                if(st[1]==='2') {
                    savedb(item, req.session.user_id, st);
                    deletedb(result.imdbid,st,req.session.user_id);
                }
                else if(st[1]==='0'){
                    deletedb(result.imdbid,st,req.session.user_id);
                }
            }
            else{
                if(st[1]==='0') {
                    deletedb(result.imdbid,st,req.session.user_id);
                }
                else if(st[1]==='1'){
                    savedb(item, req.session.user_id, st);
                    deletedb(result.imdbid,st,req.session.user_id);
                }
            }
        }).catch(console.error);
    }
);
router.post('/comment',(req,res)=>{
    const query=url.parse(req.url,true).query;
    const movieid=query.movieid;
    const userid=query.user_id;
    const content=sanitizeHtml(sanitize(req.body.Comments));
    const newcomment=new comment({
        content:content,
        owner:userid
    });
    newcomment.save().then((result)=>{
        console.log('comment saved');
        movie.updateOne({imdbID:movieid},{$push:{comments:result._id}}).then(()=>console.log('comment saved to movie db'));
        res.redirect(`/movie?id=${movieid}`);
    })
})
module.exports=router;
