function sliderTitleHover(div) {
    let show = div.getElementsByClassName("showMore")[0];
    show.style.display="inline-block";
}

function sliderTitleHoverExit(div) {
    let show = div.getElementsByClassName("showMore")[0];
    show.style.display="none";
}

function sliderShowArrow(div){
    let headerData=div.getElementsByClassName("headerData")[0];
    let arr=headerData.getElementsByClassName("titleArrow")[0];
    arr.style.display="inline-block";


}
function sliderHideArrow(div){
    let headerData=div.getElementsByClassName("headerData")[0];
    let arr=headerData.getElementsByClassName("titleArrow")[0];
    arr.style.display="none";

}

function showMore() {
    let moreDiv = document.getElementsByClassName("showMoreDiv")[0];
    if(moreDiv.style.display!=="block")
    {
        moreDiv.style.display="block";
    }

}

function closeShowMore(){
    let moreDiv = document.getElementsByClassName("showMoreDiv")[0];
    moreDiv.style.display="none";
}

$(document).mouseup(function(e)
{
    let showmore = $(".showMoreDiv");

    if (!showmore.is(e.target) && showmore.has(e.target).length === 0)
    {
        showmore.hide();
    }
});