function loadSliderImages(){
    var pst = document.getElementById("sliderimg1");
    var pst2 = document.getElementById("sliderimg2");
    var pst3 = document.getElementById("sliderimg3");

    var movie = "joker";
    var key="&apikey=e7aad19";

    $.getJSON('http://www.omdbapi.com/?t='+movie + key).then(function(response){
        var t=JSON.stringify(response);
        var tt=JSON.parse(t);
        pst.src=tt.Poster;

    });
    var movie = "avengers";

    $.getJSON('http://www.omdbapi.com/?t='+movie + key).then(function(response){
        var t=JSON.stringify(response);
        var tt=JSON.parse(t);
        pst2.src=tt.Poster;

    });

    var movie = "inception";
    $.getJSON('http://www.omdbapi.com/?t='+movie + key).then(function(response){
        var t=JSON.stringify(response);
        var tt=JSON.parse(t);
        pst3.src=tt.Poster;

    });
}