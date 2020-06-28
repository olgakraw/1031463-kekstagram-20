'use strict';

(function () {

  var hashtagInput = document.querySelector('.text__hashtags');
  var re = /^#[a-zA-Zа-яА-я0-9]*$/;

  hashtagInput.addEventListener('input', function () {
    var hashtagSplit = hashtagInput.value.split(' ');

    hashtagInput.setCustomValidity('');

    var isHashtagInvalid = hashtagSplit.some(function (element) {
      return !re.test(element);
    });

    if (isHashtagInvalid === true) {
      hashtagInput.setCustomValidity('Неправильный формат хэштега');
    }

    if (hashtagSplit.length > 5) {
      hashtagInput.setCustomValidity('Не больше пяти хэштегов!');
    }
  });
})();
