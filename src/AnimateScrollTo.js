const { easeInOutCubic } = require('js-easing-functions');
const { getOptions } = require('./GetOptions');
const getScrollStopPromise = require('./GetScrollStopPromise');

/**
 * Scroll the target container to a specific left and top value.
 *
 * Two method signature types
 * @param {number} left - The horizontal value to scroll to.
 * @param {number} top - The vertical value to scroll to.
 *
 * Or
 * @param {args.left<number>} left - The horizontal value to scroll to.
 * @param {args.top<number>} top - The vertical value to scroll to.
 * @param {args.target<HTMLElement>} target - The scrolling element.
 * @param {args.duration<number>} duration - The duration of the animation in milliseconds.
 * @param {args.useNativeScroll<boolean>} useNativeScroll - Use native scrollTo if smooth scrolling is supported.
 *
 * @return {Promise} Resolves with the target element's scrollLeft and scrollTop, { left: number, top: number }
 */
function AnimateScrollTo(...args) {
  const { left, top, target, duration, useNativeScroll } = getOptions(...args);

  if (useNativeScroll) {
    target.scrollTo({
      top: top,
      left: left,
      behavior: 'smooth'
    })
    return getScrollStopPromise(target);
  }

  const currentLeft = target.scrollLeft;
  const currentTop = target.scrollTop;
  const horizontalDistance = Math.round(left - currentLeft);
  const verticalDistance = Math.round(top - currentTop);
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
    const easeLeft = easeInOutCubic(elapsed, currentLeft, horizontalDistance, duration);
    const easedTop = easeInOutCubic(elapsed, currentTop, verticalDistance, duration);
    target.scrollTo(easeLeft, easedTop);

    if (elapsed < duration) {
      animationId = requestAnimationFrame(stepScroll);
    } else {
      target.scrollTo(left, top);
    }
  }
  stepScroll();

  return getScrollStopPromise(target);
}

module.exports = AnimateScrollTo;