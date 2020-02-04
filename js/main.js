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
var TOTAL_AMOUNT_ARRAY = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_WIDTH = 1200;
var coordinateY = {
  MIN: 130,
  MAX: 630
};
var addressCounter = {
  MAX1: 300,
  MAX2: 1111
};
var priceCounter = {
  MIN: 200,
  MAX: 10000
};
var roomsCounter = {
  MIN: 1,
  MAX: 15
};
var guestsCounter = {
  MIN: 1,
  MAX: 10
};

var mapElement = document.querySelector('.map');
var mapListElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getOffer = function (pinNumber) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (pinNumber + 1) + '.png'
    },
    offer: {
      title: APARTMENTS_TITLE[getRandomNumber(APARTMENTS_TITLE.length)],
      address: getRandomNumber(0, addressCounter.MAX1) + ',' + getRandomNumber(0, addressCounter.MAX2),
      price: getRandomNumber(priceCounter.MIN, priceCounter.MAX),
      type: APARTMENTS_TYPE[getRandomNumber(APARTMENTS_TYPE.length)],
      rooms: getRandomNumber(roomsCounter.MIN, roomsCounter.MAX),
      guests: getRandomNumber(guestsCounter.MIN, guestsCounter.MAX),
      checkin: APARTMENTS_CHECKIN[getRandomNumber(APARTMENTS_CHECKIN.length)],
      checkout: APARTMENTS_CHECKOUT[getRandomNumber(APARTMENTS_CHECKOUT.length)],
      features: getRandomNumber(APARTMENTS_FEATURES, APARTMENTS_FEATURES.length),
      description: APARTMENTS_DESCRIPTION[getRandomNumber(APARTMENTS_DESCRIPTION.length)],
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + (pinNumber + 1) + '.jpg',
      location: {
        x: getRandomNumber(0, MAP_WIDTH) - PIN_WIDTH / 2 + 'px',
        y: getRandomNumber(coordinateY.MIN, coordinateY.MAX) - PIN_HEIGHT + 'px'
      }
    }
  };
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

mapElement.classList.remove('map--faded');
