# Eased Smooth Scrolling
This is a ponyfill for `scrollTo` and `scrollBy` to allow smooth scrolling, even in browsers which do not support the natve `behavior: "smooth"` configuration option. If the browser already supports this option, the native implementation will be used.

Regardless of which code path is executed, the methods will return a Promise which will resolve once the scrolling has stopped. The resolved value will be an Object containing the element's `scrollLeft` and `scrolTop` values. This is particularly useful if the user interrupts the scroll animation by scrolling manually, as the value at the time they interacted will be returned.

## Install

```bash
npm install eased-smooth-scroll
```

## Usage
### AnimateScrollTo
```js
const { animateScrollTo } = require('../index.js');

// This function has two options for parameter: a comma separated pair of numbers corresponding to the `x` and `y` values to scroll to (as in the native API, https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo#Parameters)
animateScrollTo(0, 500);

// or an Object with additional configuration options, such as the `duration`, the element to scroll, and whether to always use the custom scroll behavior.
animateScrollTo({ x: 0, y: 500 });

// In either case, the method returns a Promise
animateScrollTo({
  x: 0,
  y: 500,
}).then(({ x, y }) => {
  console.log(x, y); // 0 500
});

```

### AnimateScrollBy
```js
const { animateScrollBy } = require('../index.js');

// This function has two options for parameter: a comma separated pair of numbers corresponding to the `x` and `y` values to scroll to (as in the native API, https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo#Parameters)
animateScrollBy(0, 500);

// or an Object with additional configuration options, such as the `duration`, the element to scroll, and whether to always use the custom scroll behavior.
animateScrollBy({ x: 0, y: 500 });

// In either case, the method returns a Promise
animateScrollBy({
  x: 0,
  y: 500,
}).then(({ x, y }) => {
  console.log(x, y); // 0 500
});

```


## TODO:
- Clean up: make the options consistent with the native API, e.g. `top` and `left` not `x` and `y`.
- Improvement: if `duration` is supplied, `useNativeScroll` should be `false`
- Known Issue: the delay on the return Promise resolver should account for very small distance over a very long duration, as the browser may report the x, y has not changed during some of the tweens.
- Feature: add optional easing function choice
- Feature: support scrollIntoView