export const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const fetchLocalStorage = (key, type = null) => {
    const value = localStorage.getItem(key);
    if (type == null) {
        return value;
    }

    return parseType(value, type);
};

const parseType = (value, type) => {
    var parsedVal = null;
    switch(type) {
        case "int":
            parsedVal = parseInt(value);
            break;
    }

    return parsedVal;
};
