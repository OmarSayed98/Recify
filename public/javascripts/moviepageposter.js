
function hide() {
    var x = document.getElementById("playbtn");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function play(trailer){
    document.getElementById('vidwrap').innerHTML = '<iframe width="210" height="370" id="theIframe"> frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    document.getElementById('theIframe').src=trailer;

}