'use strict';

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

function displayImageOnCanvas(imgElement, canvas) {
    const ctx = canvas.getContext('2d');
    const size = 1080; // Desired size for Instagram

    // Stretch the image to fill 1080x1080
    canvas.width = size;
    canvas.height = size;

    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
}

function downloadImage() {
    const canvas = document.getElementById('outputCanvas');
    const link = document.createElement('a');

    // Use a lower quality setting (e.g., 0.8) for image compression
    link.href = canvas.toDataURL('image/jpeg', 0.8); // Adjust quality for compression
    link.download = 'stretched-image.jpg';

    // Check for iOS devices
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        const blob = dataURLToBlob(link.href);
        const blobUrl = URL.createObjectURL(blob);

        // Open the image in a new tab
        const newWindow = window.open(blobUrl, '_blank');

        // Inform users to save the image manually
        alert('Press and hold the image in the new tab to save it to your camera roll.');
    } else {
        link.click(); // Trigger download for other devices
    }
}

// Helper function to convert data URL to Blob
function dataURLToBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
