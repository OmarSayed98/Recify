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

}

function dislikeMovie()
{

}


$(document).mouseup(function(e)
{
    var trailer = $("#hiddenTrailer");

    if (!trailer.is(e.target) && trailer.has(e.target).length === 0)
    {
        trailer.hide();
    }
});

