// OPERATIONS
const add = (a, b) =>  a + b

const subtract = (a, b) =>  a - b

const multiply = (a, b) =>  a * b

const divide = (a, b) =>  a / b

const percent = (a) => a/100

const sign = (a) => -a

const exponent = (a, b=2) => a ** b

const root = (a, b=2) => a ** (1/b)

const factorial = (a) => {
  if (a < 0) return "ERROR - Negative Factorial"
  if (a % 1 !== 0) return "ERROR - Non-Integer"
  let b = 1
  for (let i = 1; i <= a ; i++) {
    b *= i
  }
  return b
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
number0_button.addEventListener("click", pushToCurrent)
number1_button.addEventListener("click", pushToCurrent)
number2_button.addEventListener("click", pushToCurrent)
number3_button.addEventListener("click", pushToCurrent)
number4_button.addEventListener("click", pushToCurrent)
number5_button.addEventListener("click", pushToCurrent)
number6_button.addEventListener("click", pushToCurrent)
number7_button.addEventListener("click", pushToCurrent)
number8_button.addEventListener("click", pushToCurrent)
number9_button.addEventListener("click", pushToCurrent)
add_button.addEventListener("click", pushToCurrent)
subtract_button.addEventListener("click", pushToCurrent)
multiply_button.addEventListener("click", pushToCurrent)
divide_button.addEventListener("click", pushToCurrent)
decimal_button.addEventListener("click", pushToCurrent)
equals_button.addEventListener("click", pushToCurrent)
percent_button.addEventListener("click", pushToCurrent)
sign_button.addEventListener("click", pushToCurrent)
// memoryCall_button.addEventListener("click", pushToCurrent)
// memoryAdd_button.addEventListener("click", pushToCurrent)
// memoryNext_button.addEventListener("click", pushToCurrent)
delete_button.addEventListener("click", deleteLast)
clear_button.addEventListener("click", pushToCurrent)
open_button.addEventListener("click", pushToCurrent)
close_button.addEventListener("click", pushToCurrent)
exponent_button.addEventListener("click", pushToCurrent)
root_button.addEventListener("click", pushToCurrent)
// xExponent_button.addEventListener("click", pushToCurrent)
// xRoot_button.addEventListener("click", pushToCurrent)
factorial_button.addEventListener("click", pushToCurrent)

document.addEventListener("keydown", (event) => {keyClick(event)})

// FUNCTIONS
const keyClick = (keyPressed) => {
  const key = keyPressed.key.toLowerCase()
  if (validKeys.includes(key)) {
    buttons.forEach((button) => {
      if (key === button.value) {
        button.click()
        button.blur()
      }
    })
  } 
}

function inputToScreen() {
  screen.innerHTML = current || "0"
}

function pushToCurrent() {
  current += VALUES[this.id].html
  equation += VALUES[this.id].value
  inputToScreen()
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

// // ZERO DIVISION ERROR INTERVAL
// if (current === 0) {
//   equation.length = 0
//   current = ""
//   screen.textContent = zeroDivisionError()
//   let blink = 1
//   const interval = setInterval(() => {
//     if (current === "") {
//       if (blink % 12 === 0) {  
//         screen.textContent = ""
//         blink = 1
//       } else {
//         screen.textContent = zeroDivisionError()
//         blink++
//       }
//     } else {
//       clearInterval(interval)
//     }
//   }, 125)
//   return
// }

function validateDecimal() {
  if (!current) {
    buildCurrentNumber("0.")
  }
  else if (!current.includes(".")) {
    buildCurrentNumber(".")
  }
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
  equation = equation.slice(0, -1)
  current = current.slice(0, -1)
  inputToScreen()
}

function clear() {
  screen.style.display = "none"
  screenClear.style.display = "flex"
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
    } else if (equation[i].includes("√")) {
      i++
      result.push(root(Number(equation[i]), Number(equation[i-1].slice(0,-1))))
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


const VALUES = {
  number0: {value: "0", html: "0", type: "number",},
  number1: {value: "1", html: "1", type: "number",},
  number2: {value: "2", html: "2", type: "number",},
  number3: {value: "3", html: "3", type: "number",},
  number4: {value: "4", html: "4", type: "number",},
  number5: {value: "5", html: "5", type: "number",},
  number6: {value: "6", html: "6", type: "number",},
  number7: {value: "7", html: "7", type: "number",},
  number8: {value: "8", html: "8", type: "number",},
  number9: {value: "9", html: "9", type: "number",},

  decimal: {value: ".", html: ".", type: "decimal"},
  
  add: {value: "+", html: "+", type: "operator"},
  subtract: {value: "-", html: "-", type: "operator"},
  multiply: {value: "*", html: "*", type: "operator"},
  divide: {value: "/", html: "/", type: "operator"},
  
  sign: {value: "s", html: "<sub><sup>-</sup></sub>", type: "sign"},
  
  percent: {value: "%", html: "%", type: "percent"},
  exponent: {value: "e", html: "<sub><sup><sup>2</sup></sup></sub>", type: "exponent"},
  xExponent: {value: "p", html: "<sub><sup><sup>2</sup></sup></sub>", type: "exponent"},
  root: {value: "r", html: "<sub><sup><sup>2</sup></sup></sub>√", type: "root"},
  xRoot: {value: "n", html: "<sub><sup><sup>2</sup></sup></sub>√", type: "root"},
  factorial: {value: "f", html: "!", type: "factorial"},
  
  open: {value: "(", html: "(", type: "open"},
  close: {value: ")", html: ")", type: "close"},
  
  memoryAdd: {},
  memoryNext: {},
  memoryCall: {},
  
  clear: {},
  delete: {},
  equals: {},
}

const STATES = {
  open: ["number", "decimal", "root", "open", ],
  number: ["number", "decimal", "operator", "sign", "percent", "exponent", "factorial", "close", ],
  operator: ["number", "decimal", "root", "open", ],
  percent: ["operator", "sign", "percent", "exponent", "factorial", "close", ],
  exponent: ["operator", "sign", "percent", "exponent", "factorial", "close", ],
  root: ["number", "decimal", "open", "root", ],
  factorial: ["operator", "sign", "percent", "exponent", "factorial", "close", ],
  close: ["operator", "percent", "exponent", "factorial", "close", ],
  parenthese: 0,
  superscript: false,
  decimal: true,
  equals: false,
}


let current = ""
let equation = ""
let state = STATES["open"]
let answer = 0
// const equation = ["25","+","5","*","(","6","+","3",")","5","-","16","/","2"]
const validKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","=","%","(",")","^","!","backspace","delete","enter","s","r", "y", "n",] //MEM, M+, M
const validOperators = ["+","-","*","/","=","%","(",")","^","!","backspace","delete","enter","s","r",]
inputToScreen()