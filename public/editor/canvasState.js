/*
* Class for canvas controlling: saving, undo, and clearing
*/

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
            } else if(state.effectType === 'blur'){
                const blurSize = state.effectData.radius;
                const blurImageData = blurImage(canvas, blurSize);
                ctx.putImageData(blurImageData, 0, 0);
            } else if(state.effectType === 'halftone'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const halftoneImageData = halftoneImage(imageData);
                ctx.putImageData(halftoneImageData,0,0);
            }else if(state.effectData === 'multiply'){
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
            } else if(state.effectData === 'bloom'){
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const bloomImageData = bloomImage(imageData,0.1,25,0.8);
                ctx.putImageData(bloomImageData,0,0);
            }
        };
        img.src = state.imageData;
    }
}

function clearCanvas() {
    //grab canvases
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');

    const layerCanvas = document.getElementById('layerCanvas');
    const ctxL = layerCanvas.getContext('2d');

    //clearing canvases
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxL.clearRect(0,0, canvas.width, canvas.height);
    
    // Reset undo stack
    canvasStateStack = [];
    currentStateIndex = -1;

    //grab UI and hide them
    document.getElementById('blendOptions').style.display = "none";
    document.getElementById('effectOptions').style.display = "none";
    document.getElementById('textOptions').style.display = "none";
    document.getElementById('fontOptions').style.display = "none";
}
