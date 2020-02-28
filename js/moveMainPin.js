'use strict';
(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_SIZE_MARK = 22;

  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');

  var limits = {
    top: 630,
    right: mapPins.clientWidth,
    bottom: 130,
    left: mapPins.clientLeft,
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinate = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoordinate.x - moveEvt.clientX,
        y: startCoordinate.y - moveEvt.clientY
      };

      startCoordinate = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCoordinate = {
        x: mainPin.offsetLeft - shift.x + MAIN_PIN_SIZE / 2,
        y: mainPin.offsetTop - shift.y + MAIN_PIN_SIZE + MAIN_PIN_SIZE_MARK,
      };


      if (pinCoordinate.x >= limits.left && pinCoordinate.x <= limits.right) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (pinCoordinate.y >= limits.bottom && pinCoordinate.y <= limits.top) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      window.form.inputAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
