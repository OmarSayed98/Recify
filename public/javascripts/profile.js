function show(selected) {
    let linkId=selected.id.toString();
    let link= document.getElementById(linkId);
    let nav_div = document.getElementsByClassName("nav-div")[0];
    let nav_tabs = nav_div.children;

    for(let i=0;i < nav_div.children.length;i++)
    {
        nav_tabs[i].classList.remove("active-tab");
    }

    link.classList.add("active-tab");

    let className = linkId.replace('Link','-content');
    let displayDiv = document.getElementsByClassName(className.toString())[0];
    let allDivs=document.getElementsByClassName("content-div");
    for(let i=0;i<allDivs.length;i++)
    {
        let hideThis=document.getElementsByClassName(allDivs[i].classList.item(1))[0];
        hideThis.style.display="none";

    }

    displayDiv.style.display="block";
}

function displayChangeNameInput(){
    let input= document.getElementById("editNameInput");
    if(input.style.display!=="block")
    {
        input.style.display="block";
    }
    else
    {
        input.style.display="none";
    }
}

function displayChangeEmailInput(){
    let input= document.getElementById("editEmailInput");
    if(input.style.display!=="block")
    {
        input.style.display="block";
    }
    else
    {
        input.style.display="none";
    }
}

function displayChangePasswordInput(){

    let input1 = document.getElementById("editPasswordOldInput");
    let input2 = document.getElementById("editPasswordNewInput");
    let input3 = document.getElementById("editPasswordConfInput");
    if(input1.style.display!=="block")
    {
        input1.style.display="block";
        input2.style.display="block";
        input3.style.display="block";
    }
    else
    {
        input1.style.display="none";
        input2.style.display="none";
        input3.style.display="none";
    }

}

function showEditProfile()
{
    let editTab = document.getElementsByClassName("editProfileTab-content")[0];

    if(editTab.style.maxHeight==="0px" || editTab.style.maxHeight==="")
    {
        editTab.style.maxHeight="500px";
    }
    else
    {
        editTab.style.maxHeight="0px";

    }
}

$('#LikesTabLink').on( 'click', function() {
    $(".carousel").show()
        // resize after un-hiding Flickity
        .flickity('resize');
});

$('#DislikesTabLink').on( 'click', function() {
    $(".carousel").show()
        // resize after un-hiding Flickity
        .flickity('resize');
});

