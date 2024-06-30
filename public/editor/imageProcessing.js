/* 
* Functions that apply filters by calling abstracted functions in imageProcessingHelper.js
*/


function applyBayer() {
    const canvas = document.getElementById('outputCanvas');
    

    saveCanvasState(canvas, 'bayer', {});

    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const bayerImageData = bayerImage(imageData);

    canvas.getContext('2d').putImageData(bayerImageData, 0,0);

}

function applyPixelation() {
    //grab and display UI
    document.getElementById('pixelInputDiv').style.display = "block";
    const canvas = document.getElementById('outputCanvas');
    const pixelSizeInput = document.getElementById('pixelSizeInput');
    const pixelSize = parseInt(pixelSizeInput.value);
    
    saveCanvasState(canvas, 'pixelate', { pixelSize: pixelSize });

    const pixelatedImageData = pixelateImage(canvas, pixelSize);
    canvas.getContext('2d').putImageData(pixelatedImageData, 0, 0);
}

function applyMonochrome() {
    //grab and display UI
    document.getElementById('monoInputDiv').style.display = "block";
    const canvas = document.getElementById('outputCanvas');
    const monoThresholdInput = document.getElementById('monoThresholdInput');
    const monoThreshold = parseInt(monoThresholdInput.value);
    

    saveCanvasState(canvas, 'monochrome', { threshold: monoThreshold });

    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const monochromeImageData = monochromeImage(imageData, monoThreshold);
    canvas.getContext('2d').putImageData(monochromeImageData, 0, 0);
}

function applyHalftone(){
    
    const canvas = document.getElementById('outputCanvas');
    saveCanvasState(canvas, 'halftone');

    const imageData = canvas.getContext('2d').getImageData(0,0,canvas.width, canvas.height);
    const halftoneImageData = halftoneImage(imageData);
    canvas.getContext('2d').putImageData(halftoneImageData, 0, 0);
}



function applyBloom() {
    document.getElementById('bloomInputDiv').style.display = "block";
    const canvas = document.getElementById('outputCanvas');
    saveCanvasState(canvas, 'bloom'); 
    const threshold = .1; 

    const blurInput = document.getElementById('blurInput');
    const intensityInput = document.getElementById('bloomIntensityInput');

    const blurAmount = parseInt(blurInput.value);
    const intensity = parseFloat(intensityInput.value);
    
    const imageData = canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height);
    const bloomImageData = bloomImage(imageData, threshold, blurAmount, intensity)
    canvas.getContext('2d').putImageData(bloomImageData,0,0);
}



function applyMultiply(){
    const outCanvas = document.getElementById('outputCanvas'); //get current canvas
    const layCanvas = document.getElementById('layerCanvas'); //get layer canvas
    

    const outImageData = outCanvas.getContext('2d').getImageData(0, 0, outCanvas.width, outCanvas.height);
    const layImageData = layCanvas.getContext('2d').getImageData(0, 0, layCanvas.width, layCanvas.height);

    saveCanvasState(outCanvas, 'multiply', outImageData, layImageData); //save state

    const multiplyImageData = blendImages(outImageData, layImageData, 'multiply');
    outCanvas.getContext('2d').putImageData(multiplyImageData, 0,0);
}

