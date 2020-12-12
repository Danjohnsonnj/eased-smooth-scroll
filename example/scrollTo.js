const { animateScrollTo } = require('../index.js');

document.querySelectorAll('section').forEach((section) => {
  section.addEventListener('click', () => {
    animateScrollTo({ x: 0, y: window.innerHeight });
    // animateScrollTo(0, window.innerHeight);
  })
})
