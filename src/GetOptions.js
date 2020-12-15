const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
const DEFAULT_OPTIONS = {
  target: document.scrollingElement,
  left: 0,
  top: 100,
  duration: 500,
  useNativeScroll: (isSmoothScrollSupported)
}

function getOptions(...options) {
  const _options = Object.assign({}, DEFAULT_OPTIONS);

  if (!Array.isArray(options)) {
    return _options;
  }

  if (
    options.length === 2 &&
    (typeof options[0] === 'number') &&
    (typeof options[1] === 'number')
  ) {
    let [left , top] = options;
    _options.left = left;
    _options.top = top;
  } else if (
    options.length === 1 &&
    (typeof options[0] === 'object')
  ) {
    const { left, top, target, duration, useNativeScroll } = options[0];
    typeof left === 'number' && (_options.left = left);
    typeof top === 'number' && (_options.top = top);
    target && (_options.target = target);
    duration && (_options.duration = duration);
    useNativeScroll !== undefined && (_options.useNativeScroll = useNativeScroll);
  }

  return _options;
}

module.exports = {
  getOptions,
  DEFAULT_OPTIONS,
};