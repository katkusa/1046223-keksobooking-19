'use strict';

var MAP_ELEMENT = document.querySelector('.map');
var MAIN_PIN = document.querySelector('.map__pin--main');
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
var TOTAL_AMOUNT_ARRAY = 8;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;
var TOTAL_HEIGHT = MAX_COORDINATE_Y - MIN_COORDINATE_Y - MAIN_PIN.offsetHeight;
var TOTAL_WIDTH = MAP_ELEMENT.offsetWidth - MAIN_PIN.offsetWidth;

var mapListElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

var getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getOffer = function (pinNumber) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + (pinNumber + 1) + '.png'
    },
    offer: {
      title: APARTMENTS_TITLE[getRandom(APARTMENTS_TITLE.length - 1)],
      address: getRandomNumber(0, 300) + ',' + getRandomNumber(0, 1009),
      price: getRandomNumber(200, 10000),
      type: APARTMENTS_TYPE[getRandom(APARTMENTS_TYPE.length - 1)],
      rooms: getRandomNumber(1, 15),
      guests: getRandomNumber(1, 10),
      checkin: APARTMENTS_CHECKIN[getRandom(APARTMENTS_CHECKIN.length - 1)],
      checkout: APARTMENTS_CHECKOUT[getRandom(APARTMENTS_CHECKOUT.length - 1)],
      features: getRandom(APARTMENTS_FEATURES, APARTMENTS_FEATURES.length - 1),
      description: APARTMENTS_DESCRIPTION[getRandom(APARTMENTS_DESCRIPTION.length - 1)],
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + (pinNumber + 1) + '.jpg',
      location: {
        x: getRandom(TOTAL_WIDTH) + 'px',
        y: getRandom(TOTAL_HEIGHT) + MIN_COORDINATE_Y + 'px'
      }
    }
  };

  return pin;
};

var getOffers = function () {
  var offers = [];
  for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
    offers.push(getOffer(i));
  }

  return offers;
};

var pins = getOffers();

var renderPin = function (pinData) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImgElement = pinElement.querySelector('img');

  pinElement.style.left = pinData.offer.location.x;
  pinElement.style.top = pinData.offer.location.y;
  pinImgElement.src = pinData.author.avatar;
  pinImgElement.alt = pinData.offer.title;

  return pinElement;
};

for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapListElement.appendChild(fragment);

MAP_ELEMENT.classList.remove('map--faded');
