const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const signUp = document.getElementById('sign-up');
const formSection = document.querySelector('.form-section');
const divX = document.querySelector('.x');
const span = document.getElementById('year');

const currentYear = new Date().getFullYear();
year.innerText = currentYear;

const inputArray = [username, email, password, password2];

signUp.addEventListener('click', () => {
  formSection.classList.add('show-form');
});

divX.addEventListener('click', () => {
  formSection.classList.remove('show-form');
});

function getInputName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  input.parentElement.classList.add('error');
  input.parentElement.querySelector('small').innerText = message;
}

function removeError(input) {
  input.parentElement.classList.remove('error');
}

function checkEmptyInput(inputArr) {
  for (input of inputArr) {
    if (input.value.trim() === '') {
      showError(input, 'This field is required.');
    } else {
      removeError(input);
    }
  }
}

function checkEmail() {
  const re = /\S+@\S+\.\S+/;

  if (re.test(email.value)) {
    removeError(email);
  } else {
    showError(email, 'That is not a valid email address.');
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getInputName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getInputName(input)} cannot be more than ${max} characters.`
    );
  } else {
    removeError(input);
  }
}

function confirmPassword() {
  if (password.value === password2.value) {
    removeError(password2);
  } else {
    showError(password2, 'Passwords do not match.');
  }
}

function confirmPasswordAsTyping() {
  if (password.value.slice(0, password2.value.length) === password2.value) {
    removeError(password2);
  } else {
    showError(password2, 'Passwords do not match.');
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkEmptyInput(inputArray);
  checkEmail();
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  confirmPassword();
});

username.addEventListener('blur', () => {
  checkLength(username, 3, 15);
});
email.addEventListener('blur', () => {
  checkEmail();
});
password.addEventListener('blur', () => {
  checkLength(password, 6, 25);
});

password2.addEventListener('blur', () => {
  confirmPassword();
});

password2.addEventListener('keyup', () => {
  confirmPasswordAsTyping();
});
