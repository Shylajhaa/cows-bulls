import { addToLocalStorage } from "./helpers/storage-helper.js";
import { fetchLocalStorage } from "./helpers/storage-helper.js";

var attempt;

document.getElementById('l1')?.addEventListener('click', startLevel1);
document.getElementById('l2')?.addEventListener('click', startLevel2);
document.getElementById('l3')?.addEventListener('click', startLevel3);
document.getElementById('logo-btn')?.addEventListener('click', switchLevel);
document.getElementById('input-number')?.addEventListener('keypress', allowNumbersOnly);
document.getElementById('number')?.addEventListener('click', guessNumber);
if (window.location.href.match('game.html') != null) {
    window.addEventListener('load', initialise());
}

function allowNumbersOnly(e) {
    var code = (e.which) ? e.which : e.keyCode;
    if (code > 31 && (code < 48 || code > 57)) {
        e.preventDefault();
    }
}

function validRandomNumber(num, level) {
    const lowerLimit = Math.pow(10, (level + 1));
    const upperLimit = Math.pow(10, (level + 2)) - 1;

    if (num < lowerLimit || num > upperLimit) {
        return false;
    }

    return true;
}

function findNumber(level) {
    const randomValue = (Math.floor(Math.random() * Math.pow(10, (level + 2)))).toString();
    if (!validRandomNumber(parseInt(randomValue, level))) {
        findNumber(level);
    }

    return randomValue;
}

function initialise() {
    // var guessInput = document.getElementById('number');
    // guessInput.value =  "";
    // guessInput.setAttribute("maxlength", (level + 2));
    // guessInput.setAttribute("minlength", (level + 2));

    var level = fetchLocalStorage("level", "int");
    addToLocalStorage("randomNumber", findNumber(level));
}

function startLevel1() {
    startGame(1);
}

function startLevel2() {
    startGame(2);
}

function startLevel3() {
    startGame(3);
}

function startGame(levelInput) {
    attempt = 0;
    addToLocalStorage("level", levelInput);
    // var guesser = document.getElementById('guess-number');
    // guesser.style.display =  "block";

    // var result = document.getElementById('result');
    // result.style.display =  "none";

    // var congratulations = document.getElementById('congratulations');
    // congratulations.style.display =  "none";

    // var levelSelector = document.getElementById('level-selector-btns');
    // levelSelector.style.display = "none";

    // var cowsBullsLogo = document.getElementById('cows-bulls-logo');
    // cowsBullsLogo.style.height = "10%";
    // cowsBullsLogo.style.width = "10%";

    location.href = "src/view/game.html";
}

function guessNumber() {
    // var result = document.getElementById('result');
    // result.style.display =  "block";

    var inputNumber = document.getElementById('input-number').value;
    var level = fetchLocalStorage("level", "int");

    if (!validateInputNumber(level, inputNumber)) {
        return;
    }
    attempt++;
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
    var alertText = "";
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
    
    var victoryBlock = document.getElementById('result-text');
    victoryBlock.innerHTML = victoryBlock.innerHTML + " in " + attempts + " attempts";
    var congratulations = document.getElementById('congratulations');
    congratulations.style.display =  "block";
}