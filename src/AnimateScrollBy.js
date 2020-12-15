const animateScrollTo = require('./AnimateScrollTo');
const { getOptions } = require('./GetOptions');
const getScrollStopPromise = require('./GetScrollStopPromise');

/**
 * Scroll the target container by a specific left and top value.
 *
 * Two method signature types
 * @param {number} left - The horizontal value to scroll by.
 * @param {number} top - The vertical value to scroll by.
 *
 * Or
 * @param {args.left<number>} left - The horizontal value to scroll by.
 * @param {args.top<number>} top - The vertical value to scroll by.
 * @param {args.target<HTMLElement>} target - The scrolling element.
 * @param {args.duration<number>} duration - The duration of the animation in milliseconds.
 * @param {args.useNativeScroll<boolean>} useNativeScroll - Use native scrollTo if smooth scrolling is supported.

  * @return {Promise} Resolves with the target element's scrollLeft and scrollTop, { left: number, top: number }
 */
function AnimateScrollBy(...args) {
  const { left, top, target, duration, useNativeScroll } = getOptions(...args);

  if (useNativeScroll) {
    target.scrollBy({
      top: top,
      left: left,
      behavior: 'smooth'
    })
    return getScrollStopPromise(target);
  }

  const currentLeft = target.scrollLeft;
  const currentTop = target.scrollTop;

  return animateScrollTo({
    target,
    left: currentLeft + left,
    top: currentTop + top,
    duration,
    useNativeScroll
  })

}

module.exports = AnimateScrollBy;