let canvasStateStack = [];
let currentStateIndex = -1;

function saveCanvasState(canvas, effectType, previousData , effectData) {
    currentStateIndex++;
    console.log("saved state: " + currentStateIndex);

    // Remove states that are no longer relevant
    canvasStateStack = canvasStateStack.slice(0, currentStateIndex);

    // Save the current canvas state and effect data
    const state = {
        imageData: canvas.toDataURL(),
        effectType: effectType,
        previousData: previousData,
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
                const pixelSize = state.effectData.pixelSize;
                const pixelatedImageData = pixelateImage(canvas, pixelSize);
                ctx.putImageData(pixelatedImageData, 0, 0);
            } else if (state.effectType === 'bayer') {
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const bayerImageData = bayerImage(imageData);
                ctx.putImageData(bayerImageData,0,0);
            } else if(state.effectData === 'multiply'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const multImg = state.effectData.multImg;
                const multiplyImageData = blendImages(imageData, multImg, 'multiply');
                ctx.putImageData(multiplyImageData,0,0);
            } else if(state.effectData === 'add'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const addImg = state.effectData.multImg;
                const addImageData = blendImages(imageData, addImg, 'add');
                ctx.putImageData(addImageData,0,0);
            }else if(state.effectData === 'screen'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const addImg = state.effectData.multImg;
                const addImageData = blendImages(imageData, addImg, 'screen');
                ctx.putImageData(addImageData,0,0);
            }else if(state.effectData === 'subtract'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const addImg = state.effectData.multImg;
                const addImageData = blendImages(imageData, addImg, 'subtract');
                ctx.putImageData(addImageData,0,0);
            }else if(state.effectData === 'overlay'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const addImg = state.effectData.multImg;
                const addImageData = blendImages(imageData, addImg, 'overlay');
                ctx.putImageData(addImageData,0,0);
            }else if(state.effectData === 'lighten'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const addImg = state.effectData.multImg;
                const addImageData = blendImages(imageData, addImg, 'lighten');
                ctx.putImageData(addImageData,0,0);
            }else if(state.effectData === 'darken'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const addImg = state.effectData.multImg;
                const addImageData = blendImages(imageData, addImg, 'darken');
                ctx.putImageData(addImageData,0,0);
            }
        };
        img.src = state.imageData;
    }
}

function clearCanvas() {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');

    const layerCanvas = document.getElementById('layerCanvas');
    const ctxL = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxL.clearRect(0,0, canvas.width, canvas.height);
    
    // Reset undo stack
    canvasStateStack = [];
    currentStateIndex = -1;
}
