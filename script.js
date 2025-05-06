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
number0_button.addEventListener("click", pushToEquation)
number1_button.addEventListener("click", pushToEquation)
number2_button.addEventListener("click", pushToEquation)
number3_button.addEventListener("click", pushToEquation)
number4_button.addEventListener("click", pushToEquation)
number5_button.addEventListener("click", pushToEquation)
number6_button.addEventListener("click", pushToEquation)
number7_button.addEventListener("click", pushToEquation)
number8_button.addEventListener("click", pushToEquation)
number9_button.addEventListener("click", pushToEquation)
add_button.addEventListener("click", pushToEquation)
subtract_button.addEventListener("click", pushToEquation)
multiply_button.addEventListener("click", pushToEquation)
divide_button.addEventListener("click", pushToEquation)
decimal_button.addEventListener("click", pushToEquation)
equals_button.addEventListener("click", pushToEquation)
percent_button.addEventListener("click", pushToEquation)
sign_button.addEventListener("click", pushToEquation)
// memoryCall_button.addEventListener("click", pushToEquation)
// memoryAdd_button.addEventListener("click", pushToEquation)
// memoryNext_button.addEventListener("click", pushToEquation)
delete_button.addEventListener("click", deleteLast)
clear_button.addEventListener("click", pushToEquation)
open_button.addEventListener("click", pushToEquation)
close_button.addEventListener("click", pushToEquation)
exponent_button.addEventListener("click", pushToEquation)
root_button.addEventListener("click", pushToEquation)
xExponent_button.addEventListener("click", pushToEquation)
xRoot_button.addEventListener("click", pushToEquation)
factorial_button.addEventListener("click", pushToEquation)

document.addEventListener("keydown", (event) => {keyClick(event)})

// FUNCTIONS
const keyClick = (keyPressed) => {
  pressAnyKey = false
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

function pushToEquation() {
  pressAnyKey = false
  this.blur()
  const button = VALUES[this.id]
  if (button.type === "equals") equals()
  if (!state.includes(button.type)) return

  if (button.type === "operator" && state === STATES.operator) {
    equation.pop()
  }

  state = STATES[button.type]

  if (button.type === "operator") decimalAvailable = true

  if (button.type === "open") parenthese += 1
  if (button.type === "close" && parenthese === 0) return
  if (button.type === "close" && parenthese > 0) parenthese -= 1

  // if (["root", "exponent", ].includes(button.type)) superscript = true

  if (button.type === "decimal" && !decimalAvailable) return
  if (button.type === "decimal") decimalAvailable = false
  
  equation.push({button: button, currentState: {state, parenthese, superscript, decimalAvailable, equate, }})
  current = screenHTML()
  inputToScreen()
}

function screenHTML() {
  return equation.map(char => {
    if (char.currentState.superscript) return `<sub><sup><sup>${char.button.html}</sup></sup></sub>`
    return char.button.html
  }).join("")
}




function zeroDivisionErrorText() {
  const chars = "@#$%^&*_+<>?"
  return `ZERO - DIV - MAKE - BROKE -`.split("").map((char) => {
    if (char === "-") {
      return chars[Math.floor(Math.random() * chars.length)]
    } else {
      return char
    }
  }).join("")
}

function zeroDivisionErrorInterval() {
  pressAnyKey = true
  screen.innerHTML = zeroDivisionErrorText()
  let blink = 1
  const interval = setInterval(() => {
    if (blink % 12 === 0) {
      screen.innerHTML = ""
      blink = 1
    } else {
      screen.innerHTML = zeroDivisionErrorText()
      blink++
    }
    if (!pressAnyKey) {
      clearInterval(interval)
      inputToScreen()
    }
  }, 125)
}


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
  const last = equation.pop()
  console.log(last);
  
  current = screenHTML()
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
  if (newEquation === "ERROR Divide by 0") return "ERROR Divide by 0"
  newEquation = evaluateAddSub(newEquation)
  return String(newEquation).split("")
}

function evaluateFactPercRootExp(equation) {
  let result = []
  for (let i= 0; i < equation.length; i++) {
    switch (equation[i]) {
      case "f":
        result.push(factorial(result.pop()))
        break
      case "%":
        result.push(percent(result.pop()))
        break
      case "r":
        i++
        result.push(root(equation[i]))
        break
      // case "t":
        // result.push(root(equation[++i], equation[++i]))
      //   break
      case "e":
        result.push(exponent(result.pop()))
        break
      // case "p":
        // result.push(exponent(result.pop(), equation[++i]))
      //   break
      default:
        result.push(equation[i])
        break
    }
  }
  equation.length = 0
  return equation = [...result]
}

