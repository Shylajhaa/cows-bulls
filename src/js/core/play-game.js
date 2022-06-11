export const guessNumber = () => {
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
};

function createIndexMap(randomNumber) {
    var indexMap = {};
    for (var i = 0;i < randomNumber.length; i++) {
        indexMap[i] = "N";
    }

    return indexMap;
}