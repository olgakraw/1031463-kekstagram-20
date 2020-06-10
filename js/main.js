'use strict';

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
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var createComment = function () {
  for (var i = 0; i < COMMENTS_NUMBER; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(1, 7) + '.svg',
      message: MESSAGES[getRandomNumber(1, 7)],
      name: NAMES[getRandomNumber(1, 7)]
    };
    usersComments.push(comment);
  }
};

var createPost = function () {
  for (var i = 0; i < POSTS_NUMBER; i++) {
    var post = {
      url: 'photos/' + i + '.jpg',
      description: 'photo description',
      likes: getRandomNumber(15, 201),
      comments: usersComments[i]
    };
    posts.push(post);
  }
};
