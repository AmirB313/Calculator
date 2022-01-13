const output = document.querySelector('h1');

let currentTotal = 0;
let lastOperator = "";

const modifyOutputHandler = (event) => {
    const value = event.target.innerHTML;
    if (output.innerText === "0" && value !== "." || output.innerText === "OVERFLOW") {
        output.innerText = ""
    }
    output.innerText = output.innerText += value;
    overflowHelper(event);
}

const operationsHandlerHelper = (value) => {
    if (lastOperator === "+") {
        currentTotal += value;
    } else if (lastOperator === "-") {
        currentTotal -= value;
    } else if (lastOperator === "/") {
        currentTotal /= value;
    } else if (lastOperator === "x") {
        currentTotal *= value;
    } else if (lastOperator === "") {
        currentTotal = value;
    }
}

const getValue = () => {
    let value = output.innerText;
    if (value.endsWith('.')) {
        value += '0';
    }
    return parseFloat(value);
}

const operationsHandler = (event) => {
    const operator = event.target.innerHTML;
    let value = getValue();
    if (lastOperator !== "") {
        operationsHandlerHelper(value);
    } else {
        currentTotal = value;
    }
    lastOperator = operator;
    output.innerText = "0";
}

const deleteHandler = () => {
    if (output.innerText !== 'NaN' &&
        output.innerText !== 'Infinity' &&
        output.innerText !== '0' &&
        output.innerText !== 'OVERFLOW') {
        output.innerText = output.innerText.slice(0, -1);
        if (output.innerText === "") {
            output.innerText = "0";
        }
    } else {
        resetHandler();
    }
}

const equalsHandler = (event) => {
    let value = getValue();
    operationsHandlerHelper(value);
    output.innerText = `${currentTotal}`;
    overflowHelper(event);
    lastOperator = "";
}

const resetHandler = () => {
    currentTotal = 0;
    output.innerText = "0";
}

const overflowHelper = (event) => {
    let value = output.innerText;
    if (value.length > 9) {
        if (event.target.innerText === "=") {
            if (value.includes('.')) {
                let splitNum = value.split('.');
                let decimalLength = 8 - splitNum[0].length;
                if (decimalLength < 0) {
                    output.innerText = "OVERFLOW";
                    currentTotal = 0;
                } else {
                    let newNum = parseFloat(value).toFixed(decimalLength);
                    console.log(newNum)
                    output.innerText = `${newNum}`;
                    currentTotal = newNum;
                }
            } else {
                output.innerText = "OVERFLOW";
                currentTotal = 0;
            }
        } else {
            output.innerText = "OVERFLOW";
            currentTotal = 0;
        }
    }

    if (value.includes('.') && event.target.innerText === "=") {
        let splitNum = value.split('.');
        let decimalLength = 8 - splitNum[0].length;
        let newNum = parseFloat(value).toFixed(decimalLength);
        output.innerText = `${newNum}`;
    }
}

const themeSelectorHandler = (event) => {
    let themeNumber = event.target.value;
    let styleLink = document.querySelector('#theme-style');
    if (themeNumber === "1") {
        styleLink.href = "stylesheets/theme-one.css";
    } else if (themeNumber === "2") {
        styleLink.href = "stylesheets/theme-two.css"
    } else if (themeNumber === "3") {
        styleLink.href = "stylesheets/theme-three.css"
    }
}

document.querySelector('.theme-input').value = "1"

document.querySelector('.theme-input').addEventListener('change', themeSelectorHandler);

document.querySelectorAll('.calc-btn').forEach(btn => {
    if (btn.id === "") {
        btn.addEventListener('click', modifyOutputHandler);
    } else if (btn.id === "del") {
        btn.addEventListener('click', deleteHandler)
    } else {
        btn.addEventListener('click', operationsHandler);
    }
});

document.querySelectorAll('.calc-btn__lg').forEach(btn => {
    if (btn.id === "equal") {
        btn.addEventListener('click', equalsHandler);
    } else if (btn.id === "reset") {
        btn.addEventListener('click', resetHandler);
    }
})