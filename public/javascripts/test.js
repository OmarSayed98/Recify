function search()
{
  var movie=document.getElementById('data').value;
  var key="&apikey=e7aad19";
  var pageNum=1;
  getMovies(movie,key,pageNum,0);
}

function getMovies(movie,key,pageNum,lastpage){

  $.getJSON('http://www.omdbapi.com/?s='+movie+'&page='+pageNum+ key).then(function(response){
    var t=JSON.stringify(response);
    var tt=JSON.parse(t);
    var lastPage = Math.ceil((response.totalResults)/10);

    for(var i=0;i<tt.Search.length;i++)
    {

      var id = tt.Search[i].imdbID;
      get(id,key);
    }

    if(pageNum<lastPage)
    {
      pageNum=pageNum+1;
      getMovies(movie,key,pageNum,lastPage);
    }
  });


}


function get(id,key){
    $.getJSON('http://www.omdbapi.com/?i='+id+ key).then(function(res){
      var resp=JSON.stringify(res);
      var data=JSON.parse(resp);
      var year = data.Year;
      var title = data.Title;
      var type = data.Type;
      var genre = data.Genre;
      console.log("Title: "+title);
      console.log("Type: "+type);
      console.log("Genre: "+genre);
      console.log("Year: "+year);

      });
  }
