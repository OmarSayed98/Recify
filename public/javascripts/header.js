
var key="&apikey=e7aad19";
function sandwich(){
  var sanmenu = document.getElementById('sandwichMenu');
  var smenu = document.getElementById("smallmenu");
  var sbar=document.getElementById('sbar');

  if(smenu.style.display != "block")
  {
    smenu.style.display = "block";
    sanmenu.style.background="rgba(20,20,20,0.8)";
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
  var key="&apikey=e7aad19";
  var searchResult = document.getElementById("searchResult");
  if(searchResult.style.display!=="block"){
    searchResult.style.display="block";
  }
  var movie=document.getElementById('searchData').value;
  var el = document.getElementById('searchResult');

  while ( el.firstChild ) el.removeChild( el.firstChild );
  var pageNum = 1;
  $.getJSON('http://www.omdbapi.com/?s='+movie+'&page='+pageNum+ key).then(function(response){
    var t=JSON.stringify(response);
    var tt=JSON.parse(t);
    let counter = 10;

    if(tt.Search.length < counter)
    {
      counter = tt.Search.length;
    }

    for(var i=0;i < counter;i++)
    {
      var link = document.createElement('a');
      link.classList.add("searchListMovieLink");
      var resultDiv = document.createElement('div');
      resultDiv.classList.add("theResult");
      var moviename = document.createElement('p');
      moviename.classList.add("searchListMovieName");
      var moviePoster = document.createElement('img');
      moviePoster.classList.add("searchListMoviePoster");
      var thefix = document.createElement('br');
      thefix.classList.add("fix");
      searchResult.appendChild(link);
      var thelink=document.getElementsByClassName("searchListMovieLink")[i];
      thelink.appendChild(resultDiv);
      resultDiv.appendChild(moviePoster);
      resultDiv.appendChild(moviename);
      resultDiv.appendChild(thefix);
      var movieId=tt.Search[i].imdbID;
      thelink.href="http://localhost:3000/movie?id="+movieId;
      var themoviename=document.getElementsByClassName("searchListMovieName")[i];
      themoviename.innerHTML=tt.Search[i].Title;
      var themovieposter=document.getElementsByClassName("searchListMoviePoster")[i];
      if(tt.Search[i].Poster!=="N/A")
      {
       themovieposter.src=tt.Search[i].Poster;
      }
      else{
        themovieposter.src="../public/images/noposter.jpg";
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


$(document).click(function(e) {


  if( e.target.id !== 'searchResult') {
    $("#searchResult").hide();
  }
  else if(e.target.id !== 'notifications')
  {
    $("#notifications").hide();
  }

});