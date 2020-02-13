'use strict';

var APARTMENTS_TITLE = [
  'Роскошные апартаменты',
  'Квартира в самом центре',
  'Уютные небольшие апартаменты',
  'Необычный лофт',
  'Квартира с лучшим видом на город',
  'Чудесная комната',
  'Самый дешевый вариант размещения',
  'Лучший дом с тремя ванными комнатами'
];
var APARTMENTS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var APARTMENTS_CHECKIN = ['12:00', '13:00', '14:00'];
var APARTMENTS_CHECKOUT = ['12:00', '13:00', '14:00'];
var APARTMENTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTMENTS_DESCRIPTION = [
  'Есть все необходимое для жизни, много места, хорошие соседи и с кошками можно',
  'Крайне удачное месторасположене, много парков, нет автотрассы рядом и дети не шумят',
  'Очень мало места, цена высокая, но при этом есть кровать и даже уборная',
  'В вашем распоряжении две ванные комнаты, три ложии, кухня в 100 квадратов и две гардеробные',
  'Нет ничего лучше чем старая-добрая коммуналка!',
  'Вам доступна не только самая лучшая квартира в городе, но еще и спортзал, бассейн и детская развлекательная площадка',
  'Современный замок с вертолетной площадкой и полем для гольфа.',
  'Ничего лишнего - жилая комната, туалет и душ, а кухню можете оборудовать сами. За ваш счет разумеется!'
];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var AVATAR_IMG = 'img/avatars/user0';
var AVATAR_EXTENSION = '.png';
var TOTAL_AMOUNT_ARRAY = 8;
var MAP_WIDTH = 1200;
var PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};
var AvatarCounter = {
  MIN: 1,
  MAX: 8
};
var CoordinateY = {
  MIN: 130,
  MAX: 630
};
var AddressCounter = {
  MAX1: 300,
  MAX2: 1111
};
var PriceCounter = {
  MIN: 5000,
  MAX: 100000
};
var RoomsCounter = {
  MIN: 1,
  MAX: 5
};
var GuestsCounter = {
  MIN: 1,
  MAX: 5
};

var PopupClasses = {
  TITLE: '.popup__title',
  TEXT_ADDRESS: '.popup__text--address',
  TEXT_PRICE: '.popup__text--price',
  TYPE: '.popup__type',
  TEXT_CAPACITY: '.popup__text--capacity',
  TEXT_TIME: '.popup__text--time',
  AVATAR: '.popup__avatar',
  DESCRIPTION: '.popup__description'
};

var HouseType = {
  FLAT: 'Квартира',
  BUNGALO: 'Бунгало',
  PALACE: 'Дворец',
  HOUSE: 'Дом'
};
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var LEFT_BUTTON = 0;
var ROOMS_CAPACITY = {
  1: [1],
  2: [2, 1],
  3: [3, 2, 1],
  100: [0]
};
var MIN_PRICE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_SIZE_MARK = 22;

var offers = [];
var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var mapCardTemplate = document.querySelector('#card')
.content
.querySelector('.map__card');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = document.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersChildren = mapFilters.children;
var addressInput = adForm.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');
var priceInput = adForm.querySelector('#price');
var type = adForm.querySelector('#type');
var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');

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

