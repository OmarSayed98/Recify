function sliderTitleHover(showMore) {
    const show=document.getElementById(showMore);
    show.style.display="inline-block";



}

function sliderTitleHoverExit(showMore) {
    const show=document.getElementById(showMore);
    show.style.display="none";

}

function sliderShowArrow(arrow){
    const arr=document.getElementById(arrow);
    arr.style.display="inline-block";

}
function sliderHideArrow(arrow){
    const arr=document.getElementById(arrow);
    arr.style.display="none";

}

function showMore() {
    let moreDiv = document.getElementsByClassName("showMoreDiv")[0];
    if(moreDiv.style.display!=="block")
    {
        moreDiv.style.display="block";
    }

}

$(document).mouseup(function(e)
{
    let showmore = $(".showMoreDiv");

    if (!showmore.is(e.target) && showmore.has(e.target).length === 0)
    {
        showmore.hide();
    }
});