'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var body = document.querySelector('body');
  var imagePreview = document.querySelector('.img-upload__preview');
  var hashtagInput = document.querySelector('.text__hashtags');

  window.onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();

      form.reset();

      hashtagInput.setCustomValidity('');
      imagePreview.style.filter = 'none';
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
      imagePreview.style.transform = 'scale(1)';
    }
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', window.onPopupEscPress);
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', window.onPopupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  uploadCancel.addEventListener('click', function () {
    closePopup();

    form.reset();

    hashtagInput.setCustomValidity('');
    imagePreview.style.filter = 'none';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    imagePreview.style.transform = 'scale(1)';
  });

  var form = document.querySelector('.img-upload__form');
  var main = body.querySelector('main');

  var createSuccessMessage = function () {
    var template = document.querySelector('#success').content.querySelector('section');
    var successMessage = template.cloneNode(true);
    return successMessage;
  };

  main.appendChild(createSuccessMessage());
  var successMessagePopup = main.querySelector('.success');
  successMessagePopup.classList.add('hidden');

  var createErrorMessage = function () {
    var template = document.querySelector('#error').content.querySelector('section');
    var errorMessage = template.cloneNode(true);
    return errorMessage;
  };

  main.appendChild(createErrorMessage());
  var errorMessagePopup = main.querySelector('.error');
  errorMessagePopup.classList.add('hidden');

  var closeMessage = function (message) {
    message.classList.add('hidden');
  };

  var successHandler = function () {

    uploadOverlay.classList.add('hidden');
    var successMessagePopupDocument = document.body.querySelector('.success');
    successMessagePopupDocument.classList.remove('hidden');

    var successButton = main.querySelector('.success__button');

    var onSuccessMessageEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeMessage(successMessagePopup);
      }
    };

    document.addEventListener('keydown', onSuccessMessageEscPress);

    successButton.addEventListener('click', function () {
      closeMessage(successMessagePopup);
      document.removeEventListener('keydown', onSuccessMessageEscPress);

    });

    document.addEventListener('click', function (evt) {
      if (!evt.target.classList.contains('success__inner') && !evt.target.classList.contains('success__title')) {
        closeMessage(successMessagePopup);
      }

    });

    form.reset();

    imagePreview.style.filter = 'none';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    imagePreview.style.transform = 'scale(1)';

  };

  var errorHandler = function () {
    uploadOverlay.classList.add('hidden');
    var errorMessagePopupDocument = document.body.querySelector('.error');
    errorMessagePopupDocument.classList.remove('hidden');

    var errorButton = document.body.querySelector('.error__button');

    var onErrorMessageEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeMessage(errorMessagePopup);
      }
    };

    document.addEventListener('keydown', onErrorMessageEscPress);

    errorButton.addEventListener('click', function () {
      closeMessage(errorMessagePopup);
      document.removeEventListener('keydown', onErrorMessageEscPress);
    });

    document.addEventListener('click', function (evt) {
      if (!evt.target.classList.contains('error__inner') && !evt.target.classList.contains('error__title')) {
        closeMessage(errorMessagePopup);
      }
    });

    form.reset();

    imagePreview.style.filter = 'none';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    imagePreview.style.transform = 'scale(1)';
  };

  form.addEventListener('submit', function (evt) {

    window.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();

  });

})();
