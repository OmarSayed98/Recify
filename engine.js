const user=require('./models/users');
const underscore=require('underscore');
const Movie=require('./models/movies');
const recommendation=(result)=>{
    return new Promise((resolve,reject)=>{
        const liked=result.likedMovies;
        const disliked=result.dislikedMovies;
        const candidate_user=getusers(liked,disliked,result._id);
        const similarity_user=[];
        candidate_user.then(candidate_users=>{
            //console.log(candidate_users);
            candidate_users.forEach(it=>{
                const jaccard=jaccard_coeff(result,it);
                const similarity={
                    jaccard:jaccard,
                    id:it._id
                };
                similarity_user.push(similarity);
            });
            result.similarity_indices=similarity_user;
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
    const union_all=underscore.union(u1.likedMovies,u1.dislikedMovies,u2.likedMovies,u2.dislikedMovies);
    //console.log(intersect_likes.length+" "+intersect_dislikes.length+" "+intersect_likes_dis.length+" "+intersect_dislikes_lik.length);
    const jaccard_index=((intersect_likes.length+intersect_dislikes.length)-(intersect_dislikes_lik.length+intersect_likes_dis.length))/union_all.length;
    return jaccard_index;
}
const suggest=()=>{
    user.find({})
        .then(result=>{
            result.forEach(res=>{
                let suggestions=[];
                let unrated=[];
                const similar=res.similarity_indices;
                const union_all=underscore.union(res.likedMovies,res.dislikedMovies);
                const find_unrated=similar.map(idx=>{
                    return user.findById(idx.id)
                        .then(res1=>{
                            const union_oppose=underscore.union(res1.likedMovies,res1.dislikedMovies);
                            unrated.push(...underscore.difference(underscore.difference(union_oppose,union_all),unrated));
                        });
                });
                Promise.all(find_unrated)
                    .then(()=>{
                        const probability_unrated=unrated.map(movies=>{
                            return Movie.findOne({imdbID:movies})
                                .then((movie)=>{
                                    let liked_users=movie.likedUsers;
                                    let disliked_users=movie.dislikedUsers;
                                    similar.forEach(it=>{
                                        let similarity_coeff_likes=0,similarity_coeff_disliked=0;
                                        if(liked_users===undefined)
                                            liked_users=[];
                                        if(disliked_users===undefined)
                                            disliked_users=[];
                                        liked_users.forEach(userid=>{
                                            if(userid===it.id.toString()){
                                                similarity_coeff_likes+=it.jaccard;
                                            }
                                        });
                                        disliked_users.forEach(userid=>{
                                            if(userid===it.id.toString()){
                                                similarity_coeff_disliked+=it.jaccard;
                                            }
                                        });
                                        if(liked_users.length===0 && disliked_users.length===0)
                                            return;
                                        const item_probability=(similarity_coeff_likes-similarity_coeff_disliked)/(liked_users.length+disliked_users.length);
                                        suggestions.push({id:movie.imdbID,probability:item_probability,type:movie.type,poster:movie.poster});
                                    });
                                });
                        });
                        Promise.all(probability_unrated)
                            .then(()=>{
                                suggestions=underscore.uniq(suggestions,'id');
                                suggestions.sort((a,b)=>{
                                    if(a.probability>b.probability)
                                        return -1;
                                    else
                                        return 1;
                                })
                                user.findOneAndUpdate({_id:res._id},{suggestions:suggestions},{useFindAndModify: false})
                                    .then(()=>{
                                        console.log('suggestions updated');
                                    })
                            });
                    });
            });
        });
};
const get_similar=()=>{
    user.find({})
        .then(result=>{
            result.forEach(it=>{
                recommendation(it).then(res=>{
                    //console.log(res);
                    res.save().then(()=>{
                        console.log('similarity updated');
                        suggest();
                    });
                });
            });
        });
}
module.exports={
    recommendation,
    get_similar
};