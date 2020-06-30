'use strict';

(function () {
  var createNewPost = function (items) {
    var template = document.querySelector('#picture').content.querySelector('a');
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = items.url;
    element.querySelector('.picture__comments').textContent = items.comments.length;
    element.querySelector('.picture__likes').textContent = items.likes;

    return element;
  };

  window.download(function (newPosts) {
    var fragment = document.createDocumentFragment();
    var postList = document.querySelector('.pictures');

    newPosts.forEach(function (item) {
      fragment.appendChild(createNewPost(item));
      postList.appendChild(fragment);
    });
  }, function () {});
})();
