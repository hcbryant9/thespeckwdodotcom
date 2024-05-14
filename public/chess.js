
const TEMPLATE = 1; // Change this value to set the template

const BGCOLOR = '#f5f5f5'; // Change this hex value to set the background color. Remember to keep the quotes!
const ALT = 'Reader for Electric Zine Maker'; // Change this to a plaintext copy or description of your content to make it visible to screen-readers
const SMOOTH = true; // Set to false if you want crispy pixels. Leave true if you like the blur.


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
    return ['assets/images/chess/FRONT.png', 'assets/images/chess/INNERFRONT.png'].concat(
        new Array(num).fill().map((_, idx) => 'assets/images/chess/' + (idx + 1) + '.png'),
        ['assets/images/chess/BACK.png']
    );
}

// Select template
switch (TEMPLATE) {
    default:
    case 1:
        card_amount = 4;
        textures = getTextures(5);
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

// Preloader
Promise.all(
    textures.map(
        src =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
                img.alt = src.split('/')[1].split('.')[0];
            })
    )
)
    .then(imgs => {
        LOADING_OVERLAY.remove();
        const list = document.createElement('ul');
        list.ariaHidden = true;
        pages = imgs.map((img, idx) => {
            const li = document.createElement('li');
            const flip = idx % 2;
            li.className = 'depth-' + Math.min(2, idx);
            li.style.transform = 'translateX(100%) rotateY(0deg) scaleZ(' + (flip ? -1 : 1) + ')';
            li.appendChild(img);
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
    })
    .catch(error => {
        console.error(error);
        LOADING_OVERLAY.textContent = 'Something went wrong! Make sure your images are in the pages folder! See console for details.';
    });

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

