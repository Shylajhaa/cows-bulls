import { initialise, startLevel1, startLevel2, startLevel3, switchLevel } from "./core/game-init.js";
import { guessNumber } from "./core/play-game.js";
import { allowNumbersOnly } from "./helpers/input-helper.js";

// add all listeners
document.getElementById('l1')?.addEventListener('click', startLevel1);
document.getElementById('l2')?.addEventListener('click', startLevel2);
document.getElementById('l3')?.addEventListener('click', startLevel3);
document.getElementById('logo-btn')?.addEventListener('click', switchLevel);
document.getElementById('input-number')?.addEventListener('keypress', allowNumbersOnly);
document.getElementById('number')?.addEventListener('click', guessNumber);
if (window.location.href.match('game.html') != null) {
    window.addEventListener('load', initialise);
}

// function showResultScreen(attempts){
//     var guesser = document.getElementById('guess-number');
//     guesser.style.display =  "none";
    
//     var victoryBlock = document.getElementById('result-text');
//     victoryBlock.innerHTML = victoryBlock.innerHTML + " in " + attempts + " attempts";
//     var congratulations = document.getElementById('congratulations');
//     congratulations.style.display =  "block";
// }