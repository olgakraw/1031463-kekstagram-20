'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var postList = document.querySelector('.pictures');

  window.updateArrayDiscussed = function (array) {

    window.filterDiscussedPosts = array.sort(function (post1, post2) {
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

    window.filterRandomPosts = [];
    for (var i = 0; i < 10; i++) {
      var index = Math.floor(Math.random() * array.length);
      window.filterRandomPosts.push(array[index]);
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
      fragment.appendChild(window.createNewPost(item));
      postList.appendChild(fragment);
    });
  };

  var defaultFilter = document.querySelector('#filter-default');
  var discussedFilter = document.querySelector('#filter-discussed');
  var randomFilter = document.querySelector('#filter-random');

  var discussedFilterHandler = window.debounce(function () {
    defaultFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');

    removePosts();
    window.updateArrayDiscussed(window.posts.slice(0));
    renderPosts(window.filterDiscussedPosts);
    window.createBigPicture(postList.querySelectorAll('.picture'), window.filterDiscussedPosts);
  });

  discussedFilter.addEventListener('click', discussedFilterHandler);

  var randomFilterHandler = window.debounce(function () {
    defaultFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.add('img-filters__button--active');

    removePosts();
    window.updateArrayRandom(window.posts.slice(0));
    renderPosts(window.filterRandomPosts);
    window.createBigPicture(document.querySelectorAll('.picture'), window.filterRandomPosts);
  });

  randomFilter.addEventListener('click', randomFilterHandler);

  var defaultFilterHandler = window.debounce(function () {
    discussedFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.add('img-filters__button--active');

    removePosts();
    renderPosts(window.posts);
    window.createBigPicture(postList.querySelectorAll('.picture'), window.posts);
  });

  defaultFilter.addEventListener('click', defaultFilterHandler);

})();
