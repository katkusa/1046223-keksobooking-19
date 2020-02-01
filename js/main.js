'use strict';

var mapElement = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');

var USER_AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];
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
var APARTMENTS_PHOTO = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var TOTAL_AMOUNT_ARRAY = 8;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;
var TOTAL_HEIGHT = MAX_COORDINATE_Y - MIN_COORDINATE_Y - mainPin.offsetHeight;
var TOTAL_WIDTH = mapElement.offsetWidth - mainPin.offsetWidth;

var mapListElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var getRandomPrices = function () {
  return Math.floor(Math.random() * 1000);
};

var getRandomRooms = function () {
  return Math.floor(Math.random() * 10);
};

var getRandomGuests = function () {
  return Math.floor(Math.random() * 10);
};

var getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomArray = function (array, max) {
  var arr = [];

  for (var i = 0; i < getRandom(max); i++) {
    arr[i] = array[i];
  }

  return arr;
};

var getRandomBookingsOffer = function () {
  var arr = [];

  for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
    var locationX = getRandom(TOTAL_WIDTH);
    var locationY = getRandom(TOTAL_HEIGHT) + MIN_COORDINATE_Y;

    var randomBooking = {
      author: {
        avatar: USER_AVATAR[i]
      },
      offer: {
        title: APARTMENTS_TITLE[getRandom(APARTMENTS_TITLE.length - 1)],
        address: locationX + ', ' + locationY,
        price: getRandomPrices(),
        type: APARTMENTS_TYPE[getRandom(APARTMENTS_TYPE.length - 1)],
        rooms: getRandomRooms(),
        guests: getRandomGuests(),
        checkin: APARTMENTS_CHECKIN[getRandom(APARTMENTS_CHECKIN.length - 1)],
        checkout: APARTMENTS_CHECKOUT[getRandom(APARTMENTS_CHECKOUT.length - 1)],
        features: getRandomArray(APARTMENTS_FEATURES, APARTMENTS_FEATURES.length - 1),
        description: APARTMENTS_DESCRIPTION[getRandom(APARTMENTS_DESCRIPTION.length - 1)],
        photos: getRandomArray(APARTMENTS_PHOTO, APARTMENTS_PHOTO.length),
        location: {
          x: locationX + 'px',
          y: locationY + 'px'
        }
      }
    };

    arr.push(randomBooking);
  }

  return arr;
};

var randomBookings = getRandomBookingsOffer();

var renderPin = function (pinData) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = pinData.offer.location.x;
  pinElement.style.top = pinData.offer.location.y;

  var pinImgElement = pinElement.querySelector('img');
  pinImgElement.src = pinData.author.avatar;
  pinImgElement.alt = pinData.offer.title;

  return pinElement;
};

for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
  fragment.appendChild(renderPin(randomBookings[i]));
}
mapListElement.appendChild(fragment);

mapElement.classList.remove('map--faded');
