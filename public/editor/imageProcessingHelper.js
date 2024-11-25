/*
* Abstracted functionality for different effects
*/
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

function halftoneImage(imageData) {
    const { data, width, height } = imageData;
    const outputData = new Uint8ClampedArray(data.length);

    // Define the grid size (adjust this to control the density of halftone dots)
    const gridSize = 30; // Experiment with this value

    // Loop through each pixel in the image
    for (let y = 0; y < height; y += gridSize) {
        for (let x = 0; x < width; x += gridSize) {
            // Calculate the index into the image data array
            const index = (y * width + x) * 4;

            // Get the color components of the pixel
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            // Determine the brightness of the pixel (use a weighted average)
            const brightness = (0.3 * r + 0.59 * g + 0.11 * b) / 255;

            // Calculate the radius of the halftone dot based on brightness
            const dotRadius = gridSize * brightness;

            // Draw a filled circle (dot) centered at (x, y) with the calculated radius
            drawFilledCircle(outputData, width, height, x, y, dotRadius, r, g, b);
        }
    }

    // Create a new ImageData object using the modified pixel data
    return new ImageData(outputData, width, height);
}

function leeImage(imageData, blurRadius, bloomIntensity) {
    const { data, width, height } = imageData;
    const blurredData = blurImage(data, width, height, blurRadius);
    const outputData = new Uint8ClampedArray(data.length);

    // Add bloom effect by blending original and blurred images
    for (let i = 0; i < data.length; i += 4) {
        // Original pixel values
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Blurred pixel values
        const blurredR = blurredData[i];
        const blurredG = blurredData[i + 1];
        const blurredB = blurredData[i + 2];

        // Blend original and blurred colors for bloom effect
        outputData[i] = Math.min(r + blurredR * bloomIntensity, 255);
        outputData[i + 1] = Math.min(g + blurredG * bloomIntensity, 255);
        outputData[i + 2] = Math.min(b + blurredB * bloomIntensity, 255);
        outputData[i + 3] = 255; // Ensure alpha is fully opaque
    }

    return new ImageData(outputData, width, height);
}

// Gaussian Blur Implementation
function blurImage(data, width, height, radius) {
    const kernelSize = radius * 2 + 1;
    const kernel = createGaussianKernel(radius);
    const blurredData = new Uint8ClampedArray(data.length);

    // Horizontal pass
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            applyKernel(data, blurredData, width, height, x, y, kernel, kernelSize, true);
        }
    }

    // Vertical pass
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            applyKernel(blurredData, blurredData, width, height, x, y, kernel, kernelSize, false);
        }
    }

    return blurredData;
}

// Apply Gaussian Kernel
function applyKernel(inputData, outputData, width, height, x, y, kernel, kernelSize, horizontal) {
    const halfSize = Math.floor(kernelSize / 2);
    let r = 0, g = 0, b = 0, weightSum = 0;

    for (let i = -halfSize; i <= halfSize; i++) {
        const offset = horizontal ? i : i * width;
        const currentX = x + (horizontal ? i : 0);
        const currentY = y + (horizontal ? 0 : i);

        if (currentX >= 0 && currentX < width && currentY >= 0 && currentY < height) {
            const index = (currentY * width + currentX) * 4;
            const weight = kernel[i + halfSize];

            r += inputData[index] * weight;
            g += inputData[index + 1] * weight;
            b += inputData[index + 2] * weight;
            weightSum += weight;
        }
    }

    const index = (y * width + x) * 4;
    outputData[index] = r / weightSum;
    outputData[index + 1] = g / weightSum;
    outputData[index + 2] = b / weightSum;
    outputData[index + 3] = 255; // Alpha channel
}

// Create a Gaussian Kernel
function createGaussianKernel(radius) {
    const size = radius * 2 + 1;
    const kernel = new Float32Array(size);
    const sigma = radius / 2;
    const sigma2 = 2 * sigma * sigma;
    const sqrtSigmaPi2 = Math.sqrt(Math.PI * sigma2);
    let sum = 0;

    for (let i = 0; i < size; i++) {
        const x = i - radius;
        kernel[i] = Math.exp(-(x * x) / sigma2) / sqrtSigmaPi2;
        sum += kernel[i];
    }

    // Normalize kernel
    for (let i = 0; i < size; i++) {
        kernel[i] /= sum;
    }

    return kernel;
}



function bloomImage(imageData, threshold, blurAmount, intensity) {
    const brightImageData = thresholdBrightness(imageData, threshold);
    const blurredImageData = applyGaussianBlur(brightImageData, blurAmount);

    // Combine blurred image with original image
    const finalImageData = combineImages(imageData, blurredImageData, intensity);

    return finalImageData;
}

function thresholdBrightness(imageData, threshold) {
    const { data } = imageData;

    for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255; // Normalize to [0, 1]
        
        if (brightness <= threshold) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
        }
    }

    return imageData;
}

function applyGaussianBlur(imageData, blurAmount) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;

    tempCtx.putImageData(imageData, 0, 0);

    // Apply blur using CSS filter (approximation of Gaussian blur)
    tempCtx.filter = `blur(${blurAmount}px)`;
    tempCtx.drawImage(tempCanvas, 0, 0);

    return tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
}

function combineImages(originalImageData, bloomImageData, intensity) {
    const { data } = originalImageData;
    const bloomData = bloomImageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] += bloomData[i] * intensity;
        data[i + 1] += bloomData[i + 1] * intensity;
        data[i + 2] += bloomData[i + 2] * intensity;
    }

    return originalImageData;
}


function drawFilledCircle(outputData, width, height, cx, cy, radius, r, g, b) {
    const intRadius = Math.floor(radius);
    const squaredRadius = intRadius * intRadius;

    for (let dy = -intRadius; dy <= intRadius; dy++) {
        for (let dx = -intRadius; dx <= intRadius; dx++) {
            const distanceSquared = dx * dx + dy * dy;
            if (distanceSquared <= squaredRadius) {
                const x = cx + dx;
                const y = cy + dy;
                if (x >= 0 && x < width && y >= 0 && y < height) {
                    const index = (y * width + x) * 4;
                    outputData[index] = r;
                    outputData[index + 1] = g;
                    outputData[index + 2] = b;
                    outputData[index + 3] = 255; // Alpha channel
                }
            }
        }
    }
}

function blendImages(oldImageData, newImageData, blendMode = 'multiply') {
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

    // Clean up the scaled canvas
    scaledCanvas.width = 0;
    scaledCanvas.height = 0;

    // Create a new ImageData object to store the result
    const resultImageData = new ImageData(oldWidth, oldHeight);

    // Perform pixel-wise blending based on the specified blend mode
    const blendFunction = getBlendFunction(blendMode);
    blendFunction(oldImageData.data, scaledNewImageData.data, resultImageData.data);

    // Return the resulting ImageData
    return resultImageData;
}

//helper function for blendImages( ) based on blendMode
function getBlendFunction(blendMode) {
    switch (blendMode) {
        case 'multiply':
            return (oldData, newData, resultData) => {
                for (let i = 0; i < resultData.length; i += 4) {
                    resultData[i] = (oldData[i] * newData[i]) / 255;       // Red
                    resultData[i + 1] = (oldData[i + 1] * newData[i + 1]) / 255; // Green
                    resultData[i + 2] = (oldData[i + 2] * newData[i + 2]) / 255; // Blue
                    resultData[i + 3] = Math.min(oldData[i + 3], newData[i + 3]); // Alpha
                }
            };
        case 'add':
            return (oldData, newData, resultData) => {
                for (let i = 0; i < resultData.length; i += 4) {
                    resultData[i] = Math.min(oldData[i] + newData[i], 255);       // Red
                    resultData[i + 1] = Math.min(oldData[i + 1] + newData[i + 1], 255); // Green
                    resultData[i + 2] = Math.min(oldData[i + 2] + newData[i + 2], 255); // Blue
                    resultData[i + 3] = Math.min(oldData[i + 3] + newData[i + 3], 255); // Alpha
                }
            };
        case 'screen':
            return (oldData, newData, resultData) => {
                for (let i = 0; i < resultData.length; i += 4) {
                    resultData[i] = 255 - (255 - oldData[i]) * (255 - newData[i]) / 255;       // Red
                    resultData[i + 1] = 255 - (255 - oldData[i + 1]) * (255 - newData[i + 1]) / 255; // Green
                    resultData[i + 2] = 255 - (255 - oldData[i + 2]) * (255 - newData[i + 2]) / 255; // Blue
                    resultData[i + 3] = Math.min(oldData[i + 3], newData[i + 3]); // Alpha
                }
            };
        case 'subtract':
            return (oldData, newData, resultData) => {
                for (let i = 0; i < resultData.length; i += 4) {
                    resultData[i] = Math.max(oldData[i] - newData[i], 0);       // Red
                    resultData[i + 1] = Math.max(oldData[i + 1] - newData[i + 1], 0); // Green
                    resultData[i + 2] = Math.max(oldData[i + 2] - newData[i + 2], 0); // Blue
                    resultData[i + 3] = Math.min(oldData[i + 3], newData[i + 3]); // Alpha
                }
            };
        case 'overlay':
            return (oldData, newData, resultData) => {
                for (let i = 0; i < resultData.length; i += 4) {
                    resultData[i] = (newData[i] < 128) ? (2 * oldData[i] * newData[i] / 255) : (255 - 2 * (255 - oldData[i]) * (255 - newData[i]) / 255); // Red
                    resultData[i + 1] = (newData[i + 1] < 128) ? (2 * oldData[i + 1] * newData[i + 1] / 255) : (255 - 2 * (255 - oldData[i + 1]) * (255 - newData[i + 1]) / 255); // Green
                    resultData[i + 2] = (newData[i + 2] < 128) ? (2 * oldData[i + 2] * newData[i + 2] / 255) : (255 - 2 * (255 - oldData[i + 2]) * (255 - newData[i + 2]) / 255); // Blue
                    resultData[i + 3] = Math.min(oldData[i + 3], newData[i + 3]); // Alpha
                }
            };
        case 'lighten':
            return (oldData, newData, resultData) => {
                for (let i = 0; i < resultData.length; i += 4) {
                    resultData[i] = Math.max(oldData[i], newData[i]);       // Red
                    resultData[i + 1] = Math.max(oldData[i + 1], newData[i + 1]); // Green
                    resultData[i + 2] = Math.max(oldData[i + 2], newData[i + 2]); // Blue
                    resultData[i + 3] = Math.min(oldData[i + 3], newData[i + 3]); // Alpha
                }
            };
        case 'darken':
            return (oldData, newData, resultData) => {
                for (let i = 0; i < resultData.length; i += 4) {
                    resultData[i] = Math.min(oldData[i], newData[i]);       // Red
                    resultData[i + 1] = Math.min(oldData[i + 1], newData[i + 1]); // Green
                    resultData[i + 2] = Math.min(oldData[i + 2], newData[i + 2]); // Blue
                    resultData[i + 3] = Math.min(oldData[i + 3], newData[i + 3]); // Alpha
                }
            };
        default:
            throw new Error(`Unsupported blend mode: ${blendMode}`);
    }
}



