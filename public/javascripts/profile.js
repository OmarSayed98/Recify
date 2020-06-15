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
    let theDiv= document.getElementById("changeName");
    if(theDiv.children[1]===undefined)
    {
        let inpt = document.createElement('input');
        inpt.classList.add("Input");
        inpt.type="text";
        inpt.id="editNameInput";
        inpt.name="newName";
        inpt.placeholder="Name";
        theDiv.appendChild(inpt);
    }
    else
    {
        theDiv.removeChild(theDiv.children[1]);
    }
}

function displayChangeEmailInput(){
    let theDiv= document.getElementById("changeEmail");
    if(theDiv.children[1]===undefined)
    {
        let inpt = document.createElement('input');
        inpt.classList.add("Input");
        inpt.type="text";
        inpt.id="editEmailInput";
        inpt.name="newEmail";
        inpt.pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
        inpt.title="Email should be something like omar@hotmail.com";
        inpt.placeholder="Email";
        theDiv.appendChild(inpt);
    }
    else
    {
        theDiv.removeChild(theDiv.children[1]);
    }
}

function displayChangePasswordInput(){
    let theDiv= document.getElementById("changePassword");
    if(theDiv.children[1]===undefined)
    {
        let inpt1 = document.createElement('input');
        let inpt2 = document.createElement('input');
        let inpt3 = document.createElement('input');


        inpt1.classList.add("Input");
        inpt1.classList.add("editPass");
        inpt1.type="password";
        inpt1.id="editPasswordOldInput";
        inpt1.name="oldPassword";
        inpt1.placeholder="Old password";


        inpt2.classList.add("Input");
        inpt2.classList.add("editPass");
        inpt2.type="password";
        inpt2.id="editPasswordNewInput";
        inpt2.name="newPassword";
        inpt2.placeholder="New password";
        inpt2.pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
        inpt2.title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";


        inpt3.classList.add("Input");
        inpt3.classList.add("editPass");
        inpt3.type="password";
        inpt3.id="editPasswordConfInput";
        inpt3.name="confirmNewPassword";
        inpt3.placeholder="Confirm password";
        inpt3.pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
        inpt3.title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";

        theDiv.appendChild(inpt1);
        theDiv.appendChild(inpt2);
        theDiv.appendChild(inpt3);

    }
    else
    {
        theDiv.removeChild(theDiv.children[3]);
        theDiv.removeChild(theDiv.children[2]);
        theDiv.removeChild(theDiv.children[1]);
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

function checkForm()
{
    let form = document.getElementsByClassName("EditProfile")[0];
    let changePass = document.getElementById("changePassword");
    let inpts = form.getElementsByTagName("input");
    for (let i = 0; i < inpts.length;i++) {
        if(inpts[i].value==="")
        {
            alert(inpts[i].placeholder + " is empty");
            return false;
        }
    }

   if(changePass.children.length>1)
   {
       let pass = document.getElementById("editPasswordNewInput");
       let confPass = document.getElementById("editPasswordConfInput");
       if(pass.value!==confPass.value)
       {
           alert("New and confirm passwords don't match");
           return false;
       }
   }

    return true;
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

