const request=require('request-promise');
const trending=require('../models/trending');
const cron=require('node-cron');
const genres_result=(id,genre,type)=>{
    const url=`https://api.themoviedb.org/3/discover/${type}?api_key=9bde952e56ff27d1016ff6144cbf27c9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`;
    const options = {
        method: 'GET',
        uri: url,
        json: true // Automatically stringifies the body to JSON
    };
    let query={};
    request(options)
        .then(result=>{
            let imdbid=result.results.map(item=>{
                item.type=type;
                return get_imdbid(item.id,type)
                    .then(ans=>{
                        item.imdbid=ans;
                        item.poster_path="https://image.tmdb.org/t/p/w600_and_h900_bestv2"+item.poster_path;
                        return item;
                    });
            });
            Promise.all(imdbid)
                .then(final_res=>{
                    query[genre]=final_res;
                    trending.findOneAndUpdate({name:'omar'},query,{useFindAndModify: false})
                        .then(()=>{
                            console.log('genre added');
                        });
                });
        });
}
const get_imdbid=(id,type)=>{
    const url=`https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=9bde952e56ff27d1016ff6144cbf27c9`
    const options = {
        method: 'GET',
        uri: url,
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
        .then(result=>{
            return result.imdb_id;
        })
}
//28 35 18 878
const genre_id=[28,35,18,878];
const genre_id_tv=[10759,35,18,80]
const genres=["action_","comedy_","drama_","Science_Fiction_"];
const genres_tv=["action_adventure_","comedy_","drama_","crime_"]
cron.schedule('17 09 * * *',()=>{
    for(let i=0;i<4;i++){
        genres_result(genre_id[i],genres[i]+"movies",'movie');
        genres_result(genre_id_tv[i],genres_tv[i]+"tv",'tv');
    }
});