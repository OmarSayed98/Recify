function sandwich(){
  var sanmenu = document.getElementById('sandwichMenu');
  var smenu = document.getElementById("smallmenu");
  var sbar=document.getElementById('sbar');

  if(smenu.style.display != "block")
  {
    smenu.style.display = "block";
    sanmenu.style.background="rgba(105, 105, 105, 0.8)";
    sbar.style.width="100%";
    sbar.style.padding="0";
    sbar.style.margin="0";
  }
  else {
    smenu.style.display = "none";
    sanmenu.style.background="none";
  }
}

function searchMenu()
{
  var searchResult = document.getElementById("searchResult");
  if(searchResult.style.display!="block"){
    searchResult.style.display="block";
  }
  var movie=document.getElementById('searchData').value;
  var key="&apikey=e7aad19";
  var pageNum =1;
  $.getJSON('http://www.omdbapi.com/?s='+movie+'&page='+pageNum+ key).then(function(response){
    var t=JSON.stringify(response);
    var tt=JSON.parse(t);


    for(var i=0;i<5;i++)
    {

      var movieName = document.querySelectorAll('#searchResult p')[i];
      var moviePoster = document.querySelectorAll("#searchResult img")[i];
      movieName.innerHTML= tt.Search[i].Title;
      var movieId = document.querySelectorAll('#searchResult input')[i];
      movieId.value=tt.Search[i].imdbID;
      if(tt.Search[i].Poster!=="N/A")
      {

        moviePoster.src=tt.Search[i].Poster;
      }
      else{
        moviePoster.src="../public/images/noposter.jpg";
      }

    }

  });
}

function notificationMenu()
{
  var notifmenu = document.getElementById('notifications');
  if(notifmenu.style.display!="block")
  {
    notifmenu.style.display="block";
  }
  else {
    notifmenu.style.display="none";
  }
}

function sendMovieId(selection)
{
  var key="&apikey=e7aad19";
  var movieId= selection.getElementsByTagName('input')[0].value;

  $.getJSON('http://www.omdbapi.com/?i='+movieId+ key).then(function(res){

    var http = new XMLHttpRequest();
    http.open('POST', 'http://localhost:3000/search', true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(res));
  });
}

$(document).click(function(e) {


  if( e.target.id != 'searchResult') {
    $("#searchResult").hide();
  }
  else if(e.target.id != 'notifications')
  {
    $("#notifications").hide();
  }

});