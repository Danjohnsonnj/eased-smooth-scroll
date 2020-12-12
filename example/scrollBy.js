const { animateScrollBy } = require('../index.js');

document.querySelectorAll('section').forEach((section) => {
  section.addEventListener('click', () => {
    // animateScrollBy(0, window.innerHeight);
    animateScrollBy({ x: 0, y: window.innerHeight });
  })
})
