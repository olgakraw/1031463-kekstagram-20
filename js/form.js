'use strict';

(function () {

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  var re = /^#[a-zA-Zа-яА-я0-9]*$/;

  var isBiggerThanOne = function (value) {
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

    var hashtagsCount = {};

    hashtags.forEach(function (hashtag) {
      if (hashtag === '#') {
        hashtagInput.setCustomValidity('Хэштег не может состоять только из #!');
      }

      if (hashtag.length > 20) {
        hashtagInput.setCustomValidity('Максимальная длина хэштега - 20 символов!');
      }

      if (hashtag === '') {
        hashtagInput.setCustomValidity('');
      }

      hashtag = hashtag.toLowerCase();
      if (!hashtagsCount[hashtag]) {
        hashtagsCount[hashtag] = 0;
      }
      hashtagsCount[hashtag]++;

      var hashtagsNumbers = Object.values(hashtagsCount);
      var repeatedHashatagsNumbers = hashtagsNumbers.filter(isBiggerThanOne);

      if (repeatedHashatagsNumbers.length > 0) {
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
