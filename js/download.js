'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var filterMessage = document.querySelector('.img-filters');

  window.download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        filterMessage.classList.remove('img-filters--inactive');
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        filterMessage.classList.add('img-filters--inactive');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
