// JS Utilities

// ⌛ Promise delay
const delay = async (timeInMs) => {
  if (isNaN(timeInMs)) {
    throw new Error('delay requires a valid number in ms!')
  }
  await new Promise((resolve) => setTimeout(resolve, timeInMs))
}

// 🗒️ Capitalize
const capitalize = (string) => {
  const words = string.split(' ')
  const capitalized = []
  words.forEach((word) => {
    capitalized.push(`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
  })
  return capitalized.join(' ')
}

// 📰 Log (instead of console.log())

const log = (content, label = '', level = 'info') => {
  const timestamp = new Date().toLocaleTimeString()
  const levels = {
    debug: { method: console.debug, color: '#A9A9A9' },
    info: { method: console.info, color: '#87CEFA' },
    warn: { method: console.warn, color: '#FFD700' },
    error: { method: console.error, color: '#FFA07A' },
  }
  const { method, color } = levels[level] || levels.info
  const style = `color: ${color}; font-weight: bold; font-style: italic;`
  const formattedLabel = label ? `%c[${label}]` : ''
  method(`%c${timestamp} ${formattedLabel}:`, style, content)
}

// 🧩 Query selector
const select = (selector, all = false) => {
  if (typeof selector !== 'string') {
    throw new Error('The selector argument must be a string.')
  }
  if (all !== false && all !== true && all !== 'all') {
    throw new Error('The all argument must be a boolean.')
  }
  const elements = all
    ? Array.from(document.querySelectorAll(selector))
    : document.querySelector(selector)
  return elements
}

// Event Listener
const event = (target, event, callback, options = {}) => {
  //Window Events: {load, resize, scroll, unload, beforeunload},
  //Document Events: {DOMContentLoaded, load, resize, scroll, unload},
  //Pointer Events: {pointerdown, pointerup, pointermove, pointerover, pointerout, pointerenter, pointerleave,pointercancel},
  //Touch Events: {touchstart, touchend, touchmove, touchcancel}
  //Mouse Events: {mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave}
  //Keyboard Events: {keydown, keyup, keypress}
  //Animation Events: {animationstart, animationend, animationiteration}
  //Transition Events: {transitionstart, transitionend, transitioniteration},
  //Input Events: {input, change, focus, blur},
  //form Events: {submit, reset, keydown, keyup, keypress, change, focus},
  //Drag Events: {dragstart, dragend, dragover, dragenter, dragleave, drop},
  //Media Events: {canplay, canplaythrough, durationchange, emptied, ended},
  //Clipboard Events: {copy, cut, paste},
  //Other Events: {online, offline},
  //Options: {passive: true,once: true,},
  return target.addEventListener(event, callback, options)
}

// Text Sanitizer

const sanitizeInput = (inputValue) => {
  const div = document.createElement('div')
  div.textContent = inputValue
  return div.innerHTML
}

//Class Manipulation ["+","-","x"]

const classlist = (selector, action, ...classNames) => {
  //claslist(selector[element], action['+','-','x'],...classNames(string or array of strings))
  const classes = Array.isArray(classNames[0]) ? classNames[0] : classNames

  const actions = {
    remove: () => selector.classList.remove(...classes),
    '-': () => selector.classList.remove(...classes),
    add: () => selector.classList.add(...classes),
    '+': () => selector.classList.add(...classes),
    toggle: () => selector.classList.toggle(...classes),
    x: () => selector.classList.toggle(...classes),
  }

  const actionFn = actions[action]
  if (!actionFn) {
    throw new Error(`Invalid action: ${action}`)
  }

  actionFn()
}

// ⚾ Debounce
// Will prevent running the function until the time has passed
const debounce = (func, delay) => {
  let timerId

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      func(...args)
      timerId = null
    }, delay)
  }
}

// ⚙️ Throttle
// Will run the function, once per specified delay
const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

//Random Number Generator
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//Slugify String
const slugify = (input) => {
  let str = input
  var from =
    'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑŃÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽŻáäâàãåčçćďéěëèêẽĕȇíìîïňñńóöòôõøðřŕšťúůüùûýÿžżþÞĐđßÆa·/_,:;'
  var to =
    'AAAAAACCCDEEEEEEEEIIIINNNOOOOOORRSTUUUUUYYZZaaaaaacccdeeeeeeeeiiiinnnooooooorrstuuuuuyyzzbBDdBAa------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

//Exports
export {
  delay,
  capitalize,
  log,
  select,
  event,
  classlist,
  debounce,
  throttle,
  random,
  sanitizeInput,
  slugify,
}
