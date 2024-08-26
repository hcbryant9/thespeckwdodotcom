'use strict';

function handleImageUpload(event, height, width, elementID) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = new Image();
        imgElement.onload = function() {
            displayImageOnCanvas(imgElement, document.getElementById(elementID), height, width);
        };
        imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function displayImageOnCanvas(imgElement, canvas, height, width) {
    const ctx = canvas.getContext('2d');
    canvas.height = height;
    canvas.width = width;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
}

function downloadImage() {
    const canvas = document.getElementById('outputCanvas');
    const link = document.createElement('a');

    // Use a lower quality setting (e.g., 0.8) for image compression
    link.href = canvas.toDataURL('image/jpeg', 0.8); // Adjust quality for compression
    link.download = 'stretched-image.jpg';
    
    // For iOS Safari, we need to create a click event manually
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        const blob = dataURLToBlob(link.href);
        const newWindow = window.open(URL.createObjectURL(blob), '_blank');
        // newWindow.onload = function() {
        //     setTimeout(() => newWindow.close(), 1000); // Auto-close after a second
        // };
    } else {
        link.click(); // Trigger download
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
