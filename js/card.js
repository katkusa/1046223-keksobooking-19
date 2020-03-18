'use strict';
(function () {
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

  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();

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
    var cardPhoto = cardPhotos.querySelectorAll('.popup__photo');

    cardPhoto[0].style = 'display: none';

    for (var k = 1; k < cardPhoto.length; k++) {
      cardPhotos.removeChild(cardPhoto[k]);
    }

    for (var j = 0; j < photos.length; j++) {
      var cardPhotoCloned = cardPhoto[0].cloneNode(1);
      cardPhotos.appendChild(cardPhotoCloned);
      cardPhotoCloned.style = '';
      cardPhotoCloned.src = photos[j];
    }
  };

  var fillCard = function (pinData) {
    var cardItem = map.querySelector('.map__card');

    cardItem.querySelector(PopupClasses.TITLE).textContent = pinData.offer.title;
    cardItem.querySelector(PopupClasses.TEXT_ADDRESS).textContent = pinData.offer.address;
    cardItem.querySelector(PopupClasses.TEXT_PRICE).textContent = pinData.offer.price + ' ₽/ночь';
    cardItem.querySelector(PopupClasses.TYPE).textContent = pinData.offer.type;
    cardItem.querySelector(PopupClasses.TEXT_CAPACITY).textContent = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
    cardItem.querySelector(PopupClasses.TEXT_TIME).textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
    renderFeatures(cardItem, pinData.offer.features);
    cardItem.querySelector(PopupClasses.DESCRIPTION).textContent = pinData.offer.description;
    cardItem.querySelector(PopupClasses.AVATAR).src = pinData.author.avatar;
    renderPhotos(cardItem, pinData.offer.photos);

  };

  var renderCard = function () {
    var cardCloned = mapCardTemplate.cloneNode(true);
    cardCloned.classList.add('hidden');
    fragment.appendChild(cardCloned);
    map.insertBefore(fragment, mapFiltersContainer);
  };

  var closeCardEvents = function () {
    var activeCard = map.querySelector('.map__card');
    var closeButton = activeCard.querySelector('.popup__close');

    var clickHandler = function () {
      activeCard.classList.add('hidden');
      closeButton.removeEventListener('click', clickHandler);
      closeButton.removeEventListener('keydown', KeydownHandler);
      document.removeEventListener('keydown', KeydownHandler);
    };

    var KeydownHandler = function (evt) {
      if (evt.key === window.utils.keys.enter || evt.key === window.utils.keys.escape) {
        clickHandler();
      }
    };

    closeButton.addEventListener('click', clickHandler);
    closeButton.addEventListener('keydown', KeydownHandler);
    document.addEventListener('keydown', KeydownHandler);
  };

  var removeActiveCard = function () {
    var activeCard = map.querySelector('.map__card');
    if (activeCard) {
      activeCard.classList.remove('hidden');
    }
  };

  var hideCard = function () {
    var activeCard = map.querySelector('.map__card');
    activeCard.classList.add('hidden');
  };

  window.card = {
    render: renderCard,
    fill: fillCard,
    closeEvents: closeCardEvents,
    removeActive: removeActiveCard,
    hide: hideCard
  };
})();
