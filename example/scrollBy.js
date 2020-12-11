const { animateScrollBy } = require('../index.js');

document.querySelectorAll('section').forEach((section) => {
  section.addEventListener('click', () => {
    animateScrollBy({ y: 500 });
  })
})
