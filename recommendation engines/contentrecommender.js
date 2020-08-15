const movie=require('../models/movies');
const keyword_extractor = require("keyword-extractor");
const cron=require('node-cron');
let all_words=[];
const _=require('underscore');
const similarity = require( 'compute-cosine-similarity' );
const user=require('../models/users');
cron.schedule('47 16 * * *',()=>{
    movie.find({}).then(res=>{
        let promises=res.map((i,idx)=>{
            const plot_key=keyword_extractor.extract(i.plot,{
                language:"english",
                remove_digits: true,
                return_changed_case:true,
                remove_duplicates: true
            });
            const genre=i.genre.split(",");
            let actors=i.actors.split(",");
            let directors=i.director.split(",");
            actors=actors.filter((nu)=>{
                if(nu===null)
                    return false;
                return true;
            }).map(actor=> {
                return actor.split(' ').join('');
            });
            directors=directors.filter((nu)=>{
                if(nu==='null')
                    return false;
                return true;
            }).map(direct=> {
                return direct.split(' ').join('');
            });
            const bag_words=[...new Set([...plot_key,...genre,...actors,...directors])];
            all_words=[...new Set([...all_words,...bag_words])];
            return i.updateOne({idx:idx+1,bag_words:bag_words}).then(()=>{
                console.log('words updated');
                return {title:i.title,bag_words,type:i.type,id:i.imdbID,poster:i.poster};
            });
        });
        Promise.all(promises).then((bags)=>{
            let matrix=[];
            bags.forEach((i,idx)=>{
                let freq_num=[];
                const freq=_.countBy(i.bag_words);
                all_words.forEach(word=>{
                    if(freq[word]!==undefined)
                        freq_num.push(freq[word]);
                    else
                        freq_num.push(0);
                });
                matrix.push({title:i.title,freq_num:freq_num,type:i.type,id:i.id,poster:i.poster});
            });
            for(let i=0;i<bags.length;i++){
                let cosine_similarities=[];
                for(let c=0;c<bags.length;c++){
                    const cosine_similarity=similarity(matrix[i].freq_num,matrix[c].freq_num);
                    cosine_similarities.push({title:matrix[c].title
                        ,cosine_similarity:cosine_similarity
                        ,type:matrix[c].type,id:matrix[c].id,
                        poster:matrix[c].poster});
                }
                cosine_similarities.sort((a,b)=>{
                    if(a.cosine_similarity>b.cosine_similarity)
                        return -1;
                    return 1;
                });
                movie.findOneAndUpdate({title:matrix[i].title},{content_similarity:cosine_similarities},{useFindAndModify: false})
                    .then(()=>console.log('update completed'));
            }
        });
    });
});
const getrecommendations=(liked,suggest,itemtype)=>{
    return liked.map(like=>{
        return movie.findOne({imdbID:like})
            .then(movies=>{
                const similar=movies.content_similarity;
                let itemarr=[],num=0,filternum=0;
                for(let i=1;i<similar.length;i++){
                    if(num===2)
                        break;
                    if(similar[i].type===itemtype){
                        num++;
                        itemarr.push({id:similar[i].id,poster:similar[i].poster,like:movies.title,title:similar[i].title});
                    }
                }
                for(let i=0;i<suggest.length;i++){
                    if(suggest[i].probability===0 || filternum===5)
                        break;
                    if(suggest[i].type===itemtype) {
                        filternum++;
                        itemarr.push({id: suggest[i].id, poster: suggest[i].poster,title:suggest[i].title});
                    }
                }
                return itemarr;
            });
    });
};


cron.schedule('48 16 * * *',()=>{
    user.find({})
        .then(result=>{
            result.forEach(resultuser=>{
                const liked=resultuser.likedMovies;
                let suggestions=resultuser.suggestions;
                let movies=getrecommendations(liked,suggestions,'movie');
                let series=getrecommendations(liked,[],'series');
                Promise.all(movies)
                    .then(ans=>{
                        Promise.all(series)
                            .then(ans1=>{
                                ans=[].concat.apply([],ans);
                                ans1=[].concat.apply([],ans1);
                                ans=_.uniq(ans,'id');
                                ans1=_.uniq(ans1,'id');
                                let difference_movies=_.filter(ans,(obj)=>{
                                    return !_.findWhere(resultuser.movie_suggestions,obj);
                                });
                                let difference_tv=_.filter(ans1,(obj)=>{
                                    return !_.findWhere(resultuser.series_suggestions,obj);
                                });
                                let new_recommendations=difference_movies.concat(difference_tv);
                                console.log(resultuser.name);
                                console.log(new_recommendations);
                                let notifications=new_recommendations.map(item=>{
                                    if(item.like!==undefined){
                                        const message="Because you liked "+item.like+" we recommend ";
                                        item.message=message;
                                    }
                                    else{
                                        const message="Similar users also liked ";
                                        item.message=message;
                                    }
                                    return item;
                                });
                                user.updateOne({_id:resultuser._id},{series_suggestions:ans1,movie_suggestions:ans,notifications:notifications})
                                    .then('suggestions updated');
                            });
                    });
            });
        });
});
