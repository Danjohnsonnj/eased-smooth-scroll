const { easeInOutCubic } = require('js-easing-functions');
const { getOptions } = require('./GetOptions');
const getScrollStopPromise = require('./GetScrollStopPromise');

/**
 * Scroll the target container to a specific x and y value.
 *
 * Two method signature types
 * @param {number} x - The horizontal value to scroll to.
 * @param {number} y - The vertical value to scroll to.
 *
 * Or
 * @param {args.x<number>} x - The horizontal value to scroll to.
 * @param {args.y<number>} y - The vertical value to scroll to.
 * @param {args.target<HTMLElement>} target - The scrolling element.
 * @param {args.duration<number>} duration - The duration of the animation in milliseconds.
 * @param {args.useNativeScroll<boolean>} useNativeScroll - Use native scrollTo if smooth scrolling is supported.
 *
 * @return {Promise} Resolves with the target element's scrollLeft and scrollTop, { x: number, y: number }
 */
function AnimateScrollTo(...args) {
  const { x, y, target, duration, useNativeScroll } = getOptions(...args);

  if (useNativeScroll) {
    target.scrollTo({
      top: y,
      left: x,
      behavior: 'smooth'
    })
    return getScrollStopPromise(target);
  }

  const currentX = target.scrollLeft;
  const currentY = target.scrollTop;
  const horizontalDistance = Math.round(x - currentX);
  const verticalDistance = Math.round(y - currentY);
  if (horizontalDistance === 0 && verticalDistance === 0) {
    return getScrollStopPromise(target, true);
  }

  const win = target.ownerDocument.defaultView;
  let animationId = null;

  const mousewheelevt = 'onmousewheel' in document ? 'wheel' : 'mousewheel';
  const cancelAnimation = () => {
    win.cancelAnimationFrame(animationId);
    animationId = null;
  }
  win.document.addEventListener(mousewheelevt, cancelAnimation, false);

  const startTime = Date.now();
  const stepScroll = () => {
    const elapsed = Date.now() - startTime;
    const easedX = easeInOutCubic(elapsed, currentX, horizontalDistance, duration);
    const easedY = easeInOutCubic(elapsed, currentY, verticalDistance, duration);
    target.scrollTo(easedX, easedY);

    if (elapsed < duration) {
      animationId = requestAnimationFrame(stepScroll);
    } else {
      target.scrollTo(x, y);
    }
  }
  stepScroll();

  return getScrollStopPromise(target);
}

module.exports = AnimateScrollTo;