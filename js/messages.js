'use strict';

(function () {
  var ErrorType = {
    ERROR_5000: 5000
  };

  var showErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: fixed; top: 0; left:0; right: 0; text-align: center; font-size: 20px; line-height: 30px; color: rgb(225, 168, 172); background-color: rgb(171, 36, 47); border-radius: 30px;';
    node.style.top = '250px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    var hideErrorMessage = function () {
      node.remove();
    };
    setTimeout(hideErrorMessage, ErrorType.ERROR_5000);
  };

  window.messages = {
    showError: showErrorMessage
  };
})();
