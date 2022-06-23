
// const fs = require('fs');
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}
let data = [""]
let num_movies = 0;

readTextFile("../other/movies.json", function(text){
  data = JSON.parse(text);
  num_movies = data.length;
});

function getParams(){
  var params = {
    "years": [],
    "rating":0,
    "hardness":0,
    "language": "hindi"
  }
  params.years = []
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  for (var i = 0; i < checkboxes.length; i++) {
    params.years.push(checkboxes[i].value)
  }
  params.years.push(0);
  params.years.push(0);
  params.years.push(0);
  params.rating = document.getElementsByClassName("ratingslider")[0].value;
  params.hardness = document.getElementsByClassName("hardnessslider")[0].value;
  params.language = document.getElementsByClassName("Language")[0].value;

  return params;


}

function movieSatisfy(params, movie){

  if(movie["Movie Name"].split(" ").length > params["hardness"]){
    return false;
  }

  if(parseFloat(movie["Rating(10)"]) < params["rating"]){
    return false;
  }

  if (movie["Language"] != params["language"]){
    return false;
  }
  
  let yearsChoice = 0+ parseInt(params["years"][0]) + parseInt(params["years"][1]);
  if (yearsChoice==0 && parseInt(movie["Year"]) != 2000){
    return false;
  }
  if (yearsChoice==1 && parseInt(movie["Year"]) >= 2000){
    return false;
  }
  if (yearsChoice==2 && parseInt(movie["Year"]) < 2000){
    return false;
  }

  return true;
}

function generate(){
  let params = getParams();
  let randomMovie = data[Math.floor(Math.random() * num_movies)];
  // console.log(movieDoesnotSatisfy(params, randomMovie));
  let limit = 1;
  while(!movieSatisfy(params, randomMovie)){
    if (limit >10000){
      alert("Query could not be fullfilled..");
      break;
    }
    randomMovie = data[Math.floor(Math.random() * num_movies)];
    limit += 1;
  }
  console.log(randomMovie);

  document.getElementById("movie").innerHTML = randomMovie["Movie Name"];
  var audio = new Audio('../other/bell.wav');
  audio.play();
}

var slide1 = document.getElementsByClassName('ratingslider')[0];

slide1.onchange = function() {
  let rate = document.getElementsByClassName("ratingslider")[0].value;
  document.getElementById("rating").innerHTML = rate;
}


var slide2 = document.getElementsByClassName('hardnessslider')[0];

slide2.onchange = function() {
  let hard = document.getElementsByClassName("hardnessslider")[0].value;
  document.getElementById("hard").innerHTML = hard;
}
