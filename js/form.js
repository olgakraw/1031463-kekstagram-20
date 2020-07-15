'use strict';

(function () {

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  var re = /^#[a-zA-Zа-яА-я0-9]*$/;

  var doesHashtagRepeat = function (value) {
    return value > 1;
  };

  hashtagInput.addEventListener('input', function () {
    var hashtags = hashtagInput.value.split(' ');

    hashtagInput.setCustomValidity('');

    var isHashtagInvalid = hashtags.some(function (element) {
      return !re.test(element);
    });

    if (isHashtagInvalid === true) {
      hashtagInput.setCustomValidity('Неправильный формат хэштега!');
    }

    if (hashtags.length > 5) {
      hashtagInput.setCustomValidity('Не больше пяти хэштегов!');
    }

    var obj = {};

    hashtags.forEach(function (item) {
      item = item.toLowerCase();
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;

      var valuesArray = Object.values(obj);
      var valuesNewArray = valuesArray.filter(doesHashtagRepeat);

      if (valuesNewArray.length > 0) {
        hashtagInput.setCustomValidity('Хэштеги не должны повторяться!');
      }

    });

  });

  hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.onPopupEscPress);
  });
  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.onPopupEscPress);
  });

  commentInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.onPopupEscPress);
  });
  commentInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.onPopupEscPress);
  });
})();
