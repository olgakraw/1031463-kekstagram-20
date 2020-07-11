'use strict';

(function () {

  window.createBigPicture = function (items, array) {
    items.forEach(function (item, index) {
      item.addEventListener('click', function () {
        document.querySelector('.big-picture').classList.remove('hidden');
        document.addEventListener('keydown', onBigPictureEscPress);

        document.querySelector('.big-picture__img').children[0].src = array[index].url;
        document.querySelector('.comments-count').textContent = array[index].comments.length;
        document.querySelector('.likes-count').textContent = array[index].likes;
        document.querySelector('.social__caption').textContent = array[index].description;

        var commentsCount = document.querySelector('.comments-count--to-show');

        var makeElement = function (tagName, className, text) {
          var element = document.createElement(tagName);
          element.classList.add(className);
          if (text) {
            element.textContent = text;
          }
          return element;
        };

        var commentsList = document.querySelector('.social__comments');

        var createComment = function (el) {
          var commentElement = makeElement('li', 'social__comment');

          var picture = makeElement('img', 'social__picture');
          picture.src = el.avatar;
          picture.alt = el.name;
          picture.width = '35';
          picture.height = '35';
          commentElement.appendChild(picture);

          var text = makeElement('p', 'social__text', el.message);
          commentElement.appendChild(text);

          return commentElement;

        };

        var comments = Array.from(array[index].comments).slice(0);

        commentsList.innerHTML = '';
        comments.forEach(function (el) {
          var commentsItem = createComment(el);
          commentsList.appendChild(commentsItem);
        });

        var commentsLoader = document.querySelector('.comments-loader');
        var MAX_COMMENTS_LENGTH = 5;

        if (array[index].comments.length <= MAX_COMMENTS_LENGTH) {
          commentsCount.textContent = array[index].comments.length;
          commentsLoader.classList.add('hidden');
        } else {
          commentsCount.textContent = MAX_COMMENTS_LENGTH;
          commentsLoader.classList.remove('hidden');

          var n = MAX_COMMENTS_LENGTH;

          for (var j = n; j < comments.length; j++) {
            commentsList.children[j].classList.add('hidden');
          }
          commentsLoader.addEventListener('click', function () {
            for (j = n; j < comments.length; j++) {
              commentsList.children[j].classList.remove('hidden');
            }

            n += MAX_COMMENTS_LENGTH;
            for (j = n; j < comments.length; j++) {
              commentsList.children[j].classList.add('hidden');
              commentsCount.textContent = n;
            }

            if (n >= comments.length) {
              commentsCount.textContent = comments.length;
            }

            if (!commentsList.children[comments.length - 1].classList.contains('hidden')) {
              commentsLoader.classList.add('hidden');
            }

          });

        }
        document.querySelector('body').classList.add('modal-open');
      });
    });

    var bigPictureCancel = document.querySelector('.big-picture__cancel');
    var bigPicture = document.querySelector('.big-picture');
    var body = document.querySelector('body');

    var onBigPictureEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeBigPicture();
      }
    };

    var closeBigPicture = function () {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');

      document.removeEventListener('keydown', onBigPictureEscPress);
    };

    bigPictureCancel.addEventListener('click', function () {
      closeBigPicture();
    });

  };

})();
