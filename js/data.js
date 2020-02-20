'use strict';
(function () {
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
  var HouseType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец',
    HOUSE: 'Дом'
  };

  var offers = [];

  var getOffer = function () {

    return {
      author: {
        avatar: AVATAR_IMG + window.utils.getRandomNumber(AvatarCounter.MIN, AvatarCounter.MAX) + AVATAR_EXTENSION,
      },
      offer: {
        title: APARTMENTS_TITLE[window.utils.getRandomNumber(0, APARTMENTS_TITLE.length)],
        address: window.utils.getRandomNumber(0, AddressCounter.MAX1) + ', ' + window.utils.getRandomNumber(0, AddressCounter.MAX2),
        price: window.utils.getRandomNumber(PriceCounter.MIN, PriceCounter.MAX),
        type: HouseType[window.utils.getRandomElement(APARTMENTS_TYPE)],
        rooms: window.utils.getRandomNumber(RoomsCounter.MIN, RoomsCounter.MAX),
        guests: window.utils.getRandomNumber(GuestsCounter.MIN, GuestsCounter.MAX),
        checkin: window.utils.getRandomElement(APARTMENTS_CHECKIN),
        checkout: window.utils.getRandomElement(APARTMENTS_CHECKOUT),
        features: window.utils.getRandomArray(APARTMENTS_FEATURES),
        description: window.utils.getRandomElement(APARTMENTS_DESCRIPTION),
        photos: window.utils.getRandomArray(OFFER_PHOTOS),
        location: {
          x: window.utils.getRandomNumber(0, MAP_WIDTH) - PinSize.WIDTH / 2 + 'px',
          y: window.utils.getRandomNumber(CoordinateY.MIN, CoordinateY.MAX) - PinSize.HEIGHT + 'px'
        }
      }
    };
  };

  for (var i = 0; i < TOTAL_AMOUNT_ARRAY; i++) {
    offers.push(getOffer(i + 1));
  }

  window.data = {
    totalAmountArray: TOTAL_AMOUNT_ARRAY,
    offers: offers
  };
})();
