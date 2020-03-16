'use strict';
(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var ROOMS_CAPACITY = {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [0]
  };
  var HouseTypePrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var priceInput = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var formTitle = adForm.querySelector('#title');
  var formAvatar = adForm.querySelector('#avatar');
  var formImages = adForm.querySelector('#images');
  var resetBtn = adForm.querySelector('.ad-form__reset');
  var description = adForm.querySelector('#description');
  var features = adForm.querySelectorAll('.feature__checkbox');

  var inputAddressCoordinates = function (isActive) {
    var x = window.mainPin.getCoordinate(isActive).x;
    var y = window.mainPin.getCoordinate(isActive).y;
    addressInput.value = x + ', ' + y;
  };

  inputAddressCoordinates();

  var roomsToCapacity = function () {
    window.utils.getAttribute.set(capacityOptions, 'disabled', 'disabled');
    var allowCapacity = ROOMS_CAPACITY[roomNumber.value];
    for (var i = 0; i < allowCapacity.length; i++) {
      var element = capacity.querySelector('option[value=\"' + allowCapacity[i] + '\"]');
      element.removeAttribute('disabled', 'disabled');
      element.selected = true;
    }
  };

  roomsToCapacity();

  var getMinPrice = function () {
    priceInput.setAttribute('min', HouseTypePrice[type.value.toUpperCase()]);
    priceInput.setAttribute('placeholder', HouseTypePrice[type.value.toUpperCase()]);
    priceInput.setAttribute('max', MAX_PRICE);
  };

  var timeinToTimeout = function () {
    timeout.value = timein.value;
  };

  var timeoutToTimein = function () {
    timein.value = timeout.value;
  };

  getMinPrice();

  var getRequirementsTitle = function () {
    formTitle.setAttribute('minlength', MIN_TITLE_LENGTH);
    formTitle.setAttribute('maxlength', MAX_TITLE_LENGTH);
    formTitle.setAttribute('required', true);
  };

  var getRequirementsImage = function () {
    formAvatar.setAttribute('accept', 'image/png, image/jpeg');
    formImages.setAttribute('accept', 'image/png, image/jpeg');
  };

  var adFormChangeHandler = function (evt) {
    switch (evt.target) {
      case roomNumber:
        roomsToCapacity();
        break;
      case type:
        getMinPrice();
        break;
      case timein:
        timeinToTimeout();
        break;
      case timeout:
        timeoutToTimein();
        break;
      case formTitle:
        getRequirementsTitle();
        break;
      case formImages:
        getRequirementsImage();
        break;
      case formAvatar:
        getRequirementsImage();
        break;
    }
  };

  var resetForm = function () {
    inputAddressCoordinates();
    formTitle.value = '';
    type.value = 'flat';
    getMinPrice();
    priceInput.value = '';
    roomNumber.value = '1';
    roomsToCapacity();
    description.value = '';

    for (var i = 0; i < features.length; i++) {
      features[i].checked = false;
    }

    timein.value = '12:00';
    timeinToTimeout();
  };

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  var succesHandler = function () {
    window.map.removeActiveMode();
    window.messages.showSuccess();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.push(new FormData(adForm), succesHandler, window.messages.showError);
    evt.preventDefault();
  });

  window.form = {
    inputAddress: inputAddressCoordinates,
    adFormChangeHandler: adFormChangeHandler,
    resetForm: resetForm
  };
})();
