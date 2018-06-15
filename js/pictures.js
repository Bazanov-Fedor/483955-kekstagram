'use strict';

(function () {
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

  var ACTIVE_POST = 0;
  var TOTAL_POSTS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENT = 1;
  var MAX_COMMENT = 2;

  var avatar = {
    MIN: 1,
    MAX: 6
  };

  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var sectionPosts = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture__link');
  var bigPicture = document.querySelector('.big-picture');
  var btnClose = bigPicture.querySelector('.big-picture__cancel');
  var bigImg = bigPicture.querySelector('.big-picture__img img');
  var bigLikes = bigPicture.querySelector('.likes-count');
  var bigDes = bigPicture.querySelector('.social__caption');
  var commentsList = bigPicture.querySelector('.social__comments');

  var getListComments = function (items) {
    var comments = [];

    for (var i = 0; i < items; i++) {
      comments.push(window.util.getRandomValue(COMMENTS));
    }

    return comments;
  };

  var getArrPost = function () {
    var posts = [];

    for (var i = 0; i < TOTAL_POSTS; i++) {
      var fixScr = (i + 1);

      posts[i] = {
        url: 'photos/' + fixScr + '.jpg',
        likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getListComments(window.util.getRandomNumber(MIN_COMMENT, MAX_COMMENT)),
        description: window.util.getRandomValue(DESCRIPTION)
      };
    }

    return posts;
  };

  var pushElementPost = function (posts) {
    var post = template.cloneNode(true);
    post.querySelector('.picture__img').src = posts.url;
    post.querySelector('.picture__stat--likes').textContent = posts.likes;
    post.querySelector('.picture__stat--comments').textContent = posts.comments.length;

    return post;
  };

  var renderPosts = function (posts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < TOTAL_POSTS; i++) {
      fragment.appendChild(pushElementPost(posts[i]));
    }

    return sectionPosts.appendChild(fragment);
  };

  var posts = getArrPost();
  renderPosts(posts);

  var getRandomAvatar = function () {
    return 'img/avatar-' + window.util.getRandomNumber(avatar.MIN, avatar.MAX) + '.svg';
  };

  var makeComment = function () {
    for (var i = 0; i < posts[ACTIVE_POST].comments.length; i++) {
      var item = document.createElement('li');
      var avatarImg = document.createElement('img');
      var p = document.createElement('p');

      item.classList = 'social__comment social__comment--text';

      avatarImg.classList = 'social__picture';
      avatarImg.src = getRandomAvatar();
      avatarImg.width = '35';
      avatarImg.height = '35';
      avatarImg.alt = 'Аватар комментатора фотографии';

      p.classList = 'social__text';
      p.textContent = posts[i].comments;

      item.appendChild(avatarImg);
      item.appendChild(p);
      commentsList.appendChild(item);
    }
  };

  var showBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');

    bigImg.src = posts[ACTIVE_POST].url;
    bigLikes.textContent = posts[ACTIVE_POST].likes;
    bigDes.textContent = posts[ACTIVE_POST].description;

    makeComment();
  };

  var closePicture = function () {
    bigPicture.classList.add('hidden');
    btnClose.removeEventListener('click', closePicture);
    btnClose.removeEventListener('keydown', onKeydownEnter);
    document.removeEventListener('keydown', onKeydownESC);
  };

  var onKeydownESC = function (evt) {
    if (evt.keyCode === keyCode.ESC) {
      closePicture();
    }
  };

  var onKeydownEnter = function (evt) {
    if (evt.keyCode === keyCode.ENTER) {
      closePicture();
    }
  };

  btnClose.addEventListener('click', closePicture);
  btnClose.addEventListener('keydown', onKeydownEnter);
  document.addEventListener('keydown', onKeydownESC);

  showBigPicture();
})();