var insertActiveMode = function () {

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderAllPins();
  removeAttribute(adFormFieldsets, 'disabled', 'disabled');
  removeAttribute(mapFiltersChildren, 'disabled', 'disabled');
  roomsToCapacity();
  getMinPrice();
  inputAddressCoordinates(true);
  renderCard(offers[i]);
  adForm.addEventListener('change', adFormChangeHandler, true);

  var allPins = mapPins.querySelectorAll('.map__pin');
  var activeCard = map.querySelector('.map__card');

  var removeActiveCard = function () {
    if (activeCard) {
      activeCard.classList.remove('hidden');
    }
  };

  var closeCardEvents = function () {
    var closeButton = activeCard.querySelector('.popup__close');

    var closeButtonClickHandler = function () {
      activeCard.classList.add('hidden');
      closeButton.removeEventListener('click', closeButtonClickHandler);
      closeButton.removeEventListener('keydown', closeButtonKeydownHandler);
      document.removeEventListener('keydown', documentKeydownHandler);
    };

    var closeButtonKeydownHandler = function (evt) {
      if (evt.key === ENTER_KEY) {
        activeCard.classList.add('hidden');
        closeButton.removeEventListener('click', closeButtonClickHandler);
        closeButton.removeEventListener('keydown', closeButtonKeydownHandler);
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    };

    var documentKeydownHandler = function (evt) {
      if (evt.key === ESC_KEY) {
        activeCard.classList.add('hidden');
        closeButton.removeEventListener('click', closeButtonClickHandler);
        closeButton.removeEventListener('keydown', closeButtonKeydownHandler);
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    };

    closeButton.addEventListener('click', closeButtonClickHandler);
    closeButton.addEventListener('keydown', closeButtonKeydownHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  var allPinsClickHandler = function (index) {
    return function () {
      removeActiveCard();
      fillCard(offers[index]);
      activeCard.classList.remove('hidden');
      closeCardEvents();
    };
  };

  var allPinsKeydownHandler = function (index) {
    return function (evt) {
      if (evt.key === ENTER_KEY) {
        removeActiveCard();
        fillCard(offers[index]);
        closeCardEvents();
      }
    };
  };

  for (var s = 0; s < offers.length; s++) {
    allPins[s + 1].addEventListener('click', allPinsClickHandler(s));
    allPins[s + 1].addEventListener('keydown', allPinsKeydownHandler(s));
  }
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

var inputAddressCoordinates = function (isActive) {
  var x = parseInt(mapPinMain.style.left.replace('px', ''), 10);
  var y = parseInt(mapPinMain.style.top.replace('px', ''), 10);
  var pinX = MAIN_PIN_SIZE;
  var pinY = MAIN_PIN_SIZE;
  var result;

  if (isActive) {
    pinY = MAIN_PIN_SIZE + MAIN_PIN_SIZE_MARK;
    result = addressInput.value = (x + pinX / 2) + ', ' + (y + pinY);
    return result;
  }

  result = addressInput.value = (x + pinX / 2) + ', ' + (y + pinY / 2);
  return result;
};

inputAddressCoordinates();

var roomsToCapacity = function () {
  setAttribute(capacityOptions, 'disabled', 'disabled');
  var allowCapacity = ROOMS_CAPACITY[roomNumber.value];
  for (var i = 0; i < allowCapacity.length; i++) {
    var element = capacity.querySelector('option[value=\"' + allowCapacity[i] + '\"]');
    element.removeAttribute('disabled', 'disabled');
    element.selected = true;
  }
};

roomsToCapacity();

var getMinPrice = function () {
  priceInput.setAttribute('min', MIN_PRICE[type.value]);
  priceInput.setAttribute('placeholder', MIN_PRICE[type.value]);
};

var timeinToTimeout = function () {
  timeout.value = timein.value;
};

var timeoutToTimein = function () {
  timein.value = timeout.value;
};

getMinPrice();

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
  }
};

var mapPinMainMousedownHandler = function (evt) {
  if (evt.button === LEFT_BUTTON) {
    insertActiveMode();
    mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
  }
};

var mapPinMainKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    insertActiveMode();
    mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
  }
};

var getOffer = function () {

  return {
    author: {
      avatar: AVATAR_IMG + getRandomNumber(AvatarCounter.MIN, AvatarCounter.MAX) + AVATAR_EXTENSION,
    },
    offer: {
      title: APARTMENTS_TITLE[getRandomNumber(0, APARTMENTS_TITLE.length)],
      address: getRandomNumber(0, AddressCounter.MAX1) + ', ' + getRandomNumber(0, AddressCounter.MAX2),
      price: getRandomNumber(PriceCounter.MIN, PriceCounter.MAX),
      type: HouseType[getRandomElement(APARTMENTS_TYPE)],
      rooms: getRandomNumber(RoomsCounter.MIN, RoomsCounter.MAX),
      guests: getRandomNumber(GuestsCounter.MIN, GuestsCounter.MAX),
      checkin: getRandomElement(APARTMENTS_CHECKIN),
      checkout: getRandomElement(APARTMENTS_CHECKOUT),
      features: getRandomArray(APARTMENTS_FEATURES),
      description: getRandomElement(APARTMENTS_DESCRIPTION),
      photos: getRandomArray(OFFER_PHOTOS),
      location: {
        x: getRandomNumber(0, MAP_WIDTH) - PinSize.WIDTH / 2 + 'px',
        y: getRandomNumber(CoordinateY.MIN, CoordinateY.MAX) - PinSize.HEIGHT + 'px'
      }
    }
  };
};

for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
  offers.push(getOffer(i + 1));
}

