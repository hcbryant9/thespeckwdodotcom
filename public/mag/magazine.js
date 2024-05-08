function handleImageUpload(event, id) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = new Image();
        imgElement.onload = function() {
            console.log("id from handleImageUpload: " + id);
            displayImageOnCanvas(imgElement, document.getElementById(id));
        };
        imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
function displayImageOnCanvas(imgElement, canvas) {
    
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    
    
}