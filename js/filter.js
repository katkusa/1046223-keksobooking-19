'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var housingType = mapFiltersContainer.querySelector('#housing-type');
  var filterOffers = [];

  var housingTypeFilter = function () {
    filterOffers.length = 0;
    window.pin.delete();
    if (housingType.value === 'any') {
      window.data.offers.forEach(function (it) {
        filterOffers.push(it);
      });
    } else {
      window.data.offers.forEach(function (it) {
        if (housingType.value === it.offer.type) {
          filterOffers.push(it);
        }
      });
    }
    window.pin.render();
  };

  var housingFilterChangeHandler = function () {
    housingTypeFilter();
    window.map.cardActivate();
    window.card.hide();
  };

  housingType.addEventListener('change', housingFilterChangeHandler);

  var removeFilters = function () {
    housingType.value = 'any';
  };

  window.filter = {
    offers: filterOffers,
    housingType: housingTypeFilter,
    remove: removeFilters,
  };
})();