var renderPin = function (pinData) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImgElement = pinElement.querySelector('img');

  pinElement.style.left = pinData.offer.location.x;
  pinElement.style.top = pinData.offer.location.y;
  pinImgElement.src = pinData.author.avatar;
  pinImgElement.alt = pinData.offer.title;

  fragment.appendChild(pinElement);
};

/*
var renderFeatures = function (element, item) {
  element.innerHTML = '';

  item.forEach(function (features) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + features);
    element.appendChild(featureItem);
  });
};*/

var renderFeatures = function (element, features) {
  var featuresList = element.querySelector('.popup__features');
  var featuresItem = featuresList.querySelectorAll('.popup__feature');

  for (var l = 0; l < featuresItem.length; l++) {
    featuresItem[l].style.display = 'none';
    for (var j = 0; j < features.length; j++) {
      var availableFeatures = features[j];
      if (featuresItem[l].className.indexOf(availableFeatures) >= 0 && featuresItem[l].className.indexOf(availableFeatures) < 35) {
        featuresItem[l].style = '';
      }
    }
  }
};

var renderPhotos = function (element, photos) {
  var cardPhotos = element.querySelector('.popup__photos');
  var photoItemTemplate = cardPhotos.querySelector('img');
  var allPhotoItemTemplate = cardPhotos.querySelectorAll('img');

  for (var k = 0; k < photos.length; k++) {
    var photoItem = photoItemTemplate.cloneNode(true);
    photoItem.src = photos[k];
    cardPhotos.appendChild(photoItem);
  }
  allPhotoItemTemplate[0].remove();
};

var fillCard = function (pinData) {
  var cardElement = map.querySelector('.map__card');

  cardElement.querySelector(PopupClasses.TITLE).textContent = pinData.offer.title;
  cardElement.querySelector(PopupClasses.TEXT_ADDRESS).textContent = pinData.offer.address;
  cardElement.querySelector(PopupClasses.TEXT_PRICE).textContent = pinData.offer.price + ' ₽/ночь';
  cardElement.querySelector(PopupClasses.TYPE).textContent = pinData.offer.type;
  cardElement.querySelector(PopupClasses.TEXT_CAPACITY).textContent = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
  cardElement.querySelector(PopupClasses.TEXT_TIME).textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  renderFeatures(cardElement, pinData.offer.features);
  cardElement.querySelector(PopupClasses.DESCRIPTION).textContent = pinData.offer.description;
  cardElement.querySelector(PopupClasses.AVATAR).src = pinData.author.avatar;
  renderPhotos(cardElement, pinData.offer.photos);

};

var renderCard = function () {
  var cardCloned = mapCardTemplate.cloneNode(true);
  cardCloned.classList.add('hidden');
  fragment.appendChild(cardCloned);
  map.insertBefore(fragment, mapFiltersContainer);
};

var renderAllPins = function () {

  for (var k = 0; k < TOTAL_AMOUNT_ARRAY; k++) {
    renderPin(offers[k]);
  }

  mapPins.appendChild(fragment);
};

setAttribute(adFormFieldsets, 'disabled', 'disabled');
setAttribute(mapFiltersChildren, 'disabled', 'disabled');

mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