function applyAdd(){
    const outCanvas = document.getElementById('outputCanvas'); //get current canvas
    const layCanvas = document.getElementById('layerCanvas'); //get layer canvas
   

    const outImageData = outCanvas.getContext('2d').getImageData(0, 0, outCanvas.width, outCanvas.height);
    const layImageData = layCanvas.getContext('2d').getImageData(0, 0, layCanvas.width, layCanvas.height);

    saveCanvasState(outCanvas, 'add', outImageData, layImageData); //save state

    const addImageData = blendImages(outImageData, layImageData, 'add');
    outCanvas.getContext('2d').putImageData(addImageData, 0,0);
}
function applyScreen(){
    const outCanvas = document.getElementById('outputCanvas'); //get current canvas
    const layCanvas = document.getElementById('layerCanvas'); //get layer canvas
   

    const outImageData = outCanvas.getContext('2d').getImageData(0, 0, outCanvas.width, outCanvas.height);
    const layImageData = layCanvas.getContext('2d').getImageData(0, 0, layCanvas.width, layCanvas.height);

    saveCanvasState(outCanvas, 'screen', outImageData, layImageData); //save state

    const addImageData = blendImages(outImageData, layImageData, 'screen');
    outCanvas.getContext('2d').putImageData(addImageData, 0,0);
}
function applySubtract(){
    const outCanvas = document.getElementById('outputCanvas'); //get current canvas
    const layCanvas = document.getElementById('layerCanvas'); //get layer canvas
   

    const outImageData = outCanvas.getContext('2d').getImageData(0, 0, outCanvas.width, outCanvas.height);
    const layImageData = layCanvas.getContext('2d').getImageData(0, 0, layCanvas.width, layCanvas.height);

    saveCanvasState(outCanvas, 'subtract', outImageData, layImageData); //save state

    const addImageData = blendImages(outImageData, layImageData, 'subtract');
    outCanvas.getContext('2d').putImageData(addImageData, 0,0);
}
function applyOverlay(){
    const outCanvas = document.getElementById('outputCanvas'); //get current canvas
    const layCanvas = document.getElementById('layerCanvas'); //get layer canvas
   

    const outImageData = outCanvas.getContext('2d').getImageData(0, 0, outCanvas.width, outCanvas.height);
    const layImageData = layCanvas.getContext('2d').getImageData(0, 0, layCanvas.width, layCanvas.height);

    saveCanvasState(outCanvas, 'overlay', outImageData, layImageData); //save state

    const addImageData = blendImages(outImageData, layImageData, 'overlay');
    outCanvas.getContext('2d').putImageData(addImageData, 0,0);
}
function applyLighten(){
    const outCanvas = document.getElementById('outputCanvas'); //get current canvas
    const layCanvas = document.getElementById('layerCanvas'); //get layer canvas
   

    const outImageData = outCanvas.getContext('2d').getImageData(0, 0, outCanvas.width, outCanvas.height);
    const layImageData = layCanvas.getContext('2d').getImageData(0, 0, layCanvas.width, layCanvas.height);

    saveCanvasState(outCanvas, 'lighten', outImageData, layImageData); //save state

    const addImageData = blendImages(outImageData, layImageData, 'lighten');
    outCanvas.getContext('2d').putImageData(addImageData, 0,0);
}
function applyDarken(){
    const outCanvas = document.getElementById('outputCanvas'); //get current canvas
    const layCanvas = document.getElementById('layerCanvas'); //get layer canvas
   

    const outImageData = outCanvas.getContext('2d').getImageData(0, 0, outCanvas.width, outCanvas.height);
    const layImageData = layCanvas.getContext('2d').getImageData(0, 0, layCanvas.width, layCanvas.height);

    saveCanvasState(outCanvas, 'darken', outImageData, layImageData); //save state

    const addImageData = blendImages(outImageData, layImageData, 'darken');
    outCanvas.getContext('2d').putImageData(addImageData, 0,0);
}

function addTextToImage(){
    document.getElementById('fontOptions').style.display = "block";
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    const text = document.getElementById('textInput').value;


    const fontSize = document.getElementById('fontSizeInput').value
    const fontColor = document.querySelector('input[name="fontColor"]:checked').value;

    if(!text){
        return;
    }

    saveCanvasState(canvas, 'addText', null, { text, fontSize, fontColor });

    ctx.font = `${fontSize}px Arial`;  // Use the selected font size
    ctx.fillStyle = fontColor;  // Use the selected color  
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';  
    ctx.fillText(text, canvas.width / 2, canvas.height / 2); 

}