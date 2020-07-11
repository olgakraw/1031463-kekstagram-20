'use strict';

(function () {
  window.createNewPost = function (items) {
    var template = document.querySelector('#picture').content.querySelector('a');
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = items.url;
    element.querySelector('.picture__comments').textContent = items.comments.length;
    element.querySelector('.picture__likes').textContent = items.likes;

    return element;
  };

  var fragment = document.createDocumentFragment();
  var postList = document.querySelector('.pictures');

  window.download(function (newPosts) {
    newPosts.forEach(function (item) {
      fragment.appendChild(window.createNewPost(item));
      postList.appendChild(fragment);
    });

    window.postsArray = Array.from(newPosts);


    var newPictures = postList.querySelectorAll('.picture');

    window.createBigPicture(newPictures, window.postsArray);

  }, function () {});

})();
