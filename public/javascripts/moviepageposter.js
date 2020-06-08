function setupPage(poster,st) {
  if(poster!=="")
  {
    const pst=document.getElementById('moviePoster');
    document.getElementById('poster').style.marginRight="0";
    pst.style.width="100%";
    pst.src=poster;
  }
  if(st==='1')
  {
      document.getElementById('like').classList.add("likeClicked");
  }

    if(st==='2')
    {
        document.getElementById('dislike').classList.add("dislikeClicked");
    }
}

function play(trailer){
    var x = document.getElementById("hiddenTrailer");
    if (x.style.display !== "block") {
        x.style.display = "block";
       x.innerHTML = '<iframe width="100%" height="480" id="theIframe" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
       document.getElementById("theIframe").src=trailer;
       var btn = document.getElementById("playbtn");
       btn.style.display="none";

    }
    else {
        x.style.display="none";
    }


}

function likeMovie(id)
{
    var xhttp = new XMLHttpRequest();
    var likebtn=document.getElementById('like');
    var dislikebtn=document.getElementById('dislike');
    var url="http://localhost:3000/movie/status?id=";
    url+=id;
    url+="&st=";
    if(!likebtn.classList.contains('likeClicked'))
    {
        if(dislikebtn.classList.contains('dislikeClicked'))
        {
            url+="21";
            dislikebtn.classList.remove('dislikeClicked');
            likebtn.classList.add('likeClicked');
        }
        else {
            url+="01";
            likebtn.classList.add('likeClicked');
        }
    }
    else if(likebtn.classList.contains('likeClicked'))
    {
        url+="10";
        likebtn.classList.remove('likeClicked');
    }
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200)
            console.log('request sent');
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function dislikeMovie(id)
{
    var likebtn=document.getElementById('like');
    var dislikebtn=document.getElementById('dislike');
    var url="http://localhost:3000/movie/status?id=";
    var xhttp = new XMLHttpRequest();
    url+=id;
    url+="&st=";
    if(!dislikebtn.classList.contains('dislikeClicked'))
    {
        if(likebtn.classList.contains('likeClicked'))
        {
            likebtn.classList.remove('likeClicked');
            dislikebtn.classList.add('dislikeClicked');
            url+="12";
        }
        else {
            dislikebtn.classList.add('dislikeClicked');
            url+="02";
        }
    }
    else if(dislikebtn.classList.contains('dislikeClicked'))
    {
        dislikebtn.classList.remove('dislikeClicked');
        url+="20";
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("");
}


$(document).mouseup(function(e)
{
    var trailer = $("#hiddenTrailer");
    var btn=  $("#playbtn");
    var ifr=  $("#theIframe");
    if (!trailer.is(e.target) && trailer.has(e.target).length === 0)
    {
        trailer.hide();
        btn.show();
        ifr.attr('src',"");
    }
});

