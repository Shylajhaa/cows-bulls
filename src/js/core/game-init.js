import { addToLocalStorage } from "../helpers/storage-helper.js";

export const initialise = () => {
    var level = fetchLocalStorage("level", "int");
    addToLocalStorage("randomNumber", findNumber(level));
    document.getElementById('input-number').placeholder = "Enter a " + (level + 2) + " digit number";
}

export const startLevel1 = () => {
    startGame(1);
};

export const startLevel2 = () => {
    startGame(2);
};

export const startLevel3 = () => {
    startGame(3);
};

export const switchLevel = () => {
    var guesser = document.getElementById('guess-number');
    guesser.style.display =  "none";

    var result = document.getElementById('result');
    result.style.display =  "none";

    var levelSelector = document.getElementById('level-selector-btns');
    levelSelector.style.display = "block";  
    
    var congratulations = document.getElementById('congratulations');
    congratulations.style.display =  "none";
};

function findNumber(level) {
    const randomValue = (Math.floor(Math.random() * Math.pow(10, (level + 2)))).toString();
    if (!validRandomNumber(parseInt(randomValue, level))) {
        findNumber(level);
    }

    return randomValue;
}

function validRandomNumber (num, level) {
    const lowerLimit = Math.pow(10, (level + 1));
    const upperLimit = Math.pow(10, (level + 2)) - 1;

    if (num < lowerLimit || num > upperLimit) {
        return false;
    }

    return true;
}

function startGame(levelInput) {
    // attempt = 0;
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
