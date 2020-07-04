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

  var fragment = document.createDocumentFragment();
  var postList = document.querySelector('.pictures');

  window.download(function (newPosts) {
    newPosts.forEach(function (item) {
      fragment.appendChild(createNewPost(item));
      postList.appendChild(fragment);
    });

    window.postsArray = Array.from(newPosts);

  }, function () {});

  window.updateArrayDiscussed = function (array) {

    window.filterDiscussedArray = array.sort(function (post1, post2) {
      if (post1.comments.length < post2.comments.length) {
        return 1;
      }
      if (post1.comments.length > post2.comments.length) {
        return -1;
      }
      return 0;
    });
  };

  window.updateArrayRandom = function (array) {

    window.filterRandomArray = [];
    for (var i = 0; i < 10; i++) {
      var index = Math.floor(Math.random() * array.length);
      window.filterRandomArray.push(array[index]);
      array.splice(index, 1);
    }
  };

  var pictures = [];

  var removePosts = function () {

    pictures = Array.from(postList.querySelectorAll('.picture'));

    pictures.forEach(function (it) {
      postList.removeChild(it);
    });
  };

  var renderPosts = function (array) {

    Array.prototype.push.apply(pictures, array);

    array.forEach(function (item) {
      fragment.appendChild(createNewPost(item));
      postList.appendChild(fragment);
    });
  };

  var defaultFilter = document.querySelector('#filter-default');
  var discussedFilter = document.querySelector('#filter-discussed');
  var randomFilter = document.querySelector('#filter-random');

  discussedFilter.addEventListener('click', function () {

    defaultFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');

    window.debounce(function () {
      removePosts();
      window.updateArrayDiscussed(window.postsArray.slice(0));
      renderPosts(window.filterDiscussedArray);
    })();
  });


  randomFilter.addEventListener('click', function () {

    defaultFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.add('img-filters__button--active');

    window.debounce(function () {
      removePosts();
      window.updateArrayRandom(window.postsArray.slice(0));
      renderPosts(window.filterRandomArray);
    })();
  });

  defaultFilter.addEventListener('click', function () {

    discussedFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.add('img-filters__button--active');

    window.debounce(function () {
      removePosts();
      renderPosts(window.postsArray);
    })();
  });
})();