function evaluateMulDiv(equation) {
  let result = []
  for (let i= 0; i < equation.length; i++) {
    switch (equation[i]) {
      case "*": {
        const leftNumber = Number(result.pop()) // removes last number from result
        const rightNumber = Number(equation[++i]) // skips to next number in equation
        result.push(multiply(leftNumber, rightNumber))
        break
      }
      case "/": {
        const leftNumber = Number(result.pop()) // removes last number from result
        const rightNumber = Number(equation[++i]) // skips to next number in equation
        if (rightNumber === 0) return "ERROR Divide by 0"
        result.push(divide(leftNumber, rightNumber))
        break
      }
      default:
        result.push(equation[i])
    }
  }
  equation.length = 0
  return equation = [...result]
}

function evaluateAddSub(equation) {
  let result = []
  for (let i= 0; i < equation.length; i++) {
    switch (equation[i]) {
      case "+": {
        const leftNumber = Number(result.pop()) // removes last number from result
        const rightNumber = Number(equation[++i]) // skips to next number in equation
        result.push(add(leftNumber, rightNumber))
        break
      }
      case "-": {
        const leftNumber = Number(result.pop()) // removes last number from result
        const rightNumber = Number(equation[++i]) // skips to next number in equation
        result.push(subtract(leftNumber, rightNumber))
        break
      }
      default:
        result.push(equation[i])
    }
  }
  equation.length = 0
  return equation = [...result]
}

function equals() {
  if (!equation.length) return
  history.push([...equation])
  let result = []
  let build = false
  let num = ""

  // Parse numbers and operators
  for (let article of equation) {
    if (["number", "decimal", "sign", ].includes(article.button.type)) {
      build = true
      num += article.button.value
    } else {
      if (num) {result.push(Number(num))}
      num = ""
      build = false
      result.push(article.button.value)
    }
  }
  if (num) result.push(Number(num))

  result = evaluate(result)
  console.log(result);
  
  current = ""
  equation.length = 0
  
  if (result === "ERROR Divide by 0") {
    zeroDivisionErrorInterval()
  } else {
    for (number of result) {
      console.log(buttonIds[number])      
      buttonIds[number].click()
    }
    inputToScreen()
  }
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
  xRoot: {value: "t", html: "<sub><sup><sup>2</sup></sup></sub>√", type: "root"},
  factorial: {value: "f", html: "!", type: "factorial"},
  
  open: {value: "(", html: "(", type: "open"},
  close: {value: ")", html: ")", type: "close"},
  
  memoryAdd: {},
  memoryNext: {},
  memoryCall: {},
  
  clear: {},
  delete: {},
  equals: {type: "equals"},
}

const STATES = {
  open: ["number", "decimal", "root", "open", ],
  number: ["number", "decimal", "operator", "sign", "percent", "exponent", "factorial", "close", ],
  decimal: ["number", ],
  operator: ["number", "decimal", "root", "open", "operator", ],
  percent: ["operator", "sign", "percent", "exponent", "factorial", "close", ],
  exponent: ["operator", "sign", "percent", "exponent", "factorial", "close", ],
  root: ["number", "decimal", "open", "root", ],
  factorial: ["operator", "sign", "percent", "exponent", "factorial", "close", ],
  close: ["operator", "percent", "exponent", "factorial", "close", ],
  sign: []
}

const buttonIds = {
  "0": number0_button,
  "1": number1_button,
  "2": number2_button,
  "3": number3_button,
  "4": number4_button,
  "5": number5_button,
  "6": number6_button,
  "7": number7_button,
  "8": number8_button,
  "9": number9_button,
  ".": decimal_button,
  "-": sign_button,
}


let state = STATES.open
let parenthese = 0
let superscript = false
let decimalAvailable = true
let equate = false
let pressAnyKey = false

let current = ""
let equation = []
let history = []
// const equation = ["25","+","5","*","(","6","+","3",")","5","-","16","/","2"]
const validKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","=","%","(",")","^","!","backspace","delete","enter","s","r", "y", "n",] //MEM, M+, M
const validOperators = ["+","-","*","/","=","%","(",")","^","!","backspace","delete","enter","s","r",]
inputToScreen()