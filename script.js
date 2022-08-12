//initialise values to be calculated
let valueA = 0;
let valueB = null;

//initialise display
let display = document.querySelector('#display');

// initialise variable to check which operator has been selected
let selectedOperator = null;

// intialise boolean to check whether a calculation is ongoing
let ongoingCalc = false;

//function that performs operation
function operate(operator, a, b) {
    if (operator === "*") {
        valueA = a * b;
        display.textContent = valueA;
        valueB = null;
        ongoingCalc = true;
    }
    else if (operator === "/") {
        valueA = a / b;
        display.textContent = valueA; 
        valueB = null;
        ongoingCalc = true;
    }
    else if (operator === "+") {
        valueA = a + b;
        display.textContent = valueA;
        valueB = null;
        ongoingCalc = true;
    }
    else {
        valueA = a - b;
        display.textContent = valueA;
        valueB = null;
        ongoingCalc = true;
    }
}

// function that changes display value and alter number variables.

function enterNumber(num) {

    if (valueA === 0 && selectedOperator === null) {
        valueA = num; 
        display.textContent = valueA;
    }
    else if (ongoingCalc === true && selectedOperator === null) {
        ongoingCalc = false;
        valueA = num;
        display.textContent = valueA;
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
}));

// event listeners for operators
document.querySelectorAll(".operatorBtn").forEach(btn => btn.addEventListener('click', () => {
    // check if valueB and selectedOperator have values
    if (valueB && selectedOperator){
        //call operation function
        operate(selectedOperator, Number(valueA), Number(valueB));
    }
    //update selectedOperator
    selectedOperator = btn.value;
}));

// event listener for C
document.querySelector("#clearBtn").addEventListener('click', () => {
    valueA = 0;
    valueB = null;
    selectedOperator = null;
    ongoingCalc = false;
    display.textContent = valueA;
});

// event listener for equals
document.querySelector("#equalsBtn").addEventListener('click', () => {
    if (valueB && selectedOperator){
        //call operation function
        operate(selectedOperator, Number(valueA), Number(valueB));
        selectedOperator = null;
    }
});
