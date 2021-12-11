import { findNumber, startLevel1, startLevel2, startLevel3 } from "./core/game-init.js";
import { allowNumbersOnly } from "./helpers/input-helper.js";
import { addToLocalStorage } from "./helpers/storage-helper.js";
import { fetchLocalStorage } from "./helpers/storage-helper.js";

// add all listeners
document.getElementById('l1')?.addEventListener('click', startLevel1);
document.getElementById('l2')?.addEventListener('click', startLevel2);
document.getElementById('l3')?.addEventListener('click', startLevel3);
document.getElementById('logo-btn')?.addEventListener('click', switchLevel);
document.getElementById('input-number')?.addEventListener('keypress', allowNumbersOnly);
document.getElementById('number')?.addEventListener('click', guessNumber);
if (window.location.href.match('game.html') != null) {
    window.addEventListener('load', initialise());
}

function initialise() {
    // var guessInput = document.getElementById('number');
    // guessInput.value =  "";
    // guessInput.setAttribute("maxlength", (level + 2));
    // guessInput.setAttribute("minlength", (level + 2));

    var level = fetchLocalStorage("level", "int");
    addToLocalStorage("randomNumber", findNumber(level));
    document.getElementById('input-number').placeholder = "Enter a " + (level + 2) + " digit number";
}

function guessNumber() {
    var inputNumber = document.getElementById('input-number').value;
    var level = fetchLocalStorage("level", "int");

    if (!validateInputNumber(level, inputNumber)) {
        return;
    }

    attempt++;
    var cows = 0;
    var bulls = 0;

    const randomNumber = fetchLocalStorage("randomNumber");
    const indexMap = createIndexMap(randomNumber);

    for (var i=0; i < inputNumber.length; i++) {
        if (inputNumber[i] == randomNumber[i]) {
            cows++;
            if (indexMap[i] == "B") {
                bulls--;
            }
            indexMap[i] = "C";
        } else {
            const numIndex = randomNumber.indexOf(inputNumber[i]);

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
    for (var i = 0;i < randomNumber.length; i++) {
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