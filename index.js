var randomNumber;
var level;
var attempt;

function allowNumbersOnly(e) {
    var code = (e.which) ? e.which : e.keyCode;
    if (code > 31 && (code < 48 || code > 57)) {
        e.preventDefault();
    }
}

function validRandomNumber(num) {
    lowerLimit = Math.pow(10, (level + 1));
    upperLimit = Math.pow(10, (level + 2)) - 1;

    if (num < lowerLimit || num > upperLimit) {
        return false;
    }

    return true;
}

function findNumber() {
    randomValue = (Math.floor(Math.random() * Math.pow(10, (level + 2)))).toString();
    if (!validRandomNumber(parseInt(randomValue))) {
        findNumber();
    }

    return randomValue;
}

function startGame(levelInput) {
    attempt = 0;
    level = levelInput;
    var guesser = document.getElementById('guess-number');
    guesser.style.display =  "block";

    var result = document.getElementById('result');
    result.style.display =  "block";

    var congratulations = document.getElementById('congratulations');
    congratulations.style.display =  "none";

    var levelSelector = document.getElementById('level-selector-btns');
    levelSelector.style.display = "none";

    var cowsBullsLogo = document.getElementById('cows-bulls-logo');
    cowsBullsLogo.style.height = "10%";
    cowsBullsLogo.style.width = "10%";

    var guessInput = document.getElementById('input-number');
    guessInput.value =  "";
    guessInput.setAttribute("maxlength", (level + 2));
    guessInput.setAttribute("minlength", (level + 2));

    randomNumber = findNumber();
    localStorage.setItem("randomNumber", randomNumber);
}

function guessNumber() {
    attempt ++;
    var inputNumber = document.getElementById('input-number').value;

    if (!validateInputNumber(level, inputNumber)) {
        return;
    }
    var cows = 0;
    var bulls = 0;

    indexMap = createIndexMap(randomNumber);

    for (var i=0; i < inputNumber.length; i++) {
        if (inputNumber[i] == randomNumber[i]) {
            cows++;
            if (indexMap[i] == "B") {
                bulls--;
            }
            indexMap[i] = "C";
        } else {
            numIndex = randomNumber.indexOf(inputNumber[i]);

            if (numIndex >= 0 && indexMap[numIndex] == "N") {
                bulls++;
                indexMap[numIndex] = "B";
            }
        }

    }

    if (cows == inputNumber.length) {
        var result = cows + " Cows " + bulls + " Bulls";
        showResultScreen(attempt);
    } else {
        var result = cows + " Cows " + bulls + " Bulls";
    }

    var resultTable = document.getElementById('result-table');
    var newResultRow = document.createElement('tr');

    var attemptNum = document.createElement('td');
    var attemptVal = document.createTextNode(attempt);
    attemptNum.appendChild(attemptVal);

    var guessValue = document.createElement('td');
    var value = document.createTextNode(inputNumber);
    guessValue.appendChild(value);

    var resultValue = document.createElement('td');
    var resultText = document.createTextNode(result);
    resultValue.appendChild(resultText);

    newResultRow.appendChild(attemptNum);
    newResultRow.appendChild(guessValue);
    newResultRow.appendChild(resultValue);

    resultTable.appendChild(newResultRow);
}

function switchLevel() {
    var guesser = document.getElementById('guess-number');
    guesser.style.display =  "none";

    var result = document.getElementById('result');
    result.style.display =  "none";

    var levelSelector = document.getElementById('level-selector-btns');
    levelSelector.style.display = "block";  
    
    var congratulations = document.getElementById('congratulations');
    congratulations.style.display =  "none";
}

function createIndexMap(randomNumber) {
    var indexMap = {};
    for (i = 0;i < randomNumber.length; i++) {
        indexMap[i] = "N";
    }

    return indexMap;
}

function validateInputNumber(level, inputNumber) {
    var isValid = true;
    if (inputNumber.length == 0) {
        alertText = "Enter a valid number";
        isValid = false;
    } else if (inputNumber.length != (level + 2)) {
        alertText = "Enter a " + (level + 2) + " digit number";
        isValid = false;
    }
    
    if (!isValid) {
        var guessInput = document.getElementById('input-number');
        guessInput.value =  "";
        alert(alertText);
    }

    return isValid;
}

function showResultScreen(attempts){
    var guesser = document.getElementById('guess-number');
    guesser.style.display =  "none";

    // var result = document.getElementById('result');
    // result.style.display =  "none";
    
    var victoryBlock = document.getElementById('result-text');
    victoryBlock.innerHTML = victoryBlock.innerHTML + " in " + attempts + " attempts";
    var congratulations = document.getElementById('congratulations');
    congratulations.style.display =  "block";
}