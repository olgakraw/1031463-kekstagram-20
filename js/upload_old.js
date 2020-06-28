'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagra';
  var StatusCode = {
    OK: 200
  };


  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
