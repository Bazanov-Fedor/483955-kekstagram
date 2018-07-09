'use strict';

(function () {
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var COMMENT_TOTAL = 5;

  var Avatar = {
    MIN: 1,
    MAX: 6
  };

  var popupUpload = document.querySelector('.big-picture');
  var btnClose = popupUpload.querySelector('.big-picture__cancel');
  var commentsList = popupUpload.querySelector('.social__comments');
  var btnLoadMore = popupUpload.querySelector('.social__loadmore');
  var list = document.querySelector('.social__comments');

  var getDataBigPost = function (obj) {
    popupUpload.querySelector('.big-picture img').src = obj.url;
    popupUpload.querySelector('.likes-count').textContent = obj.likes;
    popupUpload.querySelector('.social__caption').textContent = window.util.getRandomValue(DESCRIPTIONS);
    popupUpload.querySelector('.comments-count').textContent = obj.comments.length;
  };

  var removeCommentList = function () {
    list.innerHTML = '';
  };

  var getRandomAvatar = function () {
    return 'img/avatar-' + window.util.getRandomNumber(Avatar.MIN, Avatar.MAX) + '.svg';
  };

  var getCommentsItem = function (posts) {
    var commentNumber = posts.comments.length > COMMENT_TOTAL ? COMMENT_TOTAL : posts.comments.length;
    for (var i = 0; i < commentNumber; i++) {
      var item = document.createElement('li');
      item.classList = 'social__comment social__comment--text';

      var avatarImg = document.createElement('img');
      avatarImg.classList = 'social__picture';
      avatarImg.src = getRandomAvatar();
      avatarImg.width = '35';
      avatarImg.height = '35';
      avatarImg.alt = 'Аватар комментатора фотографии';

      var p = document.createElement('p');
      p.classList = 'social__text';
      p.textContent = posts.comments[i];

      item.appendChild(avatarImg);
      item.appendChild(p);
      commentsList.appendChild(item);
    }
  };

  var hiddenElementPicture = function () {
    popupUpload.classList.remove('hidden');
    btnLoadMore.classList.add('hidden');
  };

  var onOverlayKeydownEsc = function (evt) {
    window.util.isKeydownEsc(evt, closeUploadOverlay);
  };

  var onBtnCloseOverlayKeydownEnter = function (evt) {
    window.util.isKeydownEnter(evt, closeUploadOverlay);
  };

  var onBtnCloseOverlayClick = function () {
    closeUploadOverlay();
  };

  var closeUploadOverlay = function () {
    popupUpload.classList.add('hidden');
    btnClose.removeEventListener('click', onBtnCloseOverlayClick);
    btnClose.removeEventListener('keydown', onBtnCloseOverlayKeydownEnter);
    document.removeEventListener('keydown', onOverlayKeydownEsc);
    document.body.classList.remove('modal-open');
  };

  var openUploadOverlay = function () {
    hiddenElementPicture();
    btnClose.addEventListener('click', onBtnCloseOverlayClick);
    btnClose.addEventListener('keydown', onBtnCloseOverlayKeydownEnter);
    document.addEventListener('keydown', onOverlayKeydownEsc);
  };

  var showBigPost = function (posts) {
    document.body.classList.add('modal-open');
    removeCommentList();
    getDataBigPost(posts);
    getCommentsItem(posts);
    openUploadOverlay();
  };

  window.showBigPost = showBigPost;
})();
