'use strict';
(function () {
  var TOTAL_AMOUNT_ARRAY = 5;

  var offersArray = [];

  var loadHandler = function (data) {
    for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
      offersArray.push(data[i]);
    }
    window.map.insertActiveMode();
  };

  window.data = {
    offers: offersArray,
    loadHandler: loadHandler
  };
})();
