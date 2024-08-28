const form = document.querySelector('form');
const loginMessage = document.querySelector('.login__message');

function validation(input, submit, inputs) {
  const errorMassage = input.nextElementSibling;
  if (input.validity.valueMissing) {
    errorMassage.textContent = 'Это обязательное поле';
  } else if (input.validity.patternMismatch) {
    errorMassage.textContent = errorMassage.getAttribute('data-error-pattern');
  } else if(input.validity.tooShort) {
    errorMassage.textContent = errorMassage.getAttribute('data-error-length');
  } else {
    errorMassage.textContent = '';
  }

  submit.disabled = ![...inputs].every((input) => input.validity.valid);

  
}
function enableValidation (inputSelector, submitSelector) {
  const inputs = document.querySelectorAll(inputSelector);
  const submit = document.querySelector(submitSelector);
  inputs.forEach((input) => input.addEventListener('input', () => validation(input, submit, inputs)));
}

async function submitForm(event) {
  try{
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if(data.message){
      loginMessage.textContent = 'Error: ' + data.message;
      throw new Error(data.message)
    }
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
  
  }catch(error){
    loginMessage.textContent = 'Error: ' + error.message;
  }
}

form.addEventListener('submit', submitForm);

enableValidation('.form__input', '.form__submit');
