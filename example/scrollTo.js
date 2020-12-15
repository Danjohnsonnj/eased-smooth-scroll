const { animateScrollTo } = require('../index.js');

document.querySelectorAll('section').forEach((section) => {
  section.addEventListener('click', () => {
    // animateScrollTo(0, window.innerHeight)
    //   .then(coords => console.log(coords));

    animateScrollTo({
      left: 0,
      top: window.innerHeight,
      duration: 500,
      useNativeScroll: false
    }).then(coords => console.log(coords));
  });
})
