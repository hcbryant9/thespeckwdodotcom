'use strict';


const projectOverview = document.getElementById("projectOverview");




const kinectBTN = document.getElementById("kinect");
const harmonyBTN = document.getElementById("harmony");
const huesBTN = document.getElementById("hues");
const emotionalBTN = document.getElementById("emotional");
const websiteBTN = document.getElementById("website");
const pumpBTN = document.getElementById("pump");
const lucidityBTN = document.getElementById("lucidity");
const guessBTN = document.getElementById("guess");

const bodyBTN = document.getElementById("body");

const aboutBTN = document.getElementById("about-me");
const technologyPhotoBTN = document.getElementById("technology-photo");
const kinectPhotoBTN = document.getElementById("kinect-photo");
const harmonyPhotoBTN = document.getElementById("harmony-photo");
const emotionPhotoBTN = document.getElementById("emotion-photo");
const pumpPhotoBTN = document.getElementById("pump-photo");
const characPhotoBTN = document.getElementById("charac-photo");
const lucidPhotoBTN = document.getElementById("lucid-photo");
const pitchPhotoBTN = document.getElementById("pitch-photo");
const guessPhotoBTN = document.getElementById("guess-photo");
const monoPhotoBTN = document.getElementById("mono-photo");

const bodyPhotoBTN = document.getElementById("body-photo");


//adding event handler for the click event

aboutBTN.addEventListener('click',function(){window.location.href = "about.html";});
technologyPhotoBTN.addEventListener('click',function(){window.location.href = "technology.html";});
kinectPhotoBTN.addEventListener('click',function(){window.location.href = "kinect.html";});
harmonyPhotoBTN.addEventListener('click',function(){window.location.href = "harmony.html";});
emotionPhotoBTN.addEventListener('click',function(){window.location.href = "emotions.html";});
pumpPhotoBTN.addEventListener('click',function(){window.location.href = "pump.html";});
characPhotoBTN.addEventListener('click',function(){window.location.href = "index.html";});
lucidPhotoBTN.addEventListener('click',function(){window.location.href = "lucidity.html";});
pitchPhotoBTN.addEventListener('click',function(){window.location.href = "pitch.html";});
guessPhotoBTN.addEventListener('click',function(){window.location.href= "guesshue.html";});
monoPhotoBTN.addEventListener('click', function(){window.location.href = "upelanding.html";});

bodyPhotoBTN.addEventListener('click', function(){window.location.href="body.html"});


const clickCounts = {};
let currentProjectKey = null;

