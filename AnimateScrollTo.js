const { easeInOutCubic } = require('js-easing-functions');
const getOptions = require('./GetOptions');
const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

function AnimateScrollTo(...args) {
  const { x, y, target, duration } = getOptions(...args);

  // TODO: add option to skip native
  if (isSmoothScrollSupported) {
    target.scrollTo({
      top: y,
      left: x,
      behavior: 'smooth'
    })
    return;
  }

  const currentX = target.scrollLeft;
  const currentY = target.scrollTop;
  const horizontalDistance = x - currentX;
  const verticalDistance = y - currentY;
  if (horizontalDistance === 0 && verticalDistance === 0) {
    return;
  }

  const win = target.ownerDocument.defaultView;
  let animationId = null;

  const mousewheelevt = 'onmousewheel' in document ? 'wheel' : 'mousewheel';
  const cancelAnimation = () => {
    if (animationId){
      win.cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
  win.document.addEventListener(mousewheelevt, cancelAnimation, false);

  const startTime = Date.now();
  const stepScroll = () => {
    const elapsed = Date.now() - startTime;
    easedX = easeInOutCubic(elapsed, currentX, horizontalDistance, duration);
    easedY = easeInOutCubic(elapsed, currentY, verticalDistance, duration);
    console.log(`${easedX}, ${easedY}`);
    win.scrollTo(easedX, easedY);

    if (elapsed < duration) {
      animationId = requestAnimationFrame(stepScroll);
    } else {
      win.scrollTo(x, y);
    }
  }
  stepScroll();
}

module.exports = AnimateScrollTo;