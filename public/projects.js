'use strict';


const projectOverview = document.getElementById("projectOverview");




const kinectBTN = document.getElementById("kinect");
const harmonyBTN = document.getElementById("harmony");
const huesBTN = document.getElementById("hues");
const emotionalBTN = document.getElementById("emotional");
const websiteBTN = document.getElementById("website");
const aboutBTN = document.getElementById("about-me");
const pumpBTN = document.getElementById("pump");
//adding event handler for the click event



kinectBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "kinect.html";
});
harmonyBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "harmony.html";
});
huesBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "game.html";
});
emotionalBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "emotions.html";
});
websiteBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "index.html";
});
aboutBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "about.html";
});
pumpBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "pump.html";
});



// Adding event handler for the mouseover event
kinectBTN.addEventListener('mouseover', function () {
    updateOverview(
    "kinect-pure-data-unity is a body synthesizer created to auralize the space we occupy",
    "Kinect v2, Pure Data, Unity, C#",
    "Summer 2023 - Fall 2023",
    "assets/images/projects/kinect.png",
    "6%");
});

harmonyBTN.addEventListener('mouseover', function () {
    updateOverview(
    "virtual-soul-harmony is a mixed media exhibit presented 12/08/23. In the virtual world, users are in a forest while, in the physical world, they are standing on a roll of grass.",
    "Unity, Quest 2, Sod",
    "Fall 2023",
    "assets/images/laurengrass.jpg",
    "12%");
});

huesBTN.addEventListener('mouseover', function () {
    updateOverview(
    "guess-hue is a web game inspired by the board game Hues and Cues as well as NYT games such as Wordle and the Mini Cross",
    "React.js, HTML, CSS, Python",
    "December 2023 - Current",
    "assets/images/projects/colourboard.png",
    "15%");
});

emotionalBTN.addEventListener('mouseover', function () {
    updateOverview(
    "emotional-survaillence-ml is a machine learning project to raise awareness about the harm of ML and AI on the individual.",
    "Python, scikit-learn, pandas, Unity, Meta Quest Pro",
    "Fall 2023 - Current",
    "assets/images/projects/emotion.png",
    "13%");
});

websiteBTN.addEventListener('mouseover', function () {
    updateOverview(
    "The website serves as an alternative platform to addictive media platforms. Hank1wdo.com is largely inspired by individual-blogs and various open-sourced communities. ",
    "JavaScript, HTML, CSS, Firebase, GitHub Actions",
    "Summer 2023 - Current",
    "assets/images/hairy.jpg",
    "15%");
});

pumpBTN.addEventListener('mouseover', function () {
    updateOverview("In collaboration with 'Friends of Pumphouse', a VR tour of the long-term restoration project of the Richmond Pumphouse.",
    "Unity, C#, Maya, Meta Quest 2",
    "Fall 2023 - Current",
    "assets/images/projects/water_pump_ref.jpg",
    "16%");
});

// Function to update the overview based on the project button
// Function to update the overview based on the project button
function updateOverview(overview, tools, timeline, imageSrc, imageSize) {
    projectOverview.innerHTML = "Overview: " + overview + "<br>";
    projectOverview.innerHTML += "Tools: " + tools + "<br>";
    projectOverview.innerHTML += "Timeline: " + timeline + "<br><br>"
   
    //add an image
    /* 
    const imageElement = document.createElement("img");
    imageElement.src = imageSrc;
    imageElement.alt = "Project Image";
    imageElement.style.width = imageSize; 
    imageElement.style.height = imageSize 
    projectOverview.appendChild(imageElement);
    */
}
