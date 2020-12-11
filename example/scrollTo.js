const { animateScrollTo } = require('../index.js');

document.querySelectorAll('section').forEach((section) => {
  section.addEventListener('click', () => {
    animateScrollTo({ y: 1500 });
  })
})
