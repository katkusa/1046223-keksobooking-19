'use strict';
(function () {
  var TOTAL_AMOUNT_ARRAY = 5;

  var offersArray = [];

  var loadHandler = function (data) {
    for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
      offersArray.push(data[i]);
    }
  };

  window.backend.load(window.messages.showError, loadHandler);

  window.data = {
    offers: offersArray
  };
})();
