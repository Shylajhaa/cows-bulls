function startGame() {
    var guesser = document.getElementById('guess-number');
    guesser.style.display =  "block";

    var levelSelector = document.getElementById('level-selector');
    levelSelector.style.display = "none";

    var guessInput = document.getElementById('input-number');
    guessInput.value =  "";

    document.getElementById("cows-bulls").innerHTML = "Your Result:";

    var level = 0;
    if (document.getElementById('l1').checked) {
        level = 1;
    } else if(document.getElementById('l2').checked) {
        level = 2;
    } else {
        level = 3;
    }

    var randomNumber = (Math.floor(Math.random() * Math.pow(10, (level + 2)))).toString();
    localStorage.setItem("randomNumber", randomNumber);
}

function guessNumber() {
    document.getElementById("cows-bulls").innerHTML = "Your Result:";
    var inputNumber = document.getElementById('input-number').value;

    var cows = 0;
    var bulls = 0;
    var randomNumber = localStorage.getItem("randomNumber");
    var cowsIndices = [];
    for (var i=0; i < inputNumber.length; i++) {
        if (inputNumber[i] == randomNumber[i]) {
            cows++;
            cowsIndices.push(i);
        } else if ((randomNumber.indexOf(inputNumber[i]) >= 0) && !cowsIndices.includes(inputNumber[i])) {
            bulls++;
        }
    }

    if (cows == inputNumber.length) {
        var result = "Congratulations you found the number!!!";
    } else {
        var result = cows + " Cows " + bulls + " Bulls";
    }
    text = document.getElementById("cows-bulls").innerHTML + " " + result;
    document.getElementById("cows-bulls").innerHTML = text;
}

function switchLevel() {
    var guesser = document.getElementById('guess-number');
    guesser.style.display =  "none";

    var levelSelector = document.getElementById('level-selector');
    levelSelector.style.display = "block";    
}