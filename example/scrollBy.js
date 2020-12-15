const { animateScrollBy } = require('../index.js');

document.querySelectorAll('section').forEach((section) => {
  section.addEventListener('click', () => {
    // animateScrollBy(0, window.innerHeight)
    //   .then(coords => console.log(coords));

    animateScrollBy({
      left: 0,
      top: window.innerHeight,
      duration: 500,
      useNativeScroll: true
    }).then(coords => console.log(coords));  })
})
