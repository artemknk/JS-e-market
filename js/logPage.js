const form = document.querySelector('form');
const loginMessage = document.querySelector('.login__message');

/**
 * Validates form input and updates error messages
 * @param {HTMLInputElement} input - Input element to validate
 * @param {HTMLButtonElement} submit - Submit button element
 * @param {NodeList} inputs - All input elements in the form
 */
function validation(input, submit, inputs) {
  const errorMessage = input.nextElementSibling;
  
  if (input.validity.valueMissing) {
    errorMessage.textContent = 'Это обязательное поле';
  } else if (input.validity.patternMismatch) {
    errorMessage.textContent = errorMessage.getAttribute('data-error-pattern');
  } else if (input.validity.tooShort) {
    errorMessage.textContent = errorMessage.getAttribute('data-error-length');
  } else {
    errorMessage.textContent = '';
  }

  submit.disabled = ![...inputs].every((input) => input.validity.valid);
}

/**
 * Enables validation for all form inputs
 * @param {string} inputSelector - CSS selector for inputs
 * @param {string} submitSelector - CSS selector for submit button
 */
function enableValidation(inputSelector, submitSelector) {
  const inputs = document.querySelectorAll(inputSelector);
  const submit = document.querySelector(submitSelector);
  
  inputs.forEach((input) => {
    input.addEventListener('input', () => validation(input, submit, inputs));
  });
}

/**
 * Handles form submission and user authentication
 * @param {Event} event - Form submit event
 */
async function submitForm(event) {
  try {
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.message) {
      loginMessage.textContent = 'Error: ' + data.message;
      throw new Error(data.message);
    }
    
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
  } catch (error) {
    loginMessage.textContent = 'Error: ' + error.message;
  }
}

// Initialize form validation and submit handler
form.addEventListener('submit', submitForm);
enableValidation('.form__input', '.form__submit');