'use strict';
(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var fragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var renderPin = function (pinData) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImgElement = pinElement.querySelector('img');

    pinElement.style.left = pinData.location.x - PinSize.WIDTH / 2 + 'px';
    pinElement.style.top = pinData.location.y - PinSize.HEIGHT + 'px';
    pinImgElement.src = pinData.author.avatar;
    pinImgElement.alt = pinData.offer.title;

    fragment.appendChild(pinElement);
  };

  var renderAllPins = function () {
    for (var k = 0; k < window.data.offers.length; k++) {
      renderPin(window.data.offers[k]);
    }

    mapPins.appendChild(fragment);
  };

  var deleteAllPins = function () {
    var allPins = mapPins.querySelectorAll('.map__pin');
    for (var k = 1; k < allPins.length; k++) {
      allPins[k].remove();
    }
  };


  window.pin = {
    render: renderAllPins,
    delete: deleteAllPins
  };
})();
