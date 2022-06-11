- set min and max length attribute to input number field

```
    var guessInput = document.getElementById('input-number');
    guessInput.value =  "";
    guessInput.setAttribute("maxlength", (level + 2));
    guessInput.setAttribute("minlength", (level + 2));
```

- create header and footer and use it in all html files
