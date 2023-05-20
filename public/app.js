'use strict';

/*
*The document.querySelector function uses CSS selectors, 
*just like the ones you used in your CSS file. switcher 
*is now a reference to the button in the page.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVQnDJY2l9fwGDI8BQ3_cNNN0HSwQcq60",
  authDomain: "thespeckwdo.firebaseapp.com",
  projectId: "thespeckwdo",
  storageBucket: "thespeckwdo.appspot.com",
  messagingSenderId: "612647361206",
  appId: "1:612647361206:web:682f8f707d662c432f2417",
  measurementId: "G-JY9QRHFPKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/
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
