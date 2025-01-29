document.addEventListener('DOMContentLoaded', function () {
  const hand = document.getElementById('hand');
  const greeting = document.getElementById('greeting');
  const ouch = document.getElementById('ouch');
  const help = document.getElementById('help');

  let shakerCount = 0;
  let rotateDeg = 0;
  let rotationDirection = -1; // 1 for clockwise, -1 for counterclockwise
  let shake = true;
  // Function to rotate the hand image
  function rotateHand() {
      rotateDeg += 20 * rotationDirection; // Increased rotation step
      hand.style.transform = `rotate(${rotateDeg}deg)`;

      if (rotateDeg >= 50 || rotateDeg <= -50) { // Increased rotation range
          rotationDirection *= -1;
      }
  }

  // Add click event listener to the hand image
  hand.addEventListener('click', function () {
      greeting.innerHTML = '<i>Nice to meet you</i>';

      shakerCount++;
      rotateDeg = 0;
      rotationDirection = 1;

      if (shakerCount > 2 && shakerCount < 4) {
          ouch.innerHTML = '<i>I could do this all day</i>';
      } else if (shakerCount > 4 && shakerCount < 6) {
          ouch.innerHTML = '<i>Yep, really nice to meet you</i>';
      } else if (shakerCount > 6 && shakerCount < 8) {
          ouch.innerHTML = '<i>Okay, my arm is about to fall off</i>';
      } else if (shakerCount > 8 && shakerCount < 12) {
          ouch.innerHTML = '<i>Please, I am begging you</i>';
      } else if (shakerCount > 20) {
          shake = false;
          ouch.innerHTML = '<i>My Arm!</i>';
          greeting.innerHTML = '<i>You just ripped my arm off!</i>';

          // Trigger the fall-off animation
          hand.classList.add('fall-off');

           // Remove hand after animation ends
           setTimeout(() => {
            hand.style.display = 'none';

            // After 5 seconds, display the new text
            setTimeout(() => {
                greeting.innerHTML = '';
                help.innerHTML = '<i>Help me find my hand, it must be somewhere...</i>';
            }, 3000);

        }, 2000);
        return;
      }
      if(shake){
        // Run the shake effect faster and longer
        const interval = setInterval(rotateHand, 100); // Faster shake effect

        // Stop rotation after 1.5 seconds (1500ms)
        setTimeout(() => {
            clearInterval(interval);
            hand.style.transform = 'rotate(0deg)';
            
            // Reset greeting text after rotation stops
            setTimeout(() => {
                greeting.innerHTML = '<i>Click to shake</i>';
            }, 500);
        }, 2000);
    }
  });
});
