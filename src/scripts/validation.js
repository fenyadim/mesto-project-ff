function showInputError(formElement, inputElement, validationMessage, classList) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(classList.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(classList.errorClass);
}

function hideInputError(formElement, inputElement, classList) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(classList.inputErrorClass);
    errorElement.classList.remove(classList.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, classList) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, classList);
    } else {
        hideInputError(formElement, inputElement, classList);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement, classList) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(classList.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(classList.inactiveButtonClass);
        buttonElement.disabled = false;
    }

}

function setEventListeners(formElement, classList) {
    const inputList = Array.from(formElement.querySelectorAll(classList.inputSelector));
    const buttonElement = formElement.querySelector(classList.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, classList);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, classList);
            toggleButtonState(inputList, buttonElement, classList);
        })
    })
}

export function enableValidation(classList) {
    const formList = Array.from(document.querySelectorAll(classList.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, classList);
    })
}

export function clearValidation(formElement, validationConfig) {
    console.log('CLEAR')
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    })

    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
}