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
  'Крайне удачное месторасположения, много парков, нет автотрассы рядом и дети не шумят',
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
var pinSize = {
  WIDTH: 50,
  HEIGHT: 70
};
var avatarCounter = {
  MIN: 1,
  MAX: 8
};
var coordinateY = {
  MIN: 130,
  MAX: 630
};
var addressCounter = {
  MAX1: 300,
  MAX2: 1111
};
var priceCounter = {
  MIN: 5000,
  MAX: 100000
};
var roomsCounter = {
  MIN: 1,
  MAX: 5
};
var guestsCounter = {
  MIN: 1,
  MAX: 5
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

var selectRooms = function (rooms) {
  var str = '';
  switch (rooms) {
    case 1:
      str = '1 комната';
      break;
    default:
      str = rooms + ' комнаты';
  }

  return str;
};

var selectGuest = function (guests) {
  var str = '';
  switch (guests) {
    case 0:
      break;
    case 1:
      str = ' для 1 гостя';
      break;
    default:
      str = ' для ' + guests + ' гостей';
  }

  return str;
};

var renderFeatures = function (element, features) {
  element.innerHTML = '';

  for (var i = 0; i < features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + features[i]);
    element.appendChild(featureItem);
  }
};

var renderPhotos = function (element, photos) {
  var photoItemTemplate = element.querySelector('img');
  element.innerHTML = '';

  for (var i = 0; i < photos.length; i++) {
    var photoItem = photoItemTemplate.cloneNode(true);
    photoItem.src = photos[i];
    element.appendChild(photoItem);
  }
};

var getOffer = function () {

  return {
    author: {
      avatar: AVATAR_IMG + getRandomNumber(avatarCounter.MIN, avatarCounter.MAX) + AVATAR_EXTENSION,
    },
    offer: {
      title: APARTMENTS_TITLE[getRandomNumber(APARTMENTS_TITLE.length)],
      address: getRandomNumber(0, addressCounter.MAX1) + ', ' + getRandomNumber(0, addressCounter.MAX2),
      price: getRandomNumber(priceCounter.MIN, priceCounter.MAX),
      type: apartmentsType[getRandomElement(APARTMENTS_TYPE)],
      rooms: getRandomNumber(roomsCounter.MIN, roomsCounter.MAX),
      guests: getRandomNumber(guestsCounter.MIN, guestsCounter.MAX),
      checkin: getRandomElement(APARTMENTS_CHECKIN),
      checkout: getRandomElement(APARTMENTS_CHECKOUT),
      features: getRandomArray(APARTMENTS_FEATURES),
      description: getRandomElement(APARTMENTS_DESCRIPTION),
      photos: getRandomArray(OFFER_PHOTOS),
      location: {
        x: getRandomNumber(0, MAP_WIDTH) - pinSize.WIDTH / 2 + 'px',
        y: getRandomNumber(coordinateY.MIN, coordinateY.MAX) - pinSize.HEIGHT + 'px'
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

  cardElement.querySelector('.popup__title').textContent = pinData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pinData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pinData.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = pinData.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = selectRooms(pinData.offer.rooms) + selectGuest(pinData.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  renderFeatures(cardFeatures, pinData.offer.features);
  cardElement.querySelector('.popup__description').textContent = pinData.offer.description;
  cardElement.querySelector('.popup__avatar').src = pinData.author.avatar;
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
