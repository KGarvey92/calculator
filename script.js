//initialise values to be calculated
let valueA = 0;
let valueB = null;

//initialise display
let display = document.querySelector('#display');

// initialise variable to check which operator has been selected
let selectedOperator = null;

//function that performs operation
function operate(operator, a, b) {
    if (operator === "*") {
        valueA = a * b;
        display.textContent = valueA;
        valueB = null;
    }
    else if (operator === "/") {
        valueA = a / b;
        display.textContent = valueA; 
        valueB = null;
    }
    else if (operator === "+") {
        valueA = a + b;
        display.textContent = valueA;
        valueB = null;
    }
    else {
        valueA = a - b;
        display.textContent = valueA;
        valueB = null;
    }
}

// function that changes display value and alter number variables.

function enterNumber(num) {
    if (valueA === 0 && selectedOperator === null) {
        display.textContent = num;
        valueA = num; 
    }
    else if (selectedOperator === null) {
        valueA += num;
        display.textContent = valueA;
    }
    else if (selectedOperator !== null && valueB === null) {
        valueB = num;
        display.textContent = valueB;
    }
    else {
        valueB += num;
        display.textContent = valueB;
    }
}

// event listeners for number buttons
document.querySelectorAll(".numberBtn").forEach(btn => btn.addEventListener('click', () => {
    enterNumber(btn.textContent);
}))

// TODO: event listener for C
    

// TODO: event listener for operators
document.querySelectorAll(".operatorBtn").forEach(btn => btn.addEventListener('click', () => {
    // check if valueB and selectedOperator have values
    if (valueB && selectedOperator){
        //call operation function
        operate(selectedOperator, Number(valueA), Number(valueB));

    }
    //update selectedOperator
    selectedOperator = btn.value;
}));