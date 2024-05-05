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


function applyBayer() {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    // Define a 4x4 Bayer pattern for dithering
    const bayerPattern = [
        [ 15, 195, 60, 240 ],
        [ 135, 75, 180, 120 ],
        [ 45, 225, 30, 210 ],
        [ 165, 105, 150, 90 ]
    ];

    // Apply Bayer dithering to each color channel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const grayscale = (data[index] + data[index + 1] + data[index + 2]) / 3;
            const bayerValue = bayerPattern[y % 4][x % 4];

            // Threshold comparison
            if (grayscale < bayerValue) {
                // Adjust color channels
                data[index] = 0; // Red
                data[index + 1] = 0; // Green
                data[index + 2] = 0; // Blue
            } else {
                data[index] = 255; // Red
                data[index + 1] = 255; // Green
                data[index + 2] = 255; // Blue
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);

    // Save the state
    saveCanvasState(canvas, 'bayer', {});
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