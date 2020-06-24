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

// var effectPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectValue = document.querySelector('.effect-level__value');
var imagePreview = document.querySelector('.img-upload__preview');
var imageUploadEffects = document.querySelector('.img-upload__effects');
var LINE_WIDTH = 453;

var EFFECTS = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

var filterChangeHandler = function (evt) {

  EFFECTS.forEach(function (item) {
    if (imagePreview.classList.contains('effects__preview--' + item)) {
      imagePreview.classList.remove('effects__preview--' + item);
    }
  });

  imagePreview.classList.add('effects__preview--' + evt.target.value);
  if (imagePreview.classList.contains('effects__preview--chrome')) {
    imagePreview.style.filter = 'grayscale(1)';
  }
  if (imagePreview.classList.contains('effects__preview--sepia')) {
    imagePreview.style.filter = 'sepia(1)';
  }
  if (imagePreview.classList.contains('effects__preview--marvin')) {
    imagePreview.style.filter = 'invert(100%)';
  }
  if (imagePreview.classList.contains('effects__preview--phobos')) {
    imagePreview.style.filter = 'blur(3px)';
  }
  if (imagePreview.classList.contains('effects__preview--heat')) {
    imagePreview.style.filter = 'brightness(3)';
  }
  if (imagePreview.classList.contains('effects__preview--none')) {
    imagePreview.style.filter = 'none';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
  } else {
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
  }

};

imageUploadEffects.addEventListener('change', function (evt) {
  filterChangeHandler(evt);
});


effectLevelLine.addEventListener('mouseup', function (evt) {
  effectValue.value = (evt.offsetX / LINE_WIDTH) * 100;
  if (imagePreview.classList.contains('effects__preview--chrome')) {
    imagePreview.style.filter = 'grayscale(' + effectValue.value / 100 + ')';
  }
  if (imagePreview.classList.contains('effects__preview--sepia')) {
    imagePreview.style.filter = 'sepia(' + effectValue.value / 100 + ')';
  }
  if (imagePreview.classList.contains('effects__preview--marvin')) {
    imagePreview.style.filter = 'invert(' + effectValue.value + '%)';
  }
  if (imagePreview.classList.contains('effects__preview--phobos')) {
    imagePreview.style.filter = 'blur(' + effectValue.value / 100 * 3 + 'px)';
  }
  if (imagePreview.classList.contains('effects__preview--heat')) {
    imagePreview.style.filter = 'brightness(' + effectValue.value / 100 * 3 + ')';
  }
});

var scaleDown = document.querySelector('.scale__control--smaller');
var scaleUp = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');

var maxValue = 100;
var minValue = 25;
var value = 100;

var makeSmaller = function () {
  scaleValue.value = value - 25 + '%';
  value -= 25;
  if (value <= minValue) {
    scaleValue.value = minValue + '%';
    value = minValue;
  }
  imagePreview.style.transform = 'scale(' + value / 100 + ')';
};

var makeBigger = function () {
  scaleValue.value = value + 25 + '%';
  value += 25;
  if (value >= maxValue) {
    scaleValue.value = maxValue + '%';
    value = maxValue;
  }
  imagePreview.style.transform = 'scale(' + value / 100 + ')';
};

scaleDown.addEventListener('click', function () {
  makeSmaller();
});

scaleUp.addEventListener('click', function () {
  makeBigger();
});

var hashtagInput = document.querySelector('.text__hashtags');
var re = /^#[a-zA-Zа-яА-я0-9]*$/;

hashtagInput.addEventListener('input', function () {
  var hashtagSplit = hashtagInput.value.split(' ');

  hashtagInput.setCustomValidity('');

  var isHashtagInvalid = hashtagSplit.some(function (element) {
    return !re.test(element);
  });

  if (isHashtagInvalid === true) {
    hashtagInput.setCustomValidity('Неправильный формат хэштега');
  }

  if (hashtagSplit.length > 5) {
    hashtagInput.setCustomValidity('Не больше пяти хэштегов!');
  }
});
