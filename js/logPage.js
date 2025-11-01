const form = document.querySelector('form');
const loginMessage = document.querySelector('.login__message');

/**
 * Проверяет введенные данные в поле формы и обновляет сообщения об ошибках
 * Проверяет заполненность, формат и длину введенных данных
 * @param {HTMLInputElement} input - Поле ввода для проверки
 * @param {HTMLButtonElement} submit - Кнопка отправки формы
 * @param {NodeList} inputs - Все поля ввода в форме
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
 * Включает проверку данных для всех полей формы
 * Добавляет обработчик события на каждое поле, который проверяет данные при вводе
 * @param {string} inputSelector - CSS селектор для полей ввода
 * @param {string} submitSelector - CSS селектор для кнопки отправки
 */
function enableValidation(inputSelector, submitSelector) {
  const inputs = document.querySelectorAll(inputSelector);
  const submit = document.querySelector(submitSelector);
  
  inputs.forEach((input) => {
    input.addEventListener('input', () => validation(input, submit, inputs));
  });
}

/**
 * Обрабатывает отправку формы и аутентификацию пользователя
 * Отправляет данные на сервер, сохраняет токен авторизации и перенаправляет на главную страницу
 * @param {Event} event - Событие отправки формы
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

// Инициализация: добавление проверки формы и обработчика отправки
form.addEventListener('submit', submitForm);
enableValidation('.form__input', '.form__submit');