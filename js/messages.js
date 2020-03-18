'use strict';

(function () {
  var showErrorMessage = function () {
    var errorMessageTemplate = document.querySelector('#error').content;
    var errorMessage = errorMessageTemplate.querySelector('.error');
    var errorMessageCloned = errorMessage.cloneNode(true);
    var closeButton = errorMessageCloned.querySelector('.error__button');
    var main = document.querySelector('main');

    main.appendChild(errorMessageCloned);

    var clickHandler = function () {
      errorMessageCloned.remove();
      closeButton.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('click', clickHandler);
    };

    var keydownHandler = function (evt) {
      if (evt.key === window.utils.keys.esc) {
        clickHandler();
      }
    };

    closeButton.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', clickHandler);
  };

  var showSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content;
    var successMessage = successMessageTemplate.querySelector('.success');
    var successMessageCloned = successMessage.cloneNode(true);

    var clickHandler = function () {
      successMessageCloned.remove();
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('click', clickHandler);
    };

    var keydownHandler = function (evt) {
      if (evt.key === window.utils.keys.esc) {
        clickHandler();
      }
    };

    document.body.appendChild(successMessageCloned);
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', clickHandler);
  };

  window.messages = {
    showError: showErrorMessage,
    showSuccess: showSuccessMessage
  };
})();
