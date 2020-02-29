'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var MapConfig = {
    TOP: 630,
    RIGHT: mapPins.clientWidth,
    BOTTOM: 130,
    LEFT: mapPins.clientLeft,
  };
  var startCoordinate;
  var dragged = false;

  var getPinCoordinate = function (isActive) {
    var pinCoords = {
      x: Math.floor(mainPin.offsetLeft + window.consts.mainPinSize / 2),
      y: Math.floor(mainPin.offsetTop + window.consts.mainPinSize),
    };

    if (isActive) {
      pinCoords.y += window.consts.mainPinSizeMark;
    }

    return pinCoords;
  };

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
      x: mainPin.offsetLeft - shift.x + window.consts.mainPinSize / 2,
      y: mainPin.offsetTop - shift.y + window.consts.mainPinSize + window.consts.mainPinSizeMark,
    };


    if (pinCoordinate.x >= MapConfig.LEFT && pinCoordinate.x <= MapConfig.RIGHT) {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }

    if (pinCoordinate.y >= MapConfig.BOTTOM && pinCoordinate.y <= MapConfig.TOP) {
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

  var onMouseDown = function (evt) {
    evt.preventDefault();

    startCoordinate = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var addMainPinListener = function () {
    mainPin.addEventListener('mousedown', onMouseDown);
  };

  addMainPinListener();

  window.mainPin = {
    getCoordinate: getPinCoordinate
  };
})();
