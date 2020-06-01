const user=require('./models/users');
const unserscore=require('underscore');
user.find({})
    .then(result=>{
        result.forEach(it=>{
            recommendation(it).then(res=>{
                res.save().then(()=>console.log('similarity updated'));
            });
        })
    })
const recommendation=(result)=>{
    return new Promise((resolve,reject)=>{
        const liked=result.likedMovies;
        const disliked=result.dislikedMovies;
        const candidate_user=getusers(liked,disliked,result._id);
        const similarity_arr=[];
        candidate_user.then(candidate_users=>{
            //console.log(candidate_users);
            candidate_users.forEach(it=>{
                const jaccard=jaccard_coeff(result,it);
                const similarity={
                    id:it._id,
                    jaccard:jaccard
                };
                similarity_arr.push(similarity);
            });
            result.similarity_indices=similarity_arr;
            resolve(result);
            reject(new Error('failed to fetch similarity'));
        });
    })
};
const getusers=(liked,disliked,id)=>{
    return user.find({$or:[{likedMovies:{$in:liked}},{dislikedMovies:{$in:disliked}}],_id:{$ne:id}})
        .then(result=>{
            return result;
        });
}
const intersection=(u1,u2)=>{
    let exist=[],intersect=[];
    u1.forEach(it=>{
        exist[it]=true;
    });
    u2.forEach(it=>{
        if(exist[it])
            intersect.push(it);
    });
    return intersect;
}
const jaccard_coeff=(u1,u2)=>{
    const intersect_likes=intersection(u1.likedMovies,u2.likedMovies);
    const intersect_dislikes=intersection(u1.dislikedMovies,u2.dislikedMovies);
    const intersect_likes_dis=intersection(u1.likedMovies,u2.dislikedMovies);
    const intersect_dislikes_lik=intersection(u1.dislikedMovies,u2.likedMovies);
    const union_all=unserscore.union(u1.likedMovies,u1.dislikedMovies,u2.likedMovies,u2.dislikedMovies);
    //console.log(intersect_likes.length+" "+intersect_dislikes.length+" "+intersect_likes_dis.length+" "+intersect_dislikes_lik.length);
    const jaccard_index=((intersect_likes.length+intersect_dislikes.length)-(intersect_dislikes_lik.length+intersect_likes_dis.length))/union_all.length;
    return jaccard_index;
}
module.exports=recommendation;