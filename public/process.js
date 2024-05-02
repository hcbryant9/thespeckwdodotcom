// Function to pixelate an image
function pixelateImage(imgElement, pixelSize) {
    // Create a new canvas element to draw the processed image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the image
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    // Draw the image on the canvas
    ctx.drawImage(imgElement, 0, 0);

    // Calculate the number of blocks in both dimensions
    const numBlocksX = Math.ceil(canvas.width / pixelSize);
    const numBlocksY = Math.ceil(canvas.height / pixelSize);

    // Resize image to "pixelated" size
    ctx.imageSmoothingEnabled = false; // Disable smoothing for pixelation
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, numBlocksX, numBlocksY);

    // Upscale the pixelated image back to the original size
    ctx.drawImage(canvas, 0, 0, numBlocksX, numBlocksY, 0, 0, canvas.width, canvas.height);

    // Get the processed image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return imageData; // Return the pixelated image data
}

// Function to convert image to monochrome (black and white)
function convertToMonochrome(imageData) {
    const data = imageData.data;

    // Convert each pixel to monochrome (black or white)
    for (let i = 0; i < data.length; i += 4) {
        // Calculate grayscale value (average of R, G, B components)
        const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;

        // Set pixel color based on grayscale value (threshold = 128)
        const color = grayscale < 128 ? 0 : 255; // 0 = black, 255 = white

        // Set R, G, B components of the pixel to black or white
        data[i] = color;         // Red
        data[i + 1] = color;     // Green
        data[i + 2] = color;     // Blue
        // Alpha (data[i + 3]) remains unchanged (transparency)
    }

    return imageData; // Return the monochrome image data
}
function resizeImage(imageData, targetWidth, targetHeight) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.putImageData(imageData, 0, 0);

    const resizedImageData = ctx.getImageData(0, 0, targetWidth, targetHeight);

    return resizedImageData;
}

async function processImage() {
    const uploadInput = document.getElementById('uploadInput');
    const cameraInput = document.getElementById('cameraInput');

    // Check if cameraInput has a file
    let file = null;
    if (cameraInput.files.length > 0) {
        file = cameraInput.files[0];
    } else if (uploadInput.files.length > 0) {
        file = uploadInput.files[0];
    }

    if (!file) {
        alert('Please select an image or take a photo.');
        return;
    }


    const imgElement = document.createElement('img');
    const reader = new FileReader();

    reader.onload = async function (e) {
        imgElement.src = e.target.result;
        imgElement.onload = async function () {
            const pixelSizeInput = document.getElementById('pixelSizeInput');
            const pixelSize = parseInt(pixelSizeInput.value); // Get pixelSize from input

            const pixelatedImageData = pixelateImage(imgElement, pixelSize);
            const monochromeImageData = convertToMonochrome(pixelatedImageData);

            const resizedImageData = resizeImage(monochromeImageData, 421, 595);

            const outputCanvas = document.getElementById('outputCanvas');
            const outputCtx = outputCanvas.getContext('2d');
            outputCanvas.width = 421;
            outputCanvas.height = 595;
            outputCtx.putImageData(resizedImageData, 0, 0);

            outputCanvas.style.display = 'inline';
        };
    };

    reader.readAsDataURL(file);
}