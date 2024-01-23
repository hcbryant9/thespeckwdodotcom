'use strict';

const dogImage = document.getElementById('hairyball');
let rotationDegreeX = 0;
let rotationDegreeY = 0;
const switcher = document.querySelector('.btn');
const videosBTN = document.getElementById("mp4s");
const seoulBTN = document.getElementById("seoul");
const flashedBTN = document.getElementById("flashed");
const julyBTN = document.getElementById("july");
const orangeBTN = document.getElementById("orange");
const edinburghBTN = document.getElementById("edinburgh");
const dylonBTN = document.getElementById("dylon");
const jpgBTN = document.getElementById("jpgs");
const projectsBTN = document.getElementById("projects");
const technologyBTN = document.getElementById("technology");
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
technologyBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "technology.html";
});

videosBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "videos.html";
});

projectsBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "projects.html";
});
jpgBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "jpgs.html";
});

function rotate3D() {
    rotationDegreeX += 1; // Adjust the rotation angles as needed
    rotationDegreeY += 2;
    
    dogImage.style.transform = `rotateX(${rotationDegreeX}deg) rotateY(${rotationDegreeY}deg)`;
    requestAnimationFrame(rotate3D); // Continuously call the function
}
//rotate3D(); // Start the rotation animation