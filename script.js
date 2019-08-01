const homeButton = document.querySelector('.home-button')
const aboutButton = document.querySelector('.about-button')
const skillsButton = document.querySelector('.skills-button')
const projectsButton = document.querySelector('.projects-button')

function smoothScroll(target, duration){
  let targetX = document.querySelector(target);
  let navHeight = document.querySelector('.nav-bar').getBoundingClientRect().bottom;
  let targetPosition = targetX.getBoundingClientRect().top - navHeight + 3; // +3 for slight overlap
  let startingPosition = window.pageYOffset;
  let startTime = null;

  function animation(currentTime){
    if (startTime === null){ startTime = currentTime };
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startingPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if(timeElapsed < duration){requestAnimationFrame(animation)};
    console.log(targetPosition);
  }

  function ease(t, b, c, d){
    t /= d / 2;
    if (t < 1){return c / 2 * t * t + b};
    t--;
    return -c / 2 * (t * (t - 2) -1) + b;
  }

  requestAnimationFrame(animation);
}

homeButton.addEventListener('click', function(){
  smoothScroll('.home-bg', 1000);
})
aboutButton.addEventListener('click', function(){
  smoothScroll('.about', 1000);
})
skillsButton.addEventListener('click', function(){
  smoothScroll('.skills', 1000);
})
projectsButton.addEventListener('click', function(){
  smoothScroll('.projects', 1000);
})
