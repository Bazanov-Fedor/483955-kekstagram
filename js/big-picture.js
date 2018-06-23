'use strict';

(function () {
  var avatar = {
    MIN: 1,
    MAX: 6
  };

  var popupUpload = document.querySelector('.big-picture');
  var btnClose = popupUpload.querySelector('.big-picture__cancel');
  var commentsList = popupUpload.querySelector('.social__comments');

  var getDataBigPost = function (obj) {
    popupUpload.querySelector('.big-picture img').src = obj.url;
    popupUpload.querySelector('.likes-count').textContent = obj.likes;
    popupUpload.querySelector('.social__caption').textContent = 'Ухх ты!)';
  };

  var removeCommentList = function () {
    var list = document.querySelector('.social__comments');
    list.innerHTML = '';
  };

  var getRandomAvatar = function () {
    return 'img/avatar-' + window.util.getRandomNumber(avatar.MIN, avatar.MAX) + '.svg';
  };

  var getCommentsItem = function (posts) {
    for (var i = 0; i < posts.comments.length; i++) {
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
    popupUpload.querySelector('.social__comment-count').classList.add('visually-hidden');
    popupUpload.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  var onKeydownEsc = function (evt) {
    window.util.isKeydownEsc(evt, closePost);
  };

  var onKeydownEnter = function (evt) {
    window.util.isKeydownEnter(evt, closePost);
  };

  var closePost = function () {
    popupUpload.classList.add('hidden');
    btnClose.removeEventListener('click', closePost);
    btnClose.removeEventListener('keydown', onKeydownEnter);
    document.removeEventListener('keydown', onKeydownEsc);
  };

  var openPost = function () {
    hiddenElementPicture();
    btnClose.addEventListener('click', closePost);
    btnClose.addEventListener('keydown', onKeydownEnter);
    document.addEventListener('keydown', onKeydownEsc);
  };

  var showBigPost = function (posts) {
    removeCommentList();
    getDataBigPost(posts);
    getCommentsItem(posts);
    openPost();
  };

  window.showBigPost = showBigPost;
})();
