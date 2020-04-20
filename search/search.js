const fetch=require('node-fetch');
const cheerio=require('cheerio');
const url='https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
function search(movie){
    return fetch(`${url}${movie}`)
        .then(res=>res.text())
        .then(body=>{
            const movies=[];
            const $=cheerio.load(body);
            $('.findResult').each((idx,element)=>{
                const el=$(element);
                const title=el.find('td.result_text a');
                const img=el.find('td a img').attr('src');
                const moviei={
                    img:img,
                    title:title.text(),
                };
                movies.push(moviei);
            });
            return movies;
        })
}
module.exports=search;