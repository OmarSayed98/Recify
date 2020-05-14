function play(trailer){
    var x = document.getElementById("hiddenTrailer");
    if (x.style.display !== "block") {
        x.style.display = "block";
       x.innerHTML = '<iframe width="100%" height="480" id="theIframe" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
       document.getElementById("theIframe").src=trailer;
    }
    else {
        x.style.display="none";
    }


}

function likeMovie()
{
    var xhttp = new XMLHttpRequest();
    var likebtn=document.getElementById('like');
    var dislikebtn=document.getElementById('dislike');
    var url="";
    if(!likebtn.classList.contains('likeClicked'))
    {
        if(dislikebtn.classList.contains('dislikeClicked'))
        {
            dislikebtn.classList.remove('dislikeClicked');
            likebtn.classList.add('likeClicked');
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("");
        }
        else {
            likebtn.classList.add('likeClicked');
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("");

        }
    }
    else if(likebtn.classList.contains('likeClicked'))
    {
        likebtn.classList.remove('likeClicked');
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("");
    }

}

function dislikeMovie()
{
    var likebtn=document.getElementById('like');
    var dislikebtn=document.getElementById('dislike');
    var url="";
    var xhttp = new XMLHttpRequest();

    if(!dislikebtn.classList.contains('dislikeClicked'))
    {
        if(likebtn.classList.contains('likeClicked'))
        {
            likebtn.classList.remove('likeClicked');
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("");
        }
        else {
            dislikebtn.classList.add('dislikeClicked');
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("");
        }
    }
    else if(dislikebtn.classList.contains('dislikeClicked'))
    {
        dislikebtn.classList.remove('dislikeClicked');
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("");
    }

}


$(document).mouseup(function(e)
{
    var trailer = $("#hiddenTrailer");

    if (!trailer.is(e.target) && trailer.has(e.target).length === 0)
    {
        trailer.hide();
    }
});

