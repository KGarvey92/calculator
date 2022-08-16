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
        valueA = limitCheck(valueA);
        display.textContent = valueA;
        valueB = null;
        ongoingCalc = true;
    }
    else if (operator === "/") {
        if (valueB == 0) {
            display.textContent = "Naughty!";
            valueA = 0;
            valueB = null;
            selectedOperator = null;
            ongoingCalc = false;        
            return;
        }
        valueA = a / b;
        valueA = limitCheck(valueA);
        display.textContent = valueA; 
        valueB = null;
        ongoingCalc = true;
    }
    else if (operator === "+") {
        valueA = a + b;
        valueA = limitCheck(valueA);
        display.textContent = valueA;
        valueB = null;
        ongoingCalc = true;
    }
    else {
        valueA = a - b;
        valueA = limitCheck(valueA);
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
        valueA = limitCheck(valueA);
        display.textContent = valueA;
    }
    else if (selectedOperator !== null && valueB === null) {
        valueB = num;
        display.textContent = valueB;
    }
    else {
        valueB += num;
        valueB = limitCheck(valueB);
        display.textContent = valueB;
    }
}

//function that checks for display limit.
function limitCheck(value) {
    index = value.toString().indexOf(".");
    if (value > 9999999999) {
        return 9999999999;
    }
    else if (value < -999999999) {
        return -999999999;
    }
    else if (index != -1 && value.toString().length > 9) {
        if (index > 9) {
            index = 9;
        }
        value = Number(value);
        return value.toFixed(9 - index);
    }
    else {
        return value;
    }
}

// event listeners for number buttons
document.querySelectorAll(".numberBtn").forEach(btn => btn.addEventListener('click', () => {
    if (display.textContent.length >= 10 && selectedOperator === null || 
        display.textContent.length >= 10 && valueB) {
        return;
    }
    enterNumber(btn.textContent);
    audio.currentTime = 0;
    audio.play();
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
    audio.currentTime = 0;
    audio.play();
}));

// event listener for C
document.querySelector("#clearBtn").addEventListener('click', () => {
    valueA = 0;
    valueB = null;
    selectedOperator = null;
    ongoingCalc = false;
    display.textContent = valueA;
    audio.currentTime = 0;
    audio.play();
});

// event listener for equals
document.querySelector("#equalsBtn").addEventListener('click', () => {
    if (valueB && selectedOperator){
        //call operation function
        operate(selectedOperator, Number(valueA), Number(valueB));
        selectedOperator = null;
        audio.currentTime = 0;
        audio.play();
    }
});

//event listener for +/-
document.querySelector("#reverseBtn").addEventListener('click', () => {
    if (display.textContent == valueA) {
        valueA = valueA * -1;
        display.textContent = valueA;
        audio.currentTime = 0;
        audio.play();
    }
    else if (display.textContent === valueB) {
        valueB = valueB * -1;
        display.textContent = valueB;
        audio.currentTime = 0;
        audio.play();
    }
});

//event listener for decimal point
document.querySelector("#pointBtn").addEventListener('click', () => {
    if (display.textContent == valueA) {
        if (display.textContent.indexOf(".") == -1) {      
            valueA += ".";
            display.textContent = valueA;}}
    else if (display.textContent == valueB) {
        if (display.textContent.indexOf(".") == -1) {      
            valueB += ".";
            display.textContent = valueB;}}
    audio.currentTime = 0;
    audio.play();
});

// clicking sound
let audio = new Audio("./tink.wav");
