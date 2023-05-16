'use strict';
/*
*The document.querySelector function uses CSS selectors, 
*just like the ones you used in your CSS file. switcher 
*is now a reference to the button in the page.
*/
const switcher = document.querySelector('.btn');

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