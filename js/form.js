'use strict';

(function () {

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  var re = /^#[a-zA-Zа-яА-я0-9]*$/;

  hashtagInput.addEventListener('input', function () {
    var hashtagSplit = hashtagInput.value.split(' ');

    hashtagInput.setCustomValidity('');

    var isHashtagInvalid = hashtagSplit.some(function (element) {
      return !re.test(element);
    });

    if (isHashtagInvalid === true) {
      hashtagInput.setCustomValidity('Неправильный формат хэштега!');
    }

    if (hashtagSplit.length > 5) {
      hashtagInput.setCustomValidity('Не больше пяти хэштегов!');
    }

    for (var i = 0; i < hashtagSplit.length; i++) {
      for (var j = i + 1; j < hashtagSplit.length; j++) {
        hashtagSplit[i] = hashtagSplit[i].toLowerCase();
        hashtagSplit[j] = hashtagSplit[j].toLowerCase();
        if (hashtagSplit[i] === hashtagSplit[j]) {
          hashtagInput.setCustomValidity('Хэштеги не должны повторяться!');
        }
      }
    }
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
