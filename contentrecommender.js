const movie=require('./models/movies');
const keyword_extractor = require("keyword-extractor");
const cron=require('node-cron');
let all_words=[];
const _=require('underscore');
const similarity = require( 'compute-cosine-similarity' );
cron.schedule('27 07 * * *',()=>{
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
                return {title:i.title,bag_words};
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
                matrix.push({title:i.title,freq_num:freq_num});
            });
            for(let i=0;i<bags.length;i++){
                let cosine_similarities=[];
                for(let c=0;c<bags.length;c++){
                    const cosine_similarity=similarity(matrix[i].freq_num,matrix[c].freq_num);
                    cosine_similarities.push({title:matrix[c].title,cosine_similarity:cosine_similarity});
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
