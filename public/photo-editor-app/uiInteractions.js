function displayImageOnCanvas(imgElement, canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    saveCanvasState(canvas); // Save the initial state
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = new Image();
        imgElement.onload = function() {
            displayImageOnCanvas(imgElement, document.getElementById('outputCanvas'));
        };
        imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function handleImageLayer(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = function() {
        // Create a temporary canvas to hold the original processed image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        // Draw the original processed image onto the temporary canvas
        const originalImage = document.getElementById('processedImage');
        tempCtx.drawImage(originalImage, 0, 0, tempCanvas.width, tempCanvas.height);

        // Clear the main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the original processed image back onto the main canvas
        ctx.drawImage(tempCanvas, 0, 0);

        // Draw the newly uploaded image in the bottom right corner
        const bottomRightX = canvas.width - img.width - 10; // 10px padding from right
        const bottomRightY = canvas.height - img.height - 10; // 10px padding from bottom
        ctx.drawImage(img, bottomRightX, bottomRightY);

        // Save the current state with the new layered image
        saveCanvasState(canvas);
    };
    img.src = URL.createObjectURL(file);
}

function openCamera() {
    const cameraInput = document.getElementById('cameraInput');
    cameraInput.click(); // Trigger the camera input click event
}
// Define the downloadImage function
function downloadImage() {
    
    const canvas = document.getElementById('outputCanvas');
    
    const imageDataURL = canvas.toDataURL('image/png');

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = imageDataURL;
    downloadLink.download = 'processed_image.png'; // Specify the filename for the downloaded image

    // Append the anchor element to the document body and click it programmatically
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up: remove the temporary anchor element
    document.body.removeChild(downloadLink);
}
