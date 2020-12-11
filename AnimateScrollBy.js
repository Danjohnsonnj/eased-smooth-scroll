const animateScrollTo = require('./AnimateScrollTo')

const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

const AnimateScrollBy = ({
  target = document.scrollingElement,
  x = 0,
  y = 100,
  duration = 500
}) => {

  if (isSmoothScrollSupported) {
    target.scrollBy({
      top: y,
      left: x,
      behavior: 'smooth'
    })
    return
  }

  const currentX = target.scrollLeft
  const currentY = target.scrollTop

  animateScrollTo({
    target,
    x: currentX + x,
    y: currentY + y,
    duration
  })

}

module.exports = AnimateScrollBy
