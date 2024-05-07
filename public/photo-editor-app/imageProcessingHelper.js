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

function bayerImage(imageData){
    const { data, width, height } = imageData;
    
    const bayerPattern = [
        [ 15, 195, 60, 240 ],
        [ 135, 75, 180, 120 ],
        [ 45, 225, 30, 210 ],
        [ 165, 105, 150, 90 ]
    ];

   
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const grayscale = (data[index] + data[index + 1] + data[index + 2]) / 3;
            const bayerValue = bayerPattern[y % 4][x % 4];

            if (grayscale < bayerValue) {
                
                data[index] = 0; // R
                data[index + 1] = 0; // G
                data[index + 2] = 0; // B
            } else {
                data[index] = 255; // R
                data[index + 1] = 255; // G
                data[index + 2] = 255; // B
            }
        }
    }

    return imageData;

}

function multiplyImages(oldImageData, newImageData) {
    // Extract dimensions of the old image
    const oldWidth = oldImageData.width;
    const oldHeight = oldImageData.height;
    
    // Extract dimensions of the new image
    const newWidth = newImageData.width;
    const newHeight = newImageData.height;
    
    // Determine which image is larger
    const maxWidth = Math.max(oldWidth, newWidth);
    const maxHeight = Math.max(oldHeight, newHeight);
    
    // Create new canvases to accommodate the resized images
    const oldCanvas = document.createElement('canvas');
    oldCanvas.width = maxWidth;
    oldCanvas.height = maxHeight;
    const oldCtx = oldCanvas.getContext('2d');
    oldCtx.putImageData(oldImageData, 0, 0);

    const newCanvas = document.createElement('canvas');
    newCanvas.width = maxWidth;
    newCanvas.height = maxHeight;
    const newCtx = newCanvas.getContext('2d');
    newCtx.putImageData(newImageData, 0, 0);

    // Get the ImageData of the padded images
    const paddedOldImageData = oldCtx.getImageData(0, 0, maxWidth, maxHeight);
    const paddedNewImageData = newCtx.getImageData(0, 0, maxWidth, maxHeight);

    // Create a new ImageData object to store the result
    const resultImageData = new ImageData(maxWidth, maxHeight);

    // Perform pixel-wise multiplication
    const resultData = resultImageData.data;
    const oldData = paddedOldImageData.data;
    const newData = paddedNewImageData.data;

    for (let i = 0; i < resultData.length; i += 4) {
        // Multiply RGB values for each pixel
        resultData[i] = (oldData[i] * newData[i]) / 255;       // Red
        resultData[i + 1] = (oldData[i + 1] * newData[i + 1]) / 255; // Green
        resultData[i + 2] = (oldData[i + 2] * newData[i + 2]) / 255; // Blue
        resultData[i + 3] = Math.min(oldData[i + 3], newData[i + 3]); // Alpha
    }

    // Return the resulting ImageData
    return resultImageData;
}


