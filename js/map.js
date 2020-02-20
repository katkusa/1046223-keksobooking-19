'use strict';

(function () {

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersChildren = mapFilters.children;
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  var insertActiveMode = function () {

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.pin.renderAll();
    window.utils.removeAttribute(adFormFieldsets, 'disabled', 'disabled');
    window.utils.removeAttribute(mapFiltersChildren, 'disabled', 'disabled');
    window.form.roomsToCapacity();
    window.form.getMinPrice();
    window.form.getRequirementsTitle();
    window.form.getRequirementsImage();
    window.form.inputAddress(true);
    window.card.render();
    adForm.addEventListener('change', window.form.adFormChangeHandler, true);

    var allPins = mapPins.querySelectorAll('.map__pin');
    var activeCard = map.querySelector('.map__card');

    var removeActiveCard = function () {
      if (activeCard) {
        activeCard.classList.remove('hidden');
      }
    };

    var closeCardEvents = function () {
      var closeButton = activeCard.querySelector('.popup__close');

      var buttonHandler = function () {
        activeCard.classList.add('hidden');
        closeButton.removeEventListener('click', closeButtonClickHandler);
        closeButton.removeEventListener('keydown', closeButtonKeydownHandler);
        document.removeEventListener('keydown', documentKeydownHandler);
      };

      var closeButtonClickHandler = function () {
        buttonHandler();
      };

      var closeButtonKeydownHandler = function (evt) {
        if (evt.key === window.utils.keys.enter) {
          buttonHandler();
        }
      };

      var documentKeydownHandler = function (evt) {
        if (evt.key === window.utils.keys.escape) {
          buttonHandler();
        }
      };

      closeButton.addEventListener('click', closeButtonClickHandler);
      closeButton.addEventListener('keydown', closeButtonKeydownHandler);
      document.addEventListener('keydown', documentKeydownHandler);
    };

    var allPinsClickHandler = function (index) {
      return function () {
        removeActiveCard();
        window.card.fill(window.data.offers[index]);
        activeCard.classList.remove('hidden');
        closeCardEvents();
      };
    };

    var allPinsKeydownHandler = function (index) {
      return function (evt) {
        if (evt.key === window.utils.keys.enter) {
          removeActiveCard();
          window.card.fill(window.data.offers[index]);
          closeCardEvents();
        }
      };
    };

    for (var s = 0; s < window.data.offers.length; s++) {
      allPins[s + 1].addEventListener('click', allPinsClickHandler(s));
      allPins[s + 1].addEventListener('keydown', allPinsKeydownHandler(s));
    }
  };

  var mapPinMainMousedownHandler = function (evt) {
    if (evt.button === window.utils.keys.leftBtn) {
      insertActiveMode();
      mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    }
  };

  var mapPinMainKeydownHandler = function (evt) {
    if (evt.key === window.utils.keys.enter) {
      insertActiveMode();
      mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
})();
