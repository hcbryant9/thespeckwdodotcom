/**
 * Class for handing UI inputs : displaying , cameras , download, upload
 */

function displayImageOnCanvas(imgElement, canvas, save) {
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    if(save){
        saveCanvasState(canvas); // Save the initial state
    }
    
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
            document.getElementById('effectOptions').style.display = "block";
            displayImageOnCanvas(imgElement, document.getElementById('outputCanvas'), true);
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
        const imgElement = new Image();
        imgElement.onload = function() {
            displayImageOnCanvas(imgElement, document.getElementById('sampleCanvas'), false);
            document.getElementById('blendOptions').style.display = "block";
            document.getElementById('sampleCanvas').style.display = "block";
            displayImageOnCanvas(imgElement, document.getElementById('layerCanvas'), false);
            
        };
        imgElement.src = e.target.result;
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

    // Create a temporary canvas element for resizing
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');

    // Set the temporary canvas dimensions to resize the original canvas
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Draw the original canvas content onto the temporary canvas (resize if necessary)
    tempContext.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

    // Convert the resized canvas to a data URL with specified compression settings
    const imageDataURL = tempCanvas.toDataURL('image/jpeg', 0.8); // Use image/jpeg format with 80% quality

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = imageDataURL;
    downloadLink.download = 'processed_image.jpg'; // Specify the filename for the downloaded image

    // Append the anchor element to the document body and click it programmatically
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up: remove the temporary anchor element and canvas
    document.body.removeChild(downloadLink);
    tempCanvas.remove(); // Remove the temporary canvas
}

