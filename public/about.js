document.addEventListener('DOMContentLoaded', function () {
    const hand = document.getElementById('hand');
    const greeting = document.getElementById('greeting');
    const ouch = document.getElementById('ouch');

    let shakerCount = 0;
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
  
      //inc counter
      shakerCount++;
      // Reset rotation and direction
      rotateDeg = 0;
      rotationDirection = 1;
      if(shakerCount > 2 && shakerCount <4){
        ouch.innerHTML = '<i>I could do this all day<i>'
      }  else if(shakerCount>4 && shakerCount <6){
        ouch.innerHTML = '<i>Yep, really nice to meet you<i>'
      }  else if (shakerCount>6&& shakerCount <8){
        ouch.innerHTML = '<i>Okay, my arm is about to fall off<i>'
      } else if (shakerCount>8&& shakerCount <12){
        ouch.innerHTML = '<i>Please, I am begging you<i>'
      } else if (shakerCount>25){
        ouch.innerHTML = '<i>Okay, you are cut off<i>'
        greeting.innerHTML = '<i>Not nice to meet you</i>';
      }
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
  