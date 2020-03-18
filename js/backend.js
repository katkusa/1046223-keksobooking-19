'use strict';
(function () {
  var CodeStatus = {
    OK: 200
  };
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    PUSH: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT = 10000;
  var RESPONSE_TYPE = 'json';
  var ERROR_TEXT = 'Произошла ошибка соединения с сервером';
  var TIMEOUT_TEXT = 'Запрос не успел выполнится за ';

  var onServerLoad = function (xhr, onError, onSuccess) {
    return function () {
      if (xhr.status === CodeStatus.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
  };
  var onServerError = function (onError) {
    return function () {
      onError(ERROR_TEXT);
    };
  };
  var onServerTimeout = function (xhr, onError) {
    return function () {
      onError(TIMEOUT_TEXT + xhr.timeout + 'мс');
    };
  };

  var load = function (onError, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', onServerLoad(xhr, onError, onSuccess));
    xhr.addEventListener('error', onServerError(onError));
    xhr.addEventListener('timeout', onServerTimeout(xhr, onError));

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', onSuccess);
    xhr.addEventListener('error', onError);

    xhr.open('POST', Url.PUSH);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
