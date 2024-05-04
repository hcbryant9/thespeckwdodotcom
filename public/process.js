let canvasStateStack = []; 
let currentStateIndex = 0; 

function saveCanvasState(canvas) {
    currentStateIndex++;
    canvasStateStack = canvasStateStack.slice(0, currentStateIndex);
    canvasStateStack.push(canvas.toDataURL());
}

function undo() {
    console.log("current state" + currentStateIndex);
    if (currentStateIndex > 0) {
        currentStateIndex--; 
        const canvas = document.getElementById('outputCanvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            ctx.drawImage(img, 0, 0); 
        };
        img.src = canvasStateStack[currentStateIndex];
    }
}
function displayImageOnCanvas(imgElement, canvas) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Reset undo stack
    canvasStateStack = [];
    currentStateIndex = -1;
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
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    const numBlocksX = Math.ceil(canvas.width / pixelSize);
    const numBlocksY = Math.ceil(canvas.height / pixelSize);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, numBlocksX, numBlocksY);
    ctx.drawImage(canvas, 0, 0, numBlocksX, numBlocksY, 0, 0, canvas.width, canvas.height);

    //ctx.canvas.getContext('2d').commit();
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
    const pixelSizeInput = document.getElementById('pixelSizeInput');
    const pixelSize = parseInt(pixelSizeInput.value);

    const canvas = document.getElementById('outputCanvas');
    saveCanvasState(canvas);
    const pixelatedImageData = pixelateImage(canvas, pixelSize);
    canvas.getContext('2d').putImageData(pixelatedImageData, 0, 0);
}

function applyMonochrome() {
    const monoThresholdInput = document.getElementById('monoThresholdInput');
    const monoThreshold = parseInt(monoThresholdInput.value);

    const canvas = document.getElementById('outputCanvas');
    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

    const monochromeImageData = monochromeImage(imageData, monoThreshold);
    canvas.getContext('2d').putImageData(monochromeImageData, 0, 0);
}
