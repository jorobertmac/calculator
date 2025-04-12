// OPERATIONS
const add = (a, b) =>  a + b

const subtract = (a, b) =>  a - b

const multiply = (a, b) =>  a * b

const divide = (a, b) =>  a / b

const percent = (a) => a/100

const sign = (a) => -a

const exponent = (a, b=2) => Math.pow(a, b)

const root = (a, b=2) => Math.pow(a, 1/b)

const factorial = (a) => {  
  let b = 1
  for (let i = 1; i <= a ; i++) {
    b *= i
  }
  return b
}

// QUERYSELECTORS
const screen = document.querySelector("#screen")
const memory = document.querySelector("#memory")
const number0_button = document.querySelector("#number0")
const number1_button = document.querySelector("#number1")
const number2_button = document.querySelector("#number2")
const number3_button = document.querySelector("#number3")
const number4_button = document.querySelector("#number4")
const number5_button = document.querySelector("#number5")
const number6_button = document.querySelector("#number6")
const number7_button = document.querySelector("#number7")
const number8_button = document.querySelector("#number8")
const number9_button = document.querySelector("#number9")
const add_button = document.querySelector("#add")
const subtract_button = document.querySelector("#subtract")
const multiply_button = document.querySelector("#multiply")
const divide_button = document.querySelector("#divide")
const decimal_button = document.querySelector("#decimal")
const equals_button = document.querySelector("#equals")
const percent_button = document.querySelector("#percent")
const sign_button = document.querySelector("#sign")
const memoryCall_button = document.querySelector("#memoryCall")
const memoryAdd_button = document.querySelector("#memoryAdd")
const memoryCycle_button = document.querySelector("#memoryCycle")
const delete_button = document.querySelector("#delete")
const clear_button = document.querySelector("#clear")
const open_button = document.querySelector("#open")
const close_button = document.querySelector("#close")
const exponent_button = document.querySelector("#exponent")
const root_button = document.querySelector("#root")
const factorial_button = document.querySelector("#factorial")

// ADDEVENTLISTENERS
number0_button.addEventListener("click", validateZero)
number1_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
number2_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
number3_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
number4_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
number5_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
number6_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
number7_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
number8_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
number9_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.value)})
add_button.addEventListener("click", (event) => {buildNextNumber(event.target.value)})
subtract_button.addEventListener("click", (event) => {buildNextNumber(event.target.value)})
multiply_button.addEventListener("click", (event) => {buildNextNumber(event.target.value)})
divide_button.addEventListener("click", (event) => {buildNextNumber(event.target.value)})
decimal_button.addEventListener("click", validateDecimal)
equals_button.addEventListener("click", equals)
percent_button.addEventListener("click", currentNumberToPercent)
sign_button.addEventListener("click", currentNumberSignChange)
// memoryCall_button.addEventListener("click", (event) => {inputToScreen(event.target)})
// memoryAdd_button.addEventListener("click", (event) => {inputToScreen(event.target)})
// memoryCycle_button.addEventListener("click", (event) => {inputToScreen(event.target)})
delete_button.addEventListener("click", deleteLast)
clear_button.addEventListener("click", clear)
// open_button.addEventListener("click", (event) => {inputToScreen(event.target)})
// close_button.addEventListener("click", (event) => {inputToScreen(event.target)})
// exponent_button.addEventListener("click", (event) => {inputToScreen(event.target)})
// root_button.addEventListener("click", (event) => {inputToScreen(event.target)})
// factorial_button.addEventListener("click", (event) => {inputToScreen(event.target)})

// FUNCTIONS
const inputToScreen = (value) => {
  screen.textContent += value
}

const buildCurrentNumber = (value) => {
  currentNumber += value
  inputToScreen(value)
}

const buildNextNumber = (value) => {
  numbers.push(Number(currentNumber))
  currentNumber = ""
  inputToScreen(value)
}

function validateZero() {
  if (currentNumber.length >= 1) {
    buildCurrentNumber("0")
  }
  else if (!currentNumber) {
    buildCurrentNumber("0.")
  }
}

function validateDecimal() {
  if (!currentNumber) {
    buildCurrentNumber("0.")
  }
  else if (!currentNumber.includes(".")) {
    buildCurrentNumber(".")
  }
}

function currentNumberToPercent() {
  const curNumLen = currentNumber.length
  const curEquLen = screen.textContent.length
  let curNumStr = currentNumber
  currentNumber = String(percent(Number(curNumStr)))
  screen.textContent = screen.textContent.slice(0, curEquLen - curNumLen) + currentNumber
}

function currentNumberSignChange() {
  const curNumLen = currentNumber.length
  const curEquLen = screen.textContent.length
  let curNumStr = currentNumber
  currentNumber = String(sign(Number(curNumStr)))
  screen.textContent = screen.textContent.slice(0, curEquLen - curNumLen) + currentNumber
}

function deleteLast() {
  screen.textContent = screen.textContent.slice(0, -1)
  if (!currentNumber) {
    currentNumber = String(numbers.at(-1))
    numbers.splice(numbers.length - 1, 1)
  }
  currentNumber = currentNumber.slice(0, -1)
}

function clear() {
  if (confirm("Clear All?")) {
    screen.textContent = ""
    currentNumber = ""
    numbers.splice(0, numbers.length)
    equations.splice(0, equations.length)
  }
}

function evaluate() {
  let evaluation = "01134"
  return evaluation
}

function equals() {
  numbers.push(Number(currentNumber))
  currentNumber = ""
  screen.textContent = evaluate()
}

let currentNumber = ""
const numbers = []
const equations = []
