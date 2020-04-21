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
        if(tt.Search[i].Poster.length<1)
        {
          i+=1;
        }
        else{
          var moviePoster = document.querySelectorAll("#searchResult img")[i];
          moviePoster.src=tt.Search[i].Poster;
          var movieName = document.querySelectorAll('#searchResult p')[i];
          movieName.innerHTML= tt.Search[i].Title;
          var movieId = document.querySelectorAll('#searchResult input')[i];
          movieId.value=tt.Search[i].imdbID;
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

  var movieId= selection.getElementsByTagName('input')[0].value;
  /*var http = new XMLHttpRequest();
  var url = '';
  http.open('POST', url, true);
  http.send(movieId);*/
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