'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

// найдём блок куда будем вставлять созданные публикации
var sectionPosts = document.querySelector('.pictures');

var TOTAL_POST = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var getArrPosts = function () {
  var posts = [];

  for (var i = 0; i < TOTAL_POST; i++) {
    var imgFix = (i + 1);

    posts[i] = {
      src: 'photos/' + imgFix + '.jpg',
      comment: window.util.getRandomValue(COMMENTS),
      likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
      description: window.util.getRandomValue(DESCRIPTION),
    };
  }

  return posts;
};

var pushPost = function (posts) {
  // найдём темплейт и с помошью .content нужные елементы на странице
  var postTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var postElement = postTemplate.cloneNode(true);
  // найдём изображение в  публикации
  var postImg = postTemplate.querySelector('.picture__img');
  // строка с количеством коментариев
  var comment = postTemplate.querySelector('.picture__stat--comments');
  // количество лайков
  var likes = postTemplate.querySelector('.picture__stat--likes');

  postImg.src = posts.src;
  comment.textContent = posts.comment.length;
  likes.textContent = posts.likes;

  return postElement;
};

var fillPosts = function (posts) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < TOTAL_POST; j++) {
    fragment.appendChild(pushPost(posts[j]));
  }

  sectionPosts.appendChild(fragment);
};

// результат функции из 25 объектов с фото
var posts = getArrPosts();
fillPosts(posts);
// ------------------------ //
var bigPicture = document.querySelector('.big-picture');

var showBigP = function () {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
};

showBigP();
// -----------------------  //
// подставляем из созданного массива обьектов в попап .social__caption
var imgBig = bigPicture.querySelector('.big-picture__img img');
imgBig.src = posts[0].src;

var likesBig = bigPicture.querySelector('.likes-count');
likesBig.textContent = posts[0].likes;

var commentBig = bigPicture.querySelector('.comments-count');
commentBig.textContent = posts[0].comment;

var a = bigPicture.querySelector('.social__caption');
a.textContent = posts[0].description;

var AVATAR = {
  min: 1,
  max: 6
};

var com = posts[0].comment;

var getRandomAvatar = function () {
  return 'img/avatar-' + window.util.getRandomNumber(AVATAR.min, AVATAR.max) + '.svg';
};

var makeComment = function () {
  // найдём список комментариев
  var list = document.querySelector('.social__comments');
  // remove comments bigFoto post
  list.innerHTML = '';
  var fragmentComment = document.createDocumentFragment();
  // создадим елемент списка для комментария
  var item = document.createElement('li');
  // присвоим ему необходимый класс
  item.classList = 'social__comment social__comment--text';
  // созадидм аватар комментатора
  var avatar = document.createElement('img');
  // присовим аватару заданный класс
  avatar.classList = 'social__picture';
  // сгенерируем путь к svg аватара
  avatar.src = getRandomAvatar();
  // зададим размеры и alt для изображения
  avatar.width = '35';
  avatar.height = '35';
  avatar.alt = 'Аватар комментатора фотографии';
  var textComent = document.createTextNode(com);
  // вcтавим аватар в элемент сипска
  item.appendChild(avatar);
  item.appendChild(textComent);
  fragmentComment.appendChild(item);
  // дополним в список сгенерированный пункт
  list.appendChild(fragmentComment);
};

makeComment();

// -------------------------------------  //
var keyCode = {
  ESC: 27,
  ENTER: 13
};
var btnClosePicture = bigPicture.querySelector('.big-picture__cancel');
var overlay = document.querySelector('.overlay');

// закрытие окна
var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

// функция закрытия каринки по нажатию на ESC
var onKeydownEsc = function (e) {
  if (e.keyCode === keyCode.ESC) {
    closeBigPicture();
  }
};

// Навешивание обработчиковт
// закрытие большой фотографии по клику на х или по оверлею
btnClosePicture.addEventListener('click', closeBigPicture);
overlay.addEventListener('click', closeBigPicture);
// закрытие по ESC
document.addEventListener('keydown', onKeydownEsc);

