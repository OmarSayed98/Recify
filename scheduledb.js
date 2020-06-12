const cron=require('node-cron');
const request=require('request-promise');
const trend=require('./models/trending');
const engine=require('./engine');
cron.schedule('59 10 * * FRI',()=>{
    const option={
        url:"https://api.themoviedb.org/3/trending/movie/week?api_key=9bde952e56ff27d1016ff6144cbf27c9",
        json:true
    };
    const optiontv={
        url:"https://api.themoviedb.org/3/trending/tv/week?api_key=9bde952e56ff27d1016ff6144cbf27c9",
        json:true
    };
    const topratedoptioin={
        url:'https://api.themoviedb.org/3/movie/popular?api_key=9bde952e56ff27d1016ff6144cbf27c9&language=en-US&page=1',
        json:true
    };
    request(option).then(resp=>{
        let trending_id=[];
        trending_id=resp.results.map((movie)=>{
            const optionid={
                url:`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=9bde952e56ff27d1016ff6144cbf27c9`,
                json:true
            }
            return request(optionid).then(respid=>{
                return {id:respid.imdb_id,poster:`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`};
            }).catch(err=>console.log(err));
        });
        request(optiontv).then(resptv=>{
            let trending_id_tv=[];
            trending_id_tv=resptv.results.map((tv)=>{
                const optionid_tv={
                    url:`https://api.themoviedb.org/3/tv/${tv.id}/external_ids?api_key=9bde952e56ff27d1016ff6144cbf27c9&language=en-US`,
                    json:true
                }
                return request(optionid_tv).then(respid_tv=>{
                    return {id:respid_tv.imdb_id,poster:`https://image.tmdb.org/t/p/w600_and_h900_bestv2${tv.poster_path}`};
                });
            });
            request(topratedoptioin).then(upcoming=>{
                let upcoming_data=[];
                upcoming_data=upcoming.results.map((top)=>{
                    const optionid_top={
                        url:`https://api.themoviedb.org/3/movie/${top.id}/external_ids?api_key=9bde952e56ff27d1016ff6144cbf27c9`,
                        json:true
                    }
                    return request(optionid_top).then(id_top=>{
                        return {id:id_top.imdb_id,poster:`https://image.tmdb.org/t/p/w600_and_h900_bestv2${top.poster_path}`,data:top};
                    });
                });
                Promise.all(trending_id).then((values_movie)=>{
                    Promise.all(trending_id_tv).then(values=>{
                        Promise.all(upcoming_data).then((values_top=>{
                            const trending={
                                trending_tv:values,
                                trending_movie:values_movie,
                                upcoming:values_top,
                                name:'omar'
                            };
                            trend.findOneAndUpdate({name:'omar'},trending,{
                                upsert:true,
                                useFindAndModify: false
                            }).then(()=>console.log('data updated'));
                        })).catch(err=>console.log(err));
                    }).catch(err=>console.log(err));
                }).catch(err=>console.log(err));
            }).catch(err=>console.log(err));
        })
    });
});
cron.schedule('31 00 * * *',()=>{
    engine.get_similar();
})
