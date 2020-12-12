const animateScrollTo = require('./AnimateScrollTo');
const { getOptions } = require('./GetOptions');

/**
 * Scroll the target container by a specific x and y value.
 *
 * Two method signature types
 * @param {number} x - The horizontal value to scroll by.
 * @param {number} y - The vertical value to scroll by.
 *
 * Or
 * @param {args.x<number>} x - The horizontal value to scroll by.
 * @param {args.y<number>} y - The vertical value to scroll by.
 * @param {args.target<HTMLElement>} target - The scrolling element.
 * @param {args.duration<number>} duration - The duration of the animation in milliseconds.
 * @param {args.useNativeScroll<boolean>} useNativeScroll - Use native scrollTo if smooth scrolling is supported.

 * @return {undefined}
 */
function AnimateScrollBy(...args) {
  const { x, y, target, duration, useNativeScroll } = getOptions(...args);

  if (useNativeScroll) {
    target.scrollBy({
      top: y,
      left: x,
      behavior: 'smooth'
    })
    return;
  }

  const currentX = target.scrollLeft;
  const currentY = target.scrollTop;

  animateScrollTo({
    target,
    x: currentX + x,
    y: currentY + y,
    duration,
    useNativeScroll
  })

}

module.exports = AnimateScrollBy;