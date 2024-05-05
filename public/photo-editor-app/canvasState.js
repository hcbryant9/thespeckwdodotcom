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
                const pixelSize = state.effectData.pixelSize;
                const pixelatedImageData = pixelateImage(canvas, pixelSize);
                ctx.putImageData(pixelatedImageData, 0, 0);
            } else if (state.effectType === 'bayer') {
                const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
                const bayerImageData = bayerImage(imageData);
                ctx.putImageData(bayerImageData,0,0);
            }
        };
        img.src = state.imageData;
    }
}

function clearCanvas() {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset undo stack
    canvasStateStack = [];
    currentStateIndex = -1;
}
