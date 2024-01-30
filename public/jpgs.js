'use strict';



const musicBTN = document.getElementById("music");
const videosBTN = document.getElementById("mp4s");
const seoulBTN = document.getElementById("seoul");
const flashedBTN = document.getElementById("flashed");
const julyBTN = document.getElementById("july");
const orangeBTN = document.getElementById("orange");
const edinburghBTN = document.getElementById("edinburgh");
const dylonBTN = document.getElementById("dylon");
const septemberBTN = document.getElementById("september");
const pbjBTN = document.getElementById("pbj");
const jpgBTN = document.getElementById("jpgs");
const projectsBTN = document.getElementById("projects");
const laurenBTN = document.getElementById("lauren");
const emmaBTN = document.getElementById("emma");
const zineBTN = document.getElementById("zine");
const nycBTN = document.getElementById("nyc");

//adding event handler for the click event



seoulBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "sheets.html";
});
orangeBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "orange.html";
});
julyBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "three.html";
});
flashedBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "flashed.html";
});
edinburghBTN.addEventListener('click', function(){
    console.log('button clicked');
    window.location.href = "edinburgh.html";
});
septemberBTN.addEventListener('click', function(){
    console.log('button clicked');
    window.location.href = "september.html";
});
pbjBTN.addEventListener('click', function(){
    console.log('button clicked');
    window.location.href = "pbj.html";
});
laurenBTN.addEventListener('click', function(){
    console.log('button clicked');
    window.location.href = "lauren.html";
});
emmaBTN.addEventListener('click', function(){
    console.log('button clicked');
    window.location.href = "emma.html";
});
zineBTN.addEventListener('click', function(){
    console.log('button clicked');
    window.location.href = "2024.html";
});
nycBTN.addEventListener('click', function(){
    console.log('button clicked');
    window.location.href = "nyc.html";
});

