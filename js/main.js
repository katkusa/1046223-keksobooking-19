'use strict';

var APARTMENTS_TITLE = [
  'Роскошные апартаменты',
  'Квартира в самом центре',
  'Уютные небольшие апартаменты',
  'Необычный лофт',
  'Квартира с лучшим видом на город',
  'Чудесная комната',
  'Самый дешевый вариант размещения',
  'Лучший дом с ремя ванными комнатами'
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

var apartmentsType = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  palace: 'Дворец',
  house: 'Дом'
};
var mapElement = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var mapFilters = mapElement.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();

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
    subArray.push(array[i]);
  }

  return subArray;
};

var renderFeatures = function (element, item) {
  element.innerHTML = '';

  item.forEach(function (features) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + features);
    element.appendChild(featureItem);
  });
};

var renderPhotos = function (element, item) {
  var photoItemTemplate = element.querySelector('img');
  element.innerHTML = '';

  item.forEach(function (photos) {
    var photoItem = photoItemTemplate.cloneNode(true);
    photoItem.src = photos;
    element.appendChild(photoItem);
  });
};

var getOffer = function () {

  return {
    author: {
      avatar: AVATAR_IMG + getRandomNumber(AvatarCounter.MIN, AvatarCounter.MAX) + AVATAR_EXTENSION,
    },
    offer: {
      title: APARTMENTS_TITLE[getRandomNumber(APARTMENTS_TITLE.length)],
      address: getRandomNumber(0, AddressCounter.MAX1) + ', ' + getRandomNumber(0, AddressCounter.MAX2),
      price: getRandomNumber(PriceCounter.MIN, PriceCounter.MAX),
      type: apartmentsType[getRandomElement(APARTMENTS_TYPE)],
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

var getOffers = function () {
  var offers = [];

  for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
    offers.push(getOffer(i + 1));
  }

  return offers;
};

var renderPin = function (pinData) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImgElement = pinElement.querySelector('img');

  pinElement.style.left = pinData.offer.location.x;
  pinElement.style.top = pinData.offer.location.y;
  pinImgElement.src = pinData.author.avatar;
  pinImgElement.alt = pinData.offer.title;

  return pinElement;
};

var renderCard = function (pinData) {
  var cardElement = mapCardTemplate.cloneNode(true);
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardPhotos = cardElement.querySelector('.popup__photos');

  cardElement.querySelector(PopupClasses.TITLE).textContent = pinData.offer.title;
  cardElement.querySelector(PopupClasses.TEXT_ADDRESS).textContent = pinData.offer.address;
  cardElement.querySelector(PopupClasses.TEXT_PRICE).textContent = pinData.offer.price + ' ₽/ночь';
  cardElement.querySelector(PopupClasses.TYPE).textContent = pinData.offer.type;
  cardElement.querySelector(PopupClasses.TEXT_CAPACITY).textContent = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
  cardElement.querySelector(PopupClasses.TEXT_TIME).textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  renderFeatures(cardFeatures, pinData.offer.features);
  cardElement.querySelector(PopupClasses.DESCRIPTION).textContent = pinData.offer.description;
  cardElement.querySelector(PopupClasses.AVATAR).src = pinData.author.avatar;
  renderPhotos(cardPhotos, pinData.offer.photos);

  return cardElement;
};

var placeOffers = function (offers) {
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  return fragment;
};

var offers = getOffers();

mapElement.appendChild(placeOffers(offers));
mapElement.classList.remove('map--faded');
mapElement.insertBefore(fragment.appendChild(renderCard(offers[0])), mapFilters);
