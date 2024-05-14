/*

    HTML5 Reader for Electric Zine Maker, made by Jeremy Oduber & contributors 2019-2021    
    v21.5
    Me:
        https://twitter.com/JeremyOduber
    This:
        https://jeremyoduber.itch.io/js-zine
    Electric Zine Maker: 
        https://alienmelon.itch.io/electric-zine-maker
    GitHub:
        https://github.com/jeremyoduber/EZM-Reader
    Licensed under the MIT License:
        https://github.com/jeremyoduber/EZM-Reader/blob/main/LICENSE
    
*/

//---- USER OPTIONS ----//
const TEMPLATE = 1; // Change this value to set the template

const BGCOLOR = '#f5f5f5'; // Change this hex value to set the background color. Remember to keep the quotes!
const ALT = 'Reader for Electric Zine Maker'; // Change this to a plaintext copy or description of your content to make it visible to screen-readers
const SMOOTH = true; // Set to false if you want crispy pixels. Leave true if you like the blur.

//---- END USER OPTIONS ----//

// Setup constants and variables
const FOV = 45;
const LOADING_OVERLAY = document.querySelector('#loading');
let card_amount;
let current_state = 0;
let textures = [];
let pages = [];

document.body.style.background = BGCOLOR;
document.body.ariaLabel = ALT;
if (SMOOTH) {
    document.body.style.imageRendering = 'auto';
} else {
    document.body.style.imageRendering = 'pixelated';
}
const metaTheme = document.createElement('meta');
metaTheme.name = 'theme-color';
metaTheme.content = BGCOLOR;
document.head.appendChild(metaTheme);

function getTextures(num) {
    const uploadedCanvases = [];
    for (let i = 1; i <= num; i++) {
        const canvasId = 'outputCanvas' + i;
        const canvas = document.getElementById(canvasId);
        if (canvas) {
            uploadedCanvases.push(canvas);
        }
    }
    return uploadedCanvases;
}



// Select template
switch (TEMPLATE) {
    default:
    case 1:
        card_amount = 4;
        textures = getTextures(8);
        break;
    case 2:
        card_amount = 6;
        textures = getTextures(9);
        break;
    case 3:
        card_amount = 7;
        textures = getTextures(11);
        break;
    case 4:
        card_amount = 8;
        textures = getTextures(13);
        break;
    case 5:
        card_amount = 12;
        textures = getTextures(21);
        break;
    case 6:
        card_amount = 13;
        textures = getTextures(23);
        break;
    case 7:
        card_amount = 16;
        textures = getTextures(29);
        break;
    case 8:
        card_amount = 32;
        textures = getTextures(61);
        break;
}

let initialized = false;

function initializeMagazine() {
    if (initialized) return;

    const LOADING_OVERLAY = document.querySelector('#loading');
    const IMAGE_TABLE = document.querySelector('#imageTable');
    const INIT_MAG = document.querySelector('#initializeMag');
    
    document.getElementById('loading').style.display = "block";
    const textures = getTextures(card_amount * 2); 

    // Perform the rest of the setup similar to what's done in the original script
    Promise.all(
        textures.map(canvas =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(canvas);
                img.onerror = reject;
                img.src = canvas.toDataURL(); // Use canvas data URL as image source
                img.alt = 'Uploaded Image';
            })
        )
    ).then(canvases => {
        LOADING_OVERLAY.remove();
        IMAGE_TABLE.remove();
        INIT_MAG.remove();
        const list = document.createElement('ul');
        list.ariaHidden = true;
        pages = canvases.map((canvas, idx) => {
            const li = document.createElement('li');
            const flip = idx % 2;
            li.className = 'depth-' + Math.min(2, idx);
            li.style.transform = 'translateX(100%) rotateY(0deg) scaleZ(' + (flip ? -1 : 1) + ')';
            li.appendChild(canvas);
            list.appendChild(li);
            return li;
        });
        document.body.appendChild(list);

        function updatePerspective() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            list.style.perspective = Math.sqrt(((w / 2) * w) / 2 + ((h / 2) * h) / 2) / Math.tan(((FOV / 2) * Math.PI) / 180) + 'px';
        }

        window.addEventListener('resize', updatePerspective);
        updatePerspective();

        initialized = true;
    }).catch(error => {
        console.error(error);
        LOADING_OVERLAY.textContent = 'Something went wrong!';
    });
}


// Keyboard input
document.addEventListener('keyup', function onKeyUp(key) {
    if (key.key === 'ArrowLeft' || key.key === 'a') {
        flipLeft();
    } else if (key.key === 'ArrowRight' || key.key === 'd') {
        flipRight();
    }
});

// Mouse input
document.addEventListener('pointerup', function onPointerUp(event) {
    if (event.button !== 0) return;
    if (event.clientX < window.innerWidth / 2) {
        flipRight();
    } else {
        flipLeft();
    }
});

function getPages(state) {
    return [pages[state * 2], pages[state * 2 + 1]].filter(i => i);
}
function replaceTransformPerPage(state, search, replace) {
    getPages(state).forEach(page => {
        page.style.transform = page.style.transform.replace(search, replace);
    });
}
function setDepth(state, depth) {
    getPages(state).forEach(page => {
        page.className = page.className.replace(/depth-\d+/, 'depth-' + Math.min(depth, 2));
    });
}

// Flip page left
function flipLeft() {
    console.log("flip left");
    if (current_state >= card_amount) return;
    replaceTransformPerPage(current_state, '0deg', '-180deg');
    setDepth(current_state - 1, 1);
    setDepth(current_state - 2, 2);
    setDepth(current_state + 1, 0);
    setDepth(current_state + 2, 1);
    ++current_state;
}

// Flip page right
function flipRight() {
    console.log("flip right");
    if (current_state <= 0) return;
    replaceTransformPerPage(current_state - 1, '-180deg', '0deg');
    setDepth(current_state - 3, 1);
    setDepth(current_state - 2, 0);
    setDepth(current_state + 1, 2);
    setDepth(current_state, 1);
    --current_state;
}

