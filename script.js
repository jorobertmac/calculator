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
  if (a < 0) {
    a = -a
    b = -b
  }
  for (let i = 1; i <= a ; i++) {
    b *= i
  }
  return Number(b.toPrecision(3))
}

// QUERYSELECTORS
const screen = document.querySelector("#screen")
const memory = document.querySelector("#memory")
const buttons = document.querySelectorAll("button")
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
number1_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
number2_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
number3_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
number4_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
number5_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
number6_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
number7_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
number8_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
number9_button.addEventListener("click", (event) => {buildCurrentNumber(event.target.textContent)})
add_button.addEventListener("click", (event) => {buildNextNumber(event.target.textContent)})
subtract_button.addEventListener("click", (event) => {buildNextNumber(event.target.textContent)})
multiply_button.addEventListener("click", (event) => {buildNextNumber(event.target.textContent)})
divide_button.addEventListener("click", (event) => {buildNextNumber(event.target.textContent)})
decimal_button.addEventListener("click", validateDecimal)
equals_button.addEventListener("click", equals)
percent_button.addEventListener("click", currentNumberToPercent)
sign_button.addEventListener("click", currentNumberSignChange)
// memoryCall_button.addEventListener("click", function)
// memoryAdd_button.addEventListener("click", function)
// memoryCycle_button.addEventListener("click", function)
delete_button.addEventListener("click", deleteLast)
clear_button.addEventListener("click", clear)
// open_button.addEventListener("click", function)
// close_button.addEventListener("click", function)
exponent_button.addEventListener("click", currentNumberToExponent)
// root_button.addEventListener("click", function)
factorial_button.addEventListener("click", currentNumberToFactorial)

document.addEventListener("keydown", (event) => {keyClick(event)})

// FUNCTIONS
const keyClick = (keyPressed) => {
  const key = keyPressed.key.toLowerCase()
  if (validKeys.includes(key)) {
    buttons.forEach((button) => {
      if (key === button.value) {
        button.click()
      }
    })
  } 
}

const inputToScreen = () => {
  screen.textContent = equation.join("")
}

const buildCurrentNumber = (value) => {
  inputToScreen()
  currentNumber += value
  screen.textContent += currentNumber
}

const buildNextNumber = (value) => {
  equation.push(currentNumber)
  equation.push(value)
  currentNumber = ""
  inputToScreen()
}

const waitForOperator = () => {
  buttons.forEach((button) => {
    if (!validOperators.includes(button.value)) {
      button.disabled = true
    } else if (!["%","s","^","!"].includes(button.value)){
      button.addEventListener("click", enableAllButtons)
    }
  })
}

const enableAllButtons = () => {
  buttons.forEach((button) => {
    button.disabled = false
    button.removeEventListener("click", enableAllButtons)
  })
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
  waitForOperator()
}

function currentNumberToExponent() {
  const curNumLen = currentNumber.length
  const curEquLen = screen.textContent.length
  let curNumStr = currentNumber
  currentNumber = String(exponent(Number(curNumStr)))
  screen.textContent = screen.textContent.slice(0, curEquLen - curNumLen) + currentNumber
  waitForOperator()
}

function currentNumberToFactorial() {
  const curNumLen = currentNumber.length
  const curEquLen = screen.textContent.length
  let curNumStr = currentNumber
  currentNumber = String(factorial(Number(curNumStr)))
  screen.textContent = screen.textContent.slice(0, curEquLen - curNumLen) + currentNumber
  waitForOperator()
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
    currentNumber = String(equation.at(-1))
    equation.splice(equation.length - 1, 1)
  }
  currentNumber = currentNumber.slice(0, -1)
}

function clear() {
  if (confirm("Clear All?")) {
    screen.textContent = ""
    currentNumber = ""
    equation.splice(0, equation.length)
  }
}

function evaluate(equation) {
  let newEquation = [...equation]
  newEquation = evaluateMulDiv(newEquation)
  newEquation = evaluateAddSub(newEquation)
  return newEquation
}

function evaluateMulDiv(equation) {
  let result = []
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === "*" || equation[i] === "/") {
      const leftNumber = Number(result[result.length - 1])
      const rightNumber = Number(equation[i + 1])

      result.pop()

      if (equation[i] === "*") {
        result.push(multiply(leftNumber, rightNumber))
      } else {
        result.push(divide(leftNumber, rightNumber))
      }
      i++
    } else {
      result.push(equation[i])
    }
  }
  equation.length = 0
  return equation = [...result]
}

function evaluateAddSub(equation) {
  let result = []
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === "+" || equation[i] === "-") {
      const leftNumber = Number(result[result.length - 1])
      const rightNumber = Number(equation[i + 1])

      result.pop()

      if (equation[i] === "+") {
        result.push(add(leftNumber, rightNumber))
      } else {
        result.push(subtract(leftNumber, rightNumber))
      }
      i++
    } else {
      result.push(equation[i])
    }
  }
  equation.length = 0
  return equation = [...result]
}

function equals() {
  equation.push(Number(currentNumber))
  currentNumber = ""
  screen.textContent = evaluate(equation)
}

let currentNumber = ""
let currentEquation = 0
// const equation = ["25","+","5","*","(","6","+","3",")","5","-","16","/","2"]
const equation = []
const validKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","=","%","(",")","^","!","backspace","delete","enter","s","r",] //MEM, M+, M
const validOperators = ["+","-","*","/","=","%","(",")","^","!","backspace","delete","enter","s","r"]

