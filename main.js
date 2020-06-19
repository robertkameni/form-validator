const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input Error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = formControl.querySelector('small');

    // here we change the innertext of the small tag with the error message
    small.innerText = message;
}

// Function shows Success Outline
function showsuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Function checks if email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (re.test(input.value)) {
        showsuccess(input)
    } else {
        showError(input, 'email is not valid')
    }
}

// Function Check required fields
function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is Required`)
        }
        else {
            showsuccess(input)
        }
    })
}


// Function Check the Input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showsuccess(input)
    }
}

// Function checks if the password macht
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'passwords do not match')
    }
}


// Function Get the FieldName
function getFieldName(input) {
    // gives the input id back and with the first letter uppercase
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Add Event Listener
form.addEventListener('submit', (e) => {
    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 21)
    checkLength(password, 7, 25)
    checkEmail(email)
    checkPasswordsMatch(password, password2)

    e.preventDefault()
})
