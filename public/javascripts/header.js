function sandwich(){
  var sanmenu = document.getElementById('sandwichMenu');
    var smenu = document.getElementById("smallmenu");
    var sbar=document.getElementById('sbar');

    if(smenu.style.display === "none")
    {
      smenu.style.display = "block";
      sanmenu.style.background="rgba(133, 133, 133, 0.4)";
      sbar.style.width="100%";
    }
    else {
      smenu.style.display = "none";
      sanmenu.style.background="none";
    }


}
