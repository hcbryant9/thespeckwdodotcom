'use strict';


const switcher = document.querySelector('.btn');
const musicBTN = document.querySelector('.music-btn');
const videosBTN = document.querySelector('.videos-btn');
const sheetsBTN = document.querySelector('.sheets-btn');
const flashedBTN = document.querySelector('.flashed-btn');
const threeBTN = document.querySelector('.three-btn');
const orangeBTN = document.querySelector('.orange-btn');
//adding event handler for the click event

switcher.addEventListener('click', function(){

    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme"){
        this.textContent = "dark";
        
    } else{
        this.textContent = "light";
    }
    console.log('current class name: ' + className);
    
});

musicBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "music.html";
});
videosBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "videos.html";
});
sheetsBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "sheets.html";
});
orangeBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "orange.html";
});
threeBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "three.html";
});
flashedBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "flashed.html";
});
