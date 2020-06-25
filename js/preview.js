'use strict';

(function () {
  // var effectPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectValue = document.querySelector('.effect-level__value');
  var imagePreview = document.querySelector('.img-upload__preview');
  var imageUploadEffects = document.querySelector('.img-upload__effects');
  var LINE_WIDTH = 453;

  var EFFECTS = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var filterChangeHandler = function (evt) {

    EFFECTS.forEach(function (item) {
      if (imagePreview.classList.contains('effects__preview--' + item)) {
        imagePreview.classList.remove('effects__preview--' + item);
      }
    });

    imagePreview.classList.add('effects__preview--' + evt.target.value);
    if (imagePreview.classList.contains('effects__preview--chrome')) {
      imagePreview.style.filter = 'grayscale(1)';
    }
    if (imagePreview.classList.contains('effects__preview--sepia')) {
      imagePreview.style.filter = 'sepia(1)';
    }
    if (imagePreview.classList.contains('effects__preview--marvin')) {
      imagePreview.style.filter = 'invert(100%)';
    }
    if (imagePreview.classList.contains('effects__preview--phobos')) {
      imagePreview.style.filter = 'blur(3px)';
    }
    if (imagePreview.classList.contains('effects__preview--heat')) {
      imagePreview.style.filter = 'brightness(3)';
    }
    if (imagePreview.classList.contains('effects__preview--none')) {
      imagePreview.style.filter = 'none';
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
    } else {
      document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    }

  };

  imageUploadEffects.addEventListener('change', function (evt) {
    filterChangeHandler(evt);
  });


  effectLevelLine.addEventListener('mouseup', function (evt) {
    effectValue.value = (evt.offsetX / LINE_WIDTH) * 100;
    if (imagePreview.classList.contains('effects__preview--chrome')) {
      imagePreview.style.filter = 'grayscale(' + effectValue.value / 100 + ')';
    }
    if (imagePreview.classList.contains('effects__preview--sepia')) {
      imagePreview.style.filter = 'sepia(' + effectValue.value / 100 + ')';
    }
    if (imagePreview.classList.contains('effects__preview--marvin')) {
      imagePreview.style.filter = 'invert(' + effectValue.value + '%)';
    }
    if (imagePreview.classList.contains('effects__preview--phobos')) {
      imagePreview.style.filter = 'blur(' + effectValue.value / 100 * 3 + 'px)';
    }
    if (imagePreview.classList.contains('effects__preview--heat')) {
      imagePreview.style.filter = 'brightness(' + effectValue.value / 100 * 3 + ')';
    }
  });

  var scaleDown = document.querySelector('.scale__control--smaller');
  var scaleUp = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');

  var maxValue = 100;
  var minValue = 25;
  var value = 100;

  var makeSmaller = function () {
    scaleValue.value = value - 25 + '%';
    value -= 25;
    if (value <= minValue) {
      scaleValue.value = minValue + '%';
      value = minValue;
    }
    imagePreview.style.transform = 'scale(' + value / 100 + ')';
  };

  var makeBigger = function () {
    scaleValue.value = value + 25 + '%';
    value += 25;
    if (value >= maxValue) {
      scaleValue.value = maxValue + '%';
      value = maxValue;
    }
    imagePreview.style.transform = 'scale(' + value / 100 + ')';
  };

  scaleDown.addEventListener('click', function () {
    makeSmaller();
  });

  scaleUp.addEventListener('click', function () {
    makeBigger();
  });
})();