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

function multiplyImage(oldImageData, newImageData) {
    const width = oldImageData.width;
    const height = oldImageData.height;
    const blendedData = new Uint8ClampedArray(width * height * 4);

    for (let i = 0; i < width * height * 4; i += 4) {
        const red1 = oldImageData.data[i];
        const green1 = oldImageData.data[i + 1];
        const blue1 = oldImageData.data[i + 2];

        const red2 = newImageData.data[i];
        const green2 = newImageData.data[i + 1];
        const blue2 = newImageData.data[i + 2];

        // Multiply each color channel
        const blendedRed = (red1 * red2) / 255;
        const blendedGreen = (green1 * green2) / 255;
        const blendedBlue = (blue1 * blue2) / 255;

        // Set the blended pixel values
        blendedData[i] = blendedRed;
        blendedData[i + 1] = blendedGreen;
        blendedData[i + 2] = blendedBlue;
        blendedData[i + 3] = 255; // Alpha value (fully opaque)
    }

    return new ImageData(blendedData, width, height);
}
