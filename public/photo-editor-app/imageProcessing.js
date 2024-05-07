function applyBayer() {
    const canvas = document.getElementById('outputCanvas');
    

    saveCanvasState(canvas, 'bayer', {});

    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const bayerImageData = bayerImage(imageData);

    canvas.getContext('2d').putImageData(bayerImageData, 0,0);

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

function applyMultiply(){
    const outCanvas = document.getElementById('outputCanvas'); //get current canvas
    const layCanvas = document.getElementById('layerCanvas'); //get layer canvas
    saveCanvasState(outCanvas, 'multiply'); //save state

    const outImageData = outCanvas.getContext('2d').getImageData(0, 0, outCanvas.width, outCanvas.height);
    const layImageData = layCanvas.getContext('2d').getImageData(0, 0, layCanvas.width, layCanvas.height);

    const multiplyImageData = multiplyImages(outImageData, layImageData);
    outCanvas.getContext('2d').putImageData(multiplyImageData, 0,0);


}