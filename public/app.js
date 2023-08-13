'use strict';

const dogImage = document.getElementById('hairyball');
let rotationDegreeX = 0;
let rotationDegreeY = 0;
const switcher = document.querySelector('.btn');
const musicBTN = document.getElementById("music");
const videosBTN = document.getElementById("mp4s");
const seoulBTN = document.getElementById("seoul");
const flashedBTN = document.getElementById("flashed");
const julyBTN = document.getElementById("july");
const orangeBTN = document.getElementById("orange");
const edinburghBTN = document.getElementById("edinburgh");

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

musicBTN.addEventListener("click",function(){
    console.log('button clicked');
    window.location.href = "music.html";
});
videosBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "videos.html";
});
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
})
function rotate3D() {
    rotationDegreeX += 1; // Adjust the rotation angles as needed
    rotationDegreeY += 2;
    
    dogImage.style.transform = `rotateX(${rotationDegreeX}deg) rotateY(${rotationDegreeY}deg)`;
    requestAnimationFrame(rotate3D); // Continuously call the function
}
//rotate3D(); // Start the rotation animation