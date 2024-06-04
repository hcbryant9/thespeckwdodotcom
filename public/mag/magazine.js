let images = []; // Array to store uploaded image URLs
let current_state = 0;

function handleImageUpload(event, canvasId) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = new Image();
        imgElement.onload = function() {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

            images.push(canvas.toDataURL());
        };
        imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function initializeMagazine() {
    document.getElementById('imageTable').style.display = 'none';
    document.getElementById('initializeMag').style.display = 'none';
    document.getElementById('magazineContainer').style.display = 'block';

    const magazinePages = document.getElementById('magazinePages');
    magazinePages.innerHTML = '';

    images.forEach((image, index) => {
        const li = document.createElement('li');
        li.className = 'depth-' + Math.min(2, index);
        li.style.transform = 'translateX(100%) rotateY(0deg) scaleZ(' + (index % 2 ? -1 : 1) + ')';
        li.innerHTML = `<img src="${image}">`;
        magazinePages.appendChild(li);
    });
}




// Flip page left
function flipLeft() {
    console.log("flip left");
    if (current_state >= 4) return;
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

function getPages(state) {
    const pages = document.querySelectorAll('#magazinePages li');
    return [pages[state * 2], pages[state * 2 + 1]].filter(i => i);
}

// Keyboard input
document.addEventListener('keyup', function onKeyUp(key) {
    if (key.key === 'ArrowLeft' || key.key === 'a') {
        flipRight();
    } else if (key.key === 'ArrowRight' || key.key === 'd') {
        flipLeft();
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
