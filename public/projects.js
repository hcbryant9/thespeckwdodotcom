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
        title: "index",
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
       
    }
};

function updateOverview(project) {
    projectOverview.innerHTML = 
    `Overview: ${project.description}<br>
    Tools: ${project.tools}<br>
    Timeline: ${project.timeline}<br><br> Double Click to Visit Page`;
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