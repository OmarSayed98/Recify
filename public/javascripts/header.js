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


  if( e.target.id != 'searchResult') {
    $("#searchResult").hide();
  }
  else if(e.target.id != 'notifications')
  {
    $("#notifications").hide();
  }

});