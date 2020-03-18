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
    window.filter.housingType();
    window.utils.getAttribute.remove(adFormFieldsets, 'disabled', 'disabled');
    window.utils.getAttribute.remove(mapFiltersChildren, 'disabled', 'disabled');
    window.form.inputAddress(true);
    window.card.render();
    adForm.addEventListener('change', window.form.adFormChangeHandler, true);
    cardActivate();
  };

  var cardActivate = function () {
    var allPins = mapPins.querySelectorAll('.map__pin');
    var activeCard = map.querySelector('.map__card');

    window.card.closeEvents();

    var allPinsClickHandler = function (index) {
      return function () {
        window.card.removeActive();
        window.card.fill(window.filter.offers[index]);
        activeCard.classList.remove('hidden');
        window.card.closeEvents();
      };
    };

    var allPinsKeydownHandler = function (index) {
      return function (evt) {
        if (evt.key === window.utils.keys.enter) {
          window.card.removeActive();
          window.card.fill(window.filter.offers[index]);
          window.card.closeEvents();
        }
      };
    };

    for (var s = 0; s < window.filter.offers.length; s++) {
      allPins[s + 1].addEventListener('click', allPinsClickHandler(s));
      allPins[s + 1].addEventListener('keydown', allPinsKeydownHandler(s));
    }
  };

  var mapPinMainHandler = function (evt) {
    if (evt.button === window.utils.keys.leftBtn || evt.key === window.utils.keys.enter) {
      window.backend.load(window.messages.showError, window.data.loadHandler);
      mapPinMain.removeEventListener('mousedown', mapPinMainHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinMainHandler);
  mapPinMain.addEventListener('keydown', mapPinMainHandler);

  var removeActiveMode = function () {
    var card = map.querySelector('.map__card');

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    window.pin.delete();
    card.remove();
    window.mainPin.relocate();

    window.utils.getAttribute.set(adFormFieldsets, 'disabled', 'disabled');
    window.utils.getAttribute.set(mapFiltersChildren, 'disabled', 'disabled');
    window.form.reset();
    window.filter.remove();

    mapPinMain.addEventListener('mousedown', mapPinMainHandler);
    mapPinMain.addEventListener('keydown', mapPinMainHandler);
    window.messages.showSuccess();
  };

  window.map = {
    insertActiveMode: insertActiveMode,
    removeActiveMode: removeActiveMode,
    cardActivate: cardActivate
  };
})();
