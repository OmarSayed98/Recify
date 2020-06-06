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
    input.style.display="block";

}

function displayChangeEmailInput(){
    let input= document.getElementById("editEmailInput");
    input.style.display="block";
}

function displayChangePasswordInput(){

    let input1 = document.getElementById("editPasswordOldInput");
    let input2 = document.getElementById("editPasswordNewInput");
    let input3 = document.getElementById("editPasswordConfInput");
    input1.style.display="block";
    input2.style.display="block";
    input3.style.display="block";

}

function matchPassword(confirmPass)
{

    var pass= document.getElementById('Password');
    if(pass.value !== confirmPass.value)
    {
        confirmPass.setCustomValidity("Passwords Don't Match");
    }
    else {
        confirmPass.setCustomValidity("");
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

