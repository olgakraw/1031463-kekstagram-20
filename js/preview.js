'use strict';

(function () {
  var LINE_WIDTH = 453;
  var MAX_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var SCALE_STEP = 25;

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var EFFECTS = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var effectDepth = document.querySelector('.effect-level__depth');
  var effectPin = document.querySelector('.effect-level__pin');
  var effectValue = document.querySelector('.effect-level__value');
  var imagePreview = document.querySelector('.img-upload__preview');
  var preview = document.querySelector('.img-upload__preview img');
  var imageUploadEffects = document.querySelector('.img-upload__effects');

  var fileChooser = document.querySelector('#upload-file');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

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

    effectDepth.style.width = '100%';
    effectPin.style.left = '100%';

  };

  imageUploadEffects.addEventListener('change', function (evt) {
    filterChangeHandler(evt);
  });

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
      effectDepth.style.width = (effectPin.offsetLeft - shift.x) + 'px';
      if ((effectPin.offsetLeft - shift.x) < 0) {
        effectPin.style.left = '0';
        effectDepth.style.width = '0';
      }
      if ((effectPin.offsetLeft - shift.x) > LINE_WIDTH) {
        effectPin.style.left = LINE_WIDTH + 'px';
        effectDepth.style.width = LINE_WIDTH + 'px';
      }

      effectValue.value = ((effectPin.offsetLeft - shift.x) / LINE_WIDTH) * 100;
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
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var shiftUp = {
        x: startCoords.x - upEvt.clientX,
      };

      startCoords = {
        x: upEvt.clientX,
      };

      effectValue.value = ((effectPin.offsetLeft - shiftUp.x) / LINE_WIDTH) * 100;
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

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var scaleDown = document.querySelector('.scale__control--smaller');
  var scaleUp = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');

  var value = 100;

  var makeSmaller = function () {
    scaleValue.value = value - SCALE_STEP + '%';
    value -= SCALE_STEP;
    if (value <= MIN_SCALE_VALUE) {
      scaleValue.value = MIN_SCALE_VALUE + '%';
      value = MIN_SCALE_VALUE;
    }
    imagePreview.style.transform = 'scale(' + value / 100 + ')';
  };

  var makeBigger = function () {
    scaleValue.value = value + SCALE_STEP + '%';
    value += SCALE_STEP;
    if (value >= MAX_SCALE_VALUE) {
      scaleValue.value = MAX_SCALE_VALUE + '%';
      value = MAX_SCALE_VALUE;
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
