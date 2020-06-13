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
  element.children[0].src = items.url;
  element.children[1].children[0].textContent = '1';
  element.children[1].children[1].textContent = items.likes;

  return element;

};

var renderPosts = function (newPosts) {
  var fragment = document.createDocumentFragment();
  var postList = document.querySelector('.pictures');

  for (var j = 0; j < newPosts.length; j++) {
    fragment.appendChild(createNewPost(newPosts[j]));
    postList.appendChild(fragment);
  }
};

renderPosts(posts);

// var makeElement = function (tagName, className, text) {
//   var element = document.createElement(tagName);
//   element.classList.add(className);
//   if (text) {
//     element.textContent = text;
//   }
//   return element;
// };

// var createNewPost = function (newPost) {
//   var newPostItem = makeElement('a', 'picture');

//   var picture = makeElement('img', 'picture__img');
//   picture.src = newPost.url;
//   picture.alt = 'Случайная фотография';
//   newPostItem.appendChild(picture);

//   var info = makeElement('p', 'picture__info', newPost.description);
//   newPostItem.appendChild(info);

//   var comments = makeElement('span', 'picture__comments', '1');
//   info.appendChild(comments);

//   var likes = makeElement('span', 'picture__likes', newPost.likes);
//   info.appendChild(likes);

//   return newPostItem;

// };

// var renderPosts = function (newPosts) {
//   var postList = document.querySelector('.pictures');

//   for (var i = 0; i < newPosts.length; i++) {

//     var postItem = createNewPost(newPosts[i]);
//     postList.appendChild(postItem);

//   }
// };

// renderPosts(posts);

// var postList = document.querySelector('.pictures');


//     for (var i = 0; i < POSTS_NUMBER; i++) {
//       fragment.appendChild(element[i]);
//     }
//     usersPictures.appendChild(fragment);
//   }
// };


//   //var usersPictures = document.querySelector('.pictures');
//   var template = document.querySelector('#picture').content.querySelector('a');
//     var element = template.cloneNode(true);
//     element.child[0].src = post.url;
//     element.child[1].child[0].textContent = post.comments;
//     element.child[1].child[1].textContent = post.likes;

//     //usersPictures.appendChild(element);
//     // element.querySelector('.picture__img').src = post.url;
//     // element.querySelector('.picture__likes').textContent = post.likes;
//     // element.querySelector('.picture__comments').textContent = post.comments;
//     var usersPictures = document.querySelector('.pictures');
//     var fragment = document.createDocumentFragment();

//     for (var i = 0; i < POSTS_NUMBER; i++) {
//       fragment.appendChild(element[i]);
//     }
//     usersPictures.appendChild(fragment);
//   }
// };
