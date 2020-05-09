function play(trailer){
    var x = document.getElementById("hiddenTrailer");
    if (x.style.display !== "block") {
        x.style.display = "block";
        x.innerHTML = '<iframe width="1280" height="720" id="theIframe" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        document.getElementById("theIframe").src=trailer;
    }


}

$(document).click(function(e) {


    if( e.target.id !== 'hiddenTrailer' && e.target.id!=="playbtn") {
        $("#hiddenTrailer").css({
            display: "none"
        });
    }
});