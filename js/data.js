'use strict';

(function () {
  var POSTS_NUMBER = 25;
  var COMMENTS_NUMBER = 6;

  var NAMES = ['Анна', 'ИгорЬ', 'Татьяна', 'Александр', 'Сергей', 'Роман'];

  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var posts = [];
  var usersComments = [];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var createComment = function (number) {
    for (var i = 0; i < number; i++) {
      var comment = {
        avatar: 'img/avatar-' + getRandomNumber(1, number + 1) + '.svg',
        message: MESSAGES[getRandomNumber(0, number)],
        name: NAMES[getRandomNumber(0, number)]
      };
      usersComments.push(comment);
    }
  };
  createComment(COMMENTS_NUMBER);

  var createPost = function (number) {
    for (var i = 0; i < number; i++) {
      var post = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: '',
        likes: getRandomNumber(15, 201),
        comments: usersComments[getRandomNumber(0, 6)]
      };
      posts.push(post);
    }
  };
  createPost(POSTS_NUMBER);

  var createNewPost = function (items) {
    var template = document.querySelector('#picture').content.querySelector('a');
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = items.url;
    element.querySelector('.picture__comments').textContent = 1;
    element.querySelector('.picture__likes').textContent = items.likes;

    return element;

  };

  var renderPosts = function (newPosts) {
    var fragment = document.createDocumentFragment();
    var postList = document.querySelector('.pictures');

    newPosts.forEach(function (item) {
      fragment.appendChild(createNewPost(item));
      postList.appendChild(fragment);
    });
  };

  renderPosts(posts);
})();
