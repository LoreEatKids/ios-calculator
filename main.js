"use strict";

const resultEl = document.querySelector(".result-int");
const buttonsIntEl = document.querySelectorAll(".int");
const signsEl = document.querySelectorAll(".sign");
const equalEl = document.querySelector(".equal");
const acEl = document.querySelector(".ac");
const reverseEl = document.querySelector(".reverse");
const percentualEl = document.querySelector(".percentual");

let firstValue = "";
let isFirstValue = true;
let secondValue = "";
let isSecondValue = false;
let resultValue = 0;

let sign = "";
let resultWithNoLeading0 = 0;

buttonsIntEl.forEach(btn => {
    btn.addEventListener("click", (e)=> {
        const int = e.target.textContent;

        if (isFirstValue) getFirstValue(int);
        if (isSecondValue) getSecondValue(int);
    })
})

function getFirstValue(el) {
    resultEl.innerHTML = "";
    firstValue += el;
    resultEl.innerHTML = firstValue;
}

function getSecondValue(el) {
    resultEl.innerHTML = "";
    secondValue += el;
    resultEl.innerHTML = secondValue;
}

function getSign(e) {
    sign = e.target.dataset.sign;

    isFirstValue = false;
    isSecondValue = true;
}
signsEl.forEach(sign => sign.addEventListener("click", (e) => {getSign(e)}))
equalEl.addEventListener("click", ()=> getResult(sign));

// not working
function decimalValidation(num) {
    let finalNumber = 0;

    if (num == Math.floor(num)) { // is not decimal
        finalNumber = parseInt(num, 10);
    } else { // is decimal
        if (num.toString().length > 4) finalNumber = num.toFixed(4);
    }

    return finalNumber;
}

function getResult(sign){
    if(secondValue == "") return;

    resultEl.innerHTML = "";

    switch (sign) {
        case "divisione":
            resultValue = firstValue / secondValue;
            break
        case "moltiplicazione":
            resultValue = firstValue * secondValue;
            break
        case "sottrazione":
            resultValue = firstValue - secondValue;
            break
        case "addizione":
            resultValue = firstValue + secondValue;
            break
    }

    resultValue = decimalValidation(+resultValue);
    firstValue = resultValue; 

    resultEl.innerHTML = resultValue;

    // reset for new operations

    secondValue = "";
    isFirstValue = true;
    isSecondValue = false;
}

acEl.addEventListener("click", ()=> { // reset btn
    resultEl.innerHTML = 0;

    firstValue = "";
    isFirstValue = true;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultValue = 0;
}) 

reverseEl.addEventListener("click", ()=> { // +/-, swap signs
    if (isFirstValue && firstValue != "") {
        firstValue = -firstValue;

        resultEl.innerHTML = decimalValidation(firstValue);
    }
    if (isSecondValue && secondValue != "") {
        secondValue = -secondValue;

        resultEl.innerHTML = decimalValidation(secondValue);  
    }
})

percentualEl.addEventListener("click", ()=> {    
    if (firstValue && firstValue != "") {
        firstValue = firstValue / 100;

        resultEl.innerHTML = firstValue;
    }
    if (isSecondValue && secondValue != "") {
        secondValue = secondValue / 100;

        resultEl.innerHTML = secondValue;
    }
})