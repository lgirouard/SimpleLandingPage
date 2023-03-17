// Options
const showAmPm = true

// DOM Elements
/**
 * Gets the DOM element with the given Element ID
 * @param {string} elementID ID of element
 */
const $ = elementID => {
  let element = document.getElementById(elementID)
  return element
}

const time = $('time')
const greeting = $('greeting')
const name = $('name')
const focus = $('focus')
const moreInfo = $('moreInfo')


/**
 * Separates the hours, min, seconds of current time to display.
 */
function showTime () {
  //let today = new Date(2023, 06, 10, 20, 33, 30), // Testing for night
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    seconds = today.getSeconds()

  // SET AM OR PM
  const amPm = hour >= 12 ? 'PM' : 'AM' // Ternary statement

  // 12hr format
  hour = hour % 12 || 12

  //Output time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    seconds
  )} ${showAmPm ? amPm : ''}`
  setTimeout(showTime, 1000)
}

/**
 * Adds zeros to minutes and seconds when less than 10
 * @param {*} n value (min or seconds) to check for the need of zeros
 * @returns min or seconds with added zeros.
 */
function addZero (n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n
}

// Set BG and greeting based on time
/**
 * Sets the background and greeting based on the current time.
 */
function setBackgroundGreeting () {
  // TODO : Make image fit to screen

   //let today = new Date(2023, 06, 10, 20, 33, 30), // Testing for night
  let today = new Date(),
    hour = today.getHours()

  if (hour < 12) {
    //Morning
    document.body.style.backgroundImage = "url('../img/morning.jpg')"
    greeting.textContent = 'Good Morning'
    focus.style.color = 'white'
    
  } else if (hour < 18) {
    // Afternooon
    document.body.style.backgroundImage = "url('../img/afternoon.jpg')"
    greeting.textContent = 'Good Afternoon'
    document.h2.color = 'white'
  } else {
    // Evening
    document.body.style.backgroundImage = "url('../img/evening.jpg')"
    greeting.textContent = 'Good Evening'
    document.body.style.color = 'white'
  }
}

//Get Name
/**
 * Checks if name exists in local storage
 */
function getName () {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[User]'
  } else {
    name.textContent = localStorage.getItem('name')
  }
}
// Set Name
/**
 * Checks the type of event being passed. If event is a keypress or blur, save to local storage
 * @param {*} e The event being checked
 */
function setName (e) {
  if (e.type === 'keypress') {
    // if event is keypress (enter), save NAME to local storage

    if (e.keycode === 13) {
      // 13 = enter key (which is deprecated)
      localStorage.setItem('name', e.target.innerText)
      name.blur()
    }
  } else {
    // if event is blur, save NAME to local storage
    localStorage.setItem('name', e.target.innerText)
  }
}
//Get Focus
/**
 * Checks if focus exists in local storage.
 *
 */
function getFocus () {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]'
  } else {
    focus.textContent = localStorage.getItem('focus')
  }
}
function setFocus (e) {
  if (e.type === 'keypress') {
    // if event is keypress (enter), save FOCUS to local storage
    if (e.keycode === 13) {
      // 13 = enter key (which is deprecated)
      localStorage.setItem('focus', e.target.innerText)
      focus.blur()
    }
  } else {
    // if event is blur, save NAME to local storage
    localStorage.setItem('focus', e.target.innerText)
  }
}

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)

// Test Buttons

// run
showTime()
setBackgroundGreeting()
getName()
getFocus()
