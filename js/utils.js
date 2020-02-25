'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_BUTTON = 0;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (arrayElements) {
    return arrayElements[Math.floor(Math.random() * arrayElements.length)];
  };

  var getRandomArray = function (array) {
    var newArrayLength = getRandomNumber(0, array.length);
    var subArray = [];
    for (var i = 0; i < newArrayLength; i++) {
      subArray.push(array[getRandomNumber(0, array.length)]);
    }

    return subArray;
  };

  var removeAttribute = function (obj, string, value) {
    for (var i = 0; i < obj.length; i++) {
      obj[i].removeAttribute(string, value);
    }
  };

  var setAttribute = function (obj, string, value) {
    for (var i = 0; i < obj.length; i++) {
      obj[i].setAttribute(string, value);
    }
  };

  window.utils = {
    getRandom: {
      number: getRandomNumber,
      element: getRandomElement,
      array: getRandomArray
    },
    getAttribute: {
      set: setAttribute,
      remove: removeAttribute
    },
    keys: {
      enter: ENTER_KEY,
      escape: ESC_KEY,
      leftBtn: LEFT_BUTTON
    }
  };
})();
