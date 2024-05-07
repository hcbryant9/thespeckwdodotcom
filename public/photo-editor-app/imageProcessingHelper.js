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

//current bug -> images that are smaller first then images that are larger second works but not vice versa
function multiplyImages(oldImageData, newImageData) {
    // Check if oldImageData is null or undefined
    if (!oldImageData) {
        return newImageData; // Return newImageData if oldImageData is null
    }

    // Check if newImageData is null or undefined
    if (!newImageData) {
        return null; // Return null if newImageData is null
    }

    // Extract dimensions of the old image
    const oldWidth = oldImageData.width;
    const oldHeight = oldImageData.height;
    
    // Extract dimensions of the new image
    const newWidth = newImageData.width;
    const newHeight = newImageData.height;

    // Create a temporary canvas for drawing the newImageData
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;
    const tempCtx = tempCanvas.getContext('2d');

    // Put the newImageData onto the temporary canvas
    tempCtx.putImageData(newImageData, 0, 0);

    // Create a canvas for scaling the new image to match old image dimensions
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = oldWidth;
    scaledCanvas.height = oldHeight;
    const scaledCtx = scaledCanvas.getContext('2d');

    // Scale and draw the new image onto the scaled canvas
    scaledCtx.drawImage(
        tempCanvas, // Use the temporary canvas as the source
        0, 0, newWidth, newHeight, // Source rectangle (entire new image)
        0, 0, oldWidth, oldHeight // Destination rectangle (scaled to match old image)
    );

    // Get the ImageData of the scaled new image
    const scaledNewImageData = scaledCtx.getImageData(0, 0, oldWidth, oldHeight);

    // Create a new ImageData object to store the result
    const resultImageData = new ImageData(oldWidth, oldHeight);

    // Perform pixel-wise multiplication
    const resultData = resultImageData.data;
    const oldData = oldImageData.data;
    const newData = scaledNewImageData.data;

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



