document.addEventListener('DOMContentLoaded', function () {
    const hand = document.getElementById('hand');
    const greeting = document.getElementById('greeting');
  
    let rotateDeg = 0;
    let rotationDirection = 1; // 1 for clockwise, -1 for counterclockwise
  
    // Function to rotate the hand image
    function rotateHand() {
      rotateDeg += 2 * rotationDirection;
      hand.style.transform = `rotate(${rotateDeg}deg)`;
  
      if (rotateDeg >= 15 || rotateDeg <= -15) {
        rotationDirection *= -1;
      }
    }
  
    // Add click event listener to the hand image
    hand.addEventListener('click', function () {
      // Update greeting text
      greeting.innerHTML = '<i>Nice to meet you</i>';
  
      // Reset rotation and direction
      rotateDeg = 0;
      rotationDirection = 1;
  
      // Call the rotateHand function every 20 milliseconds
      const interval = setInterval(rotateHand, 20);
  
      // Stop rotation after 1000 milliseconds (1 second)
      setTimeout(() => {
        clearInterval(interval);
        hand.style.transform = 'rotate(0deg)';
        // Reset greeting text after rotation stops
        setTimeout(() => {
          greeting.innerHTML = '<i>Click to shake</i>';
        }, 500); // Half a second delay before resetting text
      }, 1000);
    });
  });
  