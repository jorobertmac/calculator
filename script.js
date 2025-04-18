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
  screen.textContent = equation.join("") + current
}

const buildCurrentNumber = (value) => {
  current += value
  inputToScreen()
}

const buildNextNumber = (value) => {
  if (value === "%" || value === "!") {
    equation.push(current + value)
    current = ""
    inputToScreen()
    return
  }
  if (current) {
    equation.push(current)
  }
  if (value.includes("^")) {
    equation.push(value)
    current = ""
    inputToScreen()
    return
  }
  if (validateOperator()) {
    equation.push(value)
    current = ""
    inputToScreen()
  }
}

const waitForOperator = () => {
  buttons.forEach((button) => {
    if (!validOperators.includes(button.value)) {
      button.disabled = true
    } else if (["+","-","*","/"].includes(button.value)){
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
  if (current.length >= 1) {
    buildCurrentNumber("0")
  }
  else if (!current) {
    buildCurrentNumber("0.")
  }
}

function validateDecimal() {
  if (!current) {
    buildCurrentNumber("0.")
  }
  else if (!current.includes(".")) {
    buildCurrentNumber(".")
  }
}

function validateOperator () {
  if (equation.length === 0) return false
  if ("+*/".includes(equation.at(-1))) return false
  if (equation.at(-1) === "-") return false
  if (
    equation.at(-1).includes("!") ||
    equation.at(-1).includes("%") ||
    equation.at(-1).includes("^") ||
    equation.at(-1).includes("-") ||
    current.length > 0
  ) {return true}
}

function currentNumberToPercent() {
  buildNextNumber("%")
  waitForOperator()
}

function currentNumberToExponent() {
  if (equation.length === 0) {
    buildNextNumber("^2")
    waitForOperator()
  } else  if (equation.at(-1).includes("^")){
    let exponent = increaseExponent()
    buildNextNumber(`^${exponent}`)
    waitForOperator()
    return
  } else {
    buildNextNumber("^2")
    waitForOperator()
  }
}
 function increaseExponent() {
  let exponent = equation.pop().split("^")
  exponent = Number(exponent[1])
  return exponent += 1
 }

function currentNumberToFactorial() {
  buildNextNumber("!")
  waitForOperator()
}

function currentNumberSignChange() {
  if (!current || isNaN(current)) return
  current = String(sign(Number(current)))
  inputToScreen()
}

function deleteLast() {
  enableAllButtons()
  screen.textContent = screen.textContent.slice(0, -1)
  if (!current) {
    current = String(equation.at(-1))
    equation.splice(equation.length - 1, 1)
  }
  current = current.slice(0, -1)
}

function clear() {
  enableAllButtons()
  if (confirm("Clear All?")) {
    screen.textContent = ""
    current = ""
    equation.splice(0, equation.length)
  }
}

function evaluate(equation) {
  let newEquation = [...equation]
  newEquation = evaluateFactorial(newEquation)
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

function evaluateFactorial(equation) {
  let result = []
  for (let i = 0; i < equation.length; i++) {
    if (equation[i].includes("!")) {
      let number = equation[i].split("!")
      result.push(factorial(Number(number[0])))
    } else {
      result.push(equation[i])
    } 
  }
  equation.length = 0
  return equation = [...result]
}

function equals() {
  if (current) {
    equation.push(Number(current))
    current = ""
  }
  answer = evaluate(equation)
  screen.textContent = answer
  equation.length = 0
  enableAllButtons()
}

let current = ""
let answer
// const equation = ["25","+","5","*","(","6","+","3",")","5","-","16","/","2"]
const equation = []
const validKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","=","%","(",")","^","!","backspace","delete","enter","s","r",] //MEM, M+, M
const validOperators = ["+","-","*","/","=","%","(",")","^","!","backspace","delete","enter","s","r"]