const projects = {
    kinect: {
        title: "kinect-pure-data-unity",
        description: "kinect-pure-data-unity is a body synthesizer created to auralize the space we occupy",
        tools: "Kinect v2, Pure Data, Unity, C#",
        timeline: "Summer 2023 - Fall 2023",
        filename: "kinect"
        
    },
    harmony: {
        title: "virtual-soul-harmony",
        description: "virtual-soul-harmony is a mixed media exhibit presented 12/08/23. In the virtual world, users are in a forest while, in the physical world, they are standing on a roll of grass.",
        tools: "Unity, Quest 2, Sod",
        timeline: "Fall 2023",
        filename: "harmony"
        
    },
    hues: {
        title: "guess-hue",
        description: "guess-hue is a web game inspired by the board game Hues and Cues as well as NYT games such as Wordle and the Mini Cross",
        tools: "React.js, HTML, CSS, Python",
        timeline: "December 2023 - Current",
        filename: "game"
        
    },
    emotional: {
        title: "emotional-survaillence-ml",
        description: "emotional-survaillence-ml is a machine learning project to raise awareness about the harm of ML and AI on the individual.",
        tools: "Python, scikit-learn, pandas, Unity, Meta Quest Pro",
        timeline: "Fall 2023 - Current",
        filename: "emotions"
        
    },
    website: {
        title: "personal-website",
        description: "The website serves as an alternative platform to addictive media platforms. Hank1wdo.com is largely inspired by individual-blogs and various open-sourced communities.",
        tools: "JavaScript, HTML, CSS, Firebase, GitHub Actions",
        timeline: "Summer 2023 - Current",
        filename: "index"
        
    },
    pump: {
        title: "pumphouse-virtual-tour",
        description: "In collaboration with 'Friends of Pumphouse', a VR tour of the long-term restoration project of the Richmond Pumphouse.",
        tools: "Unity, C#, Maya, Meta Quest 2",
        timeline: "Fall 2023 - Current",
        filename:"pump"
       
    },
    lucidity:{
        title:"lucidity-vr-performance",
        description:"lucidity is a virtual reality immersive performance in collaboration with the school of kinetic imaging at vcu & korea national university of arts",
        tools:"Unity, Normcore, Inverse Kinematics, Quest 3, Quest 3, Quest 3, Quest 2",
        timeline:"Fall 2023 - Spring 2024",
        filename:"lucidity"
    },
    pitch:{
        title:"pytch-detection-pd",
        description:"Networking realtime pitch detections into Pure Data from Python using socket programming",
        tools:"Python, Pure Data, Networking, UDP",
        timeline:"Spring 2024 - Current",
        filename:"pitch"
    },
    guess:{
        title:"guess-hue",
        description: "A single-player, NYT-style, web implementation of the board game Hues and Cues",
        tools: "JavaScript, React, Python, HTML, CSS",
        timeline: "December 2023 - Current",
        filename: "guesshue"
    },
    mono:{
        title:"untitled-photo-editor",
        description: "Image processing web-app effects inspired by alienmelon",
        tools: "OpenCV, JavaScript, HTML",
        timeline: "Spring 2024",
        filename: "upelanding"
    },
    ig:{
        title:"instagram-refitter",
        description: "Resize images to the constraits of instagram.com",
        timeline: "Summer 2024",
        filename: "instagram"
    },
    body:{
        title:"body-synthesis",
        description: "interactive sound installation showed at aisle isle on 9/27/2024",
        tools:"python, pure-data, osc, machine-learning, opencv",
        timeline: "August - September 2024",
        filename: "body"
    }
};

function updateOverview(project) {
    projectOverview.innerHTML = 
    `
    
    <table> 
        <tr> 
            <td>Projects</td>
            <td>Overview</td>
            <td>Tools</td>
            <td>Timeline</td>
        </tr>
        
        <tr> 
            <td><a href = ${project.filename}.html>${project.title}</a></td>
            <td>${project.description}</td>
            <td>${project.tools}</td>
            <td>${project.timeline}</td>
        </tr>
      
        
    </table>
    <br>photos - 1 click(s) <br> buttons - 2 click(s)`
    //`Overview: ${project.description}<br>
    //Tools: ${project.tools}<br>
    //Timeline: ${project.timeline}<br><br> Double Click to Visit Page`;
}

function handleButtonClick(projectKey) {
    if (currentProjectKey !== null && currentProjectKey !== projectKey) {
        // Reset click count for the previously clicked button
        clickCounts[currentProjectKey] = 0;
    }

    if (!clickCounts[projectKey]) {
        // First click: Display project information
        const project = projects[projectKey];
        console.log(`${project.title} button clicked - Displaying project information`);
        updateOverview(project);
        clickCounts[projectKey] = 1;
        currentProjectKey = projectKey;
    } else {
        // Second click: Navigate to project page
        console.log(`${projects[projectKey].title} button clicked - Navigating to project page`);
        window.location.href = `${projects[projectKey].filename}.html`;
    }
}

// Adding event listeners for project buttons
for (const projectKey in projects) {
    if (projects.hasOwnProperty(projectKey)) {
        const button = document.getElementById(projectKey);
        button.addEventListener('click', () => handleButtonClick(projectKey));
    }
}