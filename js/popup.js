'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var body = document.querySelector('body');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  uploadCancel.addEventListener('click', function () {
    closePopup();
  });

  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');


  var createSuccessMessage = function () {
    var template = document.querySelector('#success').content.querySelector('section');
    var successMessage = template.cloneNode(true);
    return successMessage;
  };

  var createErrorMessage = function () {
    var template = document.querySelector('#error').content.querySelector('section');
    var errorMessage = template.cloneNode(true);
    return errorMessage;
  };

  var closeMessage = function (message) {
    message.classList.add('hidden');
  };

  var fragment = document.createDocumentFragment();

  var successHandler = function () {
    uploadOverlay.classList.add('hidden');

    fragment.appendChild(createSuccessMessage());
    main.appendChild(fragment);

    var successButton = main.querySelector('.success__button');

    var successMessagePopup = main.querySelector('.success');

    successButton.addEventListener('click', function () {
      closeMessage(successMessagePopup);
    });
  };

  var errorHandler = function () {
    uploadOverlay.classList.add('hidden');
    fragment.appendChild(createErrorMessage());
    main.appendChild(fragment);

    var errorButton = main.querySelector('.error__button');

    var errorMessagePopup = main.querySelector('.error');

    errorButton.addEventListener('click', function () {
      closeMessage(errorMessagePopup);
    });
  };
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();

  });
})();
