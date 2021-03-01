let formLogin = document.querySelector('.login-form');

let inputEmail = document.querySelector('#email');
let inputPassword = document.querySelector('#password');

let notifyEmail = document.querySelector('.input__email');
let notifyPassword = document.querySelector('.input__password');

let btnSubmit = document.querySelector('.btn-login');

/**
 * Check when input is empty
 *  return true if empty
 *
 * @param {string} input
 * @return {boolean}
 */
function isEmpty(input) {
  return !input.length;
}

/**
 * Check have space on input
 *  return true if have space
 *
 * @param {string} input
 * @return {boolean}
 */
function isSpace(input) {
  return input !== input.trim();
}

/**
 * Check type email
 * return true when valid type email
 *
 * @param {string} email
 * @return {boolean}
 */
function isEmail(email) {
  let emailRegex = new RegExp(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
  );
  return emailRegex.test(email);
}

/**
 * Check when input valid length
 * return true if invalid
 *
 * @param {string} input
 * @param {'email'|'password'} type
 * @return {boolean}
 */
function invalidLength(input, type) {
  if (type === 'email') return input.length <= 3 ? true : false;
  else return input.length <= 6 ? true : false;
}

/**
 *  Send email, password and validate
 *  return true when login success
 *
 * @param {string} email
 * @param {string} password
 * @return {boolean}
 */
function isLogin(email, password) {
  return email === 'admin@gmail.com' && password === 'admin';
}

/**
 * Render error to HTML
 *
 * @param {string} input
 * @param {'email' | 'password'} type
 */
function renderError(input, type) {
  let renderMessage = type === 'email' ? notifyEmail : notifyPassword;
  renderMessage.setAttribute('data-error', input);
}

function clearError() {
  [notifyEmail, notifyPassword].forEach((item) =>
    item.setAttribute('data-error', '')
  );
}

function checkingEmail(email) {
  if (isEmpty(email)) {
    renderError('Email cannot is empty', 'email');
    return false;
  }

  if (isSpace(email)) {
    renderError('Email cannot have spaces', 'email');
    return false;
  }

  if (invalidLength(email, 'email')) {
    renderError('Email required more than 3 characters', 'email');
    return false;
  }

  if (isEmail(email)) {
    renderError('Please enter valid email address', 'email');
    return false;
  }

  return true;
}

function checkingPassword(password) {
  if (isEmpty(password)) {
    renderError('Password cannot is empty', 'password');
    return false;
  }
  return true;
}

inputEmail.addEventListener('input', function () {
  clearError();
  checkingEmail(inputEmail.value);
});

inputPassword.addEventListener('input', function () {
  clearError();
  checkingPassword(inputPassword.value);
});

btnSubmit.addEventListener('click', function () {
  let test =
    checkingEmail(inputEmail.value) && checkingPassword(inputPassword.value);
  if (test) {
    if (!isLogin(inputEmail.value, inputPassword.value)) {
      renderError('Invalid Email or Password', 'email');
      return false;
    }
    formLogin.submit();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.which == 13 || event.keyCode == 13) btnSubmit.click();
});
