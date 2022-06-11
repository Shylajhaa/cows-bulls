export const allowNumbersOnly = (e) => {
    var code = (e.which) ? e.which : e.keyCode;
    if (code > 31 && (code < 48 || code > 57)) {
        e.preventDefault();
    }
};

export const validateInputNumber = (level, inputNumber) => {
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
};