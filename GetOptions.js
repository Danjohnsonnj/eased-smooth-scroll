const DEFAULT_OPTIONS = {
  target: document.scrollingElement,
  x: 0,
  y: 100,
  duration: 500
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
    let [x , y] = options;
    _options.x = x;
    _options.y = y;
  } else if (
    options.length === 1 &&
    (typeof options[0] === 'object')
  ) {
    const { x, y, target, duration } = options[0];
    x && (_options.x = x);
    y && (_options.y = y);
    target && (_options.target = target);
    duration && (_options.duration = duration);
  }

  return _options;
}

module.exports = getOptions;