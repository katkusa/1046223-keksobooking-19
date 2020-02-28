'use strict';
(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_SIZE_MARK = 22;

  var fragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');

  var getPinCoordinate = function (isActive) {
    var pinCoords = {
      x: Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2),
      y: Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE),
    };

    if (isActive) {
      pinCoords.y += MAIN_PIN_SIZE_MARK;
    }

    return pinCoords;
  };

  var renderPin = function (pinData) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImgElement = pinElement.querySelector('img');

    pinElement.style.left = pinData.offer.location.x;
    pinElement.style.top = pinData.offer.location.y;
    pinImgElement.src = pinData.author.avatar;
    pinImgElement.alt = pinData.offer.title;

    fragment.appendChild(pinElement);
  };

  var renderAllPins = function () {

    for (var k = 0; k < window.data.totalAmountArray; k++) {
      renderPin(window.data.offers[k]);
    }

    mapPins.appendChild(fragment);
  };


  window.pin = {
    render: renderAllPins,
    getCoordinate: getPinCoordinate
  };
})();
