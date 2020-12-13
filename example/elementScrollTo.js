const { animateScrollTo } = require('../index.js');

document.querySelectorAll('section').forEach((section) => {
  section.addEventListener('click', () => {
    // animateScrollTo(0, window.innerHeight);
    animateScrollTo({
      x: window.innerWidth,
      y: window.innerHeight * 5,
      duration: 2000,
      useNativeScroll: false,
      target: document.querySelector('article')
    });
  })
})
