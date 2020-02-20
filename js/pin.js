'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

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
    renderAll: renderAllPins
  };
})();
