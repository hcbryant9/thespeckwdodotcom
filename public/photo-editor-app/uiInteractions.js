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

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            // Set the canvas size to match the image dimensions
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;

            // Draw the image onto the canvas
            tempCtx.drawImage(img, 0, 0);

            // Get the ImageData from the canvas
            const newImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

            // Apply multiply effect
            applyMultiply(newImageData);

            // Clean up: remove the temporary canvas
            tempCanvas.remove();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
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