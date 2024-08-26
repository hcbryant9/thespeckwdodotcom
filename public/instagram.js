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
    
    // For iOS Safari, we need to create a click event manually
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        const blob = dataURLToBlob(link.href);
        const url = URL.createObjectURL(blob);
        const newWindow = window.open(url, '_blank');

        if (newWindow) {
            let countdown = 15;
            newWindow.document.write('<body style="display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 2em;"><p id="countdown">This link will expire in ' + countdown + ' seconds.</p></body>');

            const countdownInterval = setInterval(() => {
                countdown--;
                newWindow.document.getElementById('countdown').textContent = 'This link will expire in ' + countdown + ' seconds.';
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    newWindow.close();
                }
            }, 1000);

            // Auto-close after 15 seconds
            setTimeout(() => {
                newWindow.close();
                URL.revokeObjectURL(url); // Clean up the URL object
            }, 15000);
        }
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
