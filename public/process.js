let canvasStateStack = []; 
let currentStateIndex = -1; 

function saveCanvasState(canvas, effectType, effectData) {
    currentStateIndex++;
    console.log("saved state: " + currentStateIndex);

    // Remove states that are no longer relevant
    canvasStateStack = canvasStateStack.slice(0, currentStateIndex);

    // Save the current canvas state and effect data
    const state = {
        imageData: canvas.toDataURL(),
        effectType: effectType,
        effectData: effectData
    };
    canvasStateStack.push(state);
}

function undo() {
    if (currentStateIndex > 0) {
        currentStateIndex--;
        console.log("current state after hitting undo button: " + currentStateIndex);

        const canvas = document.getElementById('outputCanvas');
        const ctx = canvas.getContext('2d');

        const state = canvasStateStack[currentStateIndex];
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            // Restore applied effect if present
            if (state.effectType === 'monochrome') {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const monochromeImageData = monochromeImage(imageData, state.effectData.threshold);
                ctx.putImageData(monochromeImageData, 0, 0);
            } else if (state.effectType === 'pixelate') {
                const pixelSizeInput = document.getElementById('pixelSizeInput');
                const pixelSize = parseInt(pixelSizeInput.value);

                const pixelatedImageData = pixelateImage(canvas, pixelSize);
                ctx.putImageData(pixelatedImageData, 0, 0);
            }
        };
        img.src = state.imageData;
    }
}

function displayImageOnCanvas(imgElement, canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    saveCanvasState(canvas); // Save the initial state
}

function clearCanvas() {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset undo stack
    canvasStateStack = [];
    currentStateIndex = -1;
}
function openCamera() {
    const cameraInput = document.getElementById('cameraInput');
    cameraInput.click(); // Trigger the camera input click event
}
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = new Image();
        imgElement.onload = function() {
            displayImageOnCanvas(imgElement, document.getElementById('outputCanvas'));
        };
        imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function pixelateImage(canvas, pixelSize) {
    const ctx = canvas.getContext('2d');
    
    const numBlocksX = Math.ceil(canvas.width / pixelSize);
    const numBlocksY = Math.ceil(canvas.height / pixelSize);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, numBlocksX, numBlocksY);
    ctx.drawImage(canvas, 0, 0, numBlocksX, numBlocksY, 0, 0, canvas.width, canvas.height);

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function monochromeImage(imageData, monoThreshold) {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const color = grayscale < monoThreshold ? 0 : 255;

        data[i] = color;
        data[i + 1] = color;
        data[i + 2] = color;
    }

    return imageData;
}

function applyPixelation() {
    const canvas = document.getElementById('outputCanvas');
    const pixelSizeInput = document.getElementById('pixelSizeInput');
    const pixelSize = parseInt(pixelSizeInput.value);

    saveCanvasState(canvas, 'pixelate', { pixelSize: pixelSize });

    const pixelatedImageData = pixelateImage(canvas, pixelSize);
    canvas.getContext('2d').putImageData(pixelatedImageData, 0, 0);
}

function applyMonochrome() {
    const canvas = document.getElementById('outputCanvas');
    const monoThresholdInput = document.getElementById('monoThresholdInput');
    const monoThreshold = parseInt(monoThresholdInput.value);

    saveCanvasState(canvas, 'monochrome', { threshold: monoThreshold });

    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const monochromeImageData = monochromeImage(imageData, monoThreshold);
    canvas.getContext('2d').putImageData(monochromeImageData, 0, 0);
}
