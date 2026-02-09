const input = document.getElementById("imageInput");
const stripSlider = document.getElementById("stripWidth");
const outputCanvas = document.getElementById("output");
const ctxOut = outputCanvas.getContext("2d");

let originalImage = null;

// Load Image -------------------------------------------------------
input.addEventListener("change", e => {
  const file = e.target.files[0];
  const img = new Image();
  img.onload = () => {
    originalImage = img;
    draw();
  };
  img.src = URL.createObjectURL(file);
});

stripSlider.addEventListener("input", draw);

// Main Draw --------------------------------------------------------
function draw() {
  if (!originalImage) return;

  const stripWidth = parseInt(stripSlider.value);

  // Make the output ALWAYS square
  const size = 1024; // you can change this if you want
  outputCanvas.width = size;
  outputCanvas.height = size;

  // Make a square version of the input image
  const squareImg = document.createElement("canvas");
  squareImg.width = size;
  squareImg.height = size;
  const ctxSquare = squareImg.getContext("2d");

  // Stretch input image into a square
  ctxSquare.drawImage(originalImage, 0, 0, size, size);

  // Generate the strip effect
  const stripCanvas = createStripEffect(squareImg, stripWidth);

  // Clear output
  ctxOut.clearRect(0, 0, size, size);

  // Draw strip result in each of the 4 corners
  const half = size / 2;

  // top-left
  ctxOut.drawImage(stripCanvas, 0, 0, half, half);

  // top-right
  ctxOut.drawImage(stripCanvas, half, 0, half, half);

  // bottom-left
  ctxOut.drawImage(stripCanvas, 0, half, half, half);

  // bottom-right
  ctxOut.drawImage(stripCanvas, half, half, half, half);
}

// Creates 1 strip-processed version of the square image ----------
function createStripEffect(sourceCanvas, stripWidth) {
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;

  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const ctx = out.getContext("2d");

  const imgData = sourceCanvas.getContext("2d").getImageData(0, 0, w, h);
  const outData = ctx.createImageData(w, h);

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      // Repeat strips every stripWidth pixels
      const sx = Math.floor(x / stripWidth) * stripWidth;
      const sy = Math.floor(y / stripWidth) * stripWidth;

      const srcIdx = (sy * w + sx) * 4;
      const dstIdx = (y * w + x) * 4;

      outData.data[dstIdx]     = imgData.data[srcIdx];
      outData.data[dstIdx + 1] = imgData.data[srcIdx + 1];
      outData.data[dstIdx + 2] = imgData.data[srcIdx + 2];
      outData.data[dstIdx + 3] = 255;
    }
  }

  ctx.putImageData(outData, 0, 0);
  return out;
}
