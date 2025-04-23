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
const screenClear = document.querySelector("#screenClear")
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
const memoryNext_button = document.querySelector("#memoryNext")
const delete_button = document.querySelector("#delete")
const clear_button = document.querySelector("#clear")
const clearY_button = document.querySelector("#clearY_button")
const clearN_button = document.querySelector("#clearN_button")
const open_button = document.querySelector("#open")
const close_button = document.querySelector("#close")
const exponent_button = document.querySelector("#exponent")
const xExponent_button = document.querySelector("#xExponent")
const root_button = document.querySelector("#root")
const xRoot_button = document.querySelector("#xRoot")
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
// memoryNext_button.addEventListener("click", function)
delete_button.addEventListener("click", deleteLast)
clear_button.addEventListener("click", clear)
// open_button.addEventListener("click", function)
// close_button.addEventListener("click", function)
exponent_button.addEventListener("click", currentNumberToExponent)
root_button.addEventListener("click", currentNumberToRoot)
// xExponent_button.addEventListener("click" function)
// xRoot_button.addEventListener("click" function)
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
  if (value.includes("√")) {  
    equation.push(value)
    current = ""
    inputToScreen()
    return
  }
  if (current.length === 0 && equation.length === 0) {
    return
  }
  
  if (value === "%" || value === "!") {
    equation.push(current)
    equation.push(value)
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
  if (equation.length === 0) return
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

function zeroDivisionError() {
  const chars = "@#$%^&*_+<>?"
  return `ZERO - DIV - MAKE - BROKE -`.split("").map((char) => {
    if (char === "-") {
      return chars[Math.floor(Math.random() * chars.length)]
    } else {
      return char
    }
  }).join("")
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
  if (
    equation.length === 0 ||
    "+*/".includes(equation.at(-1)) ||
    equation.at(-1) === "-" ||
    current.length === 0
  ) {return false}
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

function currentNumberToRoot() {
  if (equation.length === 0) {
    buildNextNumber("2√")
  } else if (equation.at(-1).includes("√")) {
    buildNextNumber(`${increaseRoot()}√`)
  } else {
    buildNextNumber("2√")
  }
}

function increaseRoot() {
  let root = Number(equation.pop().slice(0,-1))
  return root += 1
}
function currentNumberToExponent() {
  if (!current && !equation) return
  if (equation.length === 0) {
    buildNextNumber("^2")
    waitForOperator()
  } else  if (equation.at(-1).includes("^")){
    buildNextNumber(`^${increaseExponent()}`)
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
  screen.style.display = "none"
  screenClear.style.display = "block"
  const buttonState = []
  buttons.forEach(button => {
    if (button.disabled) {
      buttonState.push(true)
    } else {
      buttonState.push(false)
    }
    if (button.classList.contains("clrButton")) {
      button.disabled = false
    } else {
      button.disabled = true
    }
  })

  clearY_button.addEventListener("click", clearY)
  clearN_button.addEventListener("click", clearN)

  function clearY() {
    screen.style.display = "block"
    screenClear.style.display = "none"
    screen.textContent = ""
    current = ""
    equation.length = 0
    enableAllButtons()
    clearY_button.disabled = true
    clearN_button.disabled = true
    clearY_button.removeEventListener("click", clearY)
    clearN_button.removeEventListener("click", clearN)
  }
  
  function clearN() {
    screen.style.display = "block"
    screenClear.style.display = "none"
    let i = 0
    buttons.forEach(button => {
      button.disabled = buttonState[i]
      i++
    })
    clearY_button.removeEventListener("click", clearY)
    clearN_button.removeEventListener("click", clearN)
  }
}

function evaluate(equation) {
  let newEquation = [...equation]
  newEquation = evaluateFactPercRootExp(newEquation)
  newEquation = evaluateMulDiv(newEquation)
  if (newEquation === 0) return 0 //check for zero division error
  newEquation = evaluateAddSub(newEquation)
  return String(newEquation[0])
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
        if (rightNumber === 0) return 0 //check for zero division error
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

function evaluateFactPercRootExp(equation) {
  let result = []
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === "!") {
      result.push(factorial(Number(result.pop())))
    } else if (equation[i] === "%") {
      result.push(percent(Number(result.pop())))
    } else if (equation[i] === "√") {
      i++
      result.push(root(Number(equation[i])))
    } else if (equation[i].includes("^")) {
      result.push(exponent(Number(result.pop()), Number(equation[i].slice(1))))
    } else {
      result.push(equation[i])
    }
  }
  equation.length = 0
  return equation = [...result]
}

function equals() {
  if (current) {
    equation.push(current)
    current = ""
  }
  if (equation.length === 0) return
  current = evaluate(equation)
  if (current === 0) {
    equation.length = 0
    current = ""
    screen.textContent = zeroDivisionError()
    let blink = 1
    const interval = setInterval(() => {
      if (current === "") {
        if (blink % 12 === 0) {  
          screen.textContent = ""
          blink = 1
        } else {
          screen.textContent = zeroDivisionError()
          blink++
        }
      } else {
        clearInterval(interval)
      }
    }, 125)
    return
  }
  equation.length = 0
  inputToScreen()
  enableAllButtons()
}

let current = ""
let answer
// const equation = ["25","+","5","*","(","6","+","3",")","5","-","16","/","2"]
const equation = []
const validKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","=","%","(",")","^","!","backspace","delete","enter","s","r", "y", "n",] //MEM, M+, M
const validOperators = ["+","-","*","/","=","%","(",")","^","!","backspace","delete","enter","s","r",]

