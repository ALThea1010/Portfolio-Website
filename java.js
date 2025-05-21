document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to fully load
    const toggle = document.querySelector('.toggle'); // Select the toggle button
    const banner = document.querySelector('.banner'); // Select the banner element

    toggle.addEventListener('click', () => { // Add click event listener to toggle button
      toggle.classList.toggle('active'); // Toggle 'active' class on the toggle button
      banner.classList.toggle('active'); // Toggle 'active' class on the banner
    });
});

const track = document.getElementById("image-track"); // Select the image track element

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX; // Store the mouse down position

const handleOnUp = () => { // Handle mouse up event
  track.dataset.mouseDownAt = "0"; // Reset mouse down position
  track.dataset.prevPercentage = track.dataset.percentage; // Store the current percentage
}

const handleOnMove = e => { // Handle mouse move event
  if(track.dataset.mouseDownAt === "0") return; // Exit if mouse is not down
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, // Calculate mouse movement
        maxDelta = window.innerWidth / 2; // Maximum delta based on window width
  
  const percentage = (mouseDelta / maxDelta) * -100, // Calculate percentage movement
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage, // Calculate next percentage
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100); // Constrain percentage between 0 and -100
  
  track.dataset.percentage = nextPercentage; // Update track percentage
  
  track.animate({ // Animate track movement
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) { // Animate each image in the track
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e); // Handle mouse down event

window.ontouchstart = e => handleOnDown(e.touches[0]); // Handle touch start event

window.onmouseup = e => handleOnUp(e); // Handle mouse up event

window.ontouchend = e => handleOnUp(e.touches[0]); // Handle touch end event

window.onmousemove = e => handleOnMove(e); // Handle mouse move event

window.ontouchmove = e => handleOnMove(e.touches[0]); // Handle touch move event

let currentVideoIndex = 0; // Initialize current video index
const videos = document.querySelectorAll('.video'); // Select all video elements

function nextVideo() { // Function to play the next video
  videos[currentVideoIndex].style.display = 'none'; // Hide current video
  currentVideoIndex = (currentVideoIndex + 1) % videos.length; // Increment video index
  videos[currentVideoIndex].style.display = 'block'; // Show next video
}

function prevVideo() { // Function to play the previous video
  videos[currentVideoIndex].style.display = 'none'; // Hide current video
  currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length; // Decrement video index
  videos[currentVideoIndex].style.display = 'block'; // Show previous video
}