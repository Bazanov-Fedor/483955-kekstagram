'use strict';

(function () {
  var posts = [];
  var sectionPosts = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture__link');
  var filterBlock = document.querySelector('.img-filters');
  var activeButton = document.querySelector('.img-filters__button--active');
  var NUMBER_NEW_POST = 10;

  var sort = {
    'filter-popular': function (array) {
      return array;
    },
    'filter-discussed': function (array) {
      return array.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
    'filter-new': function (array) {
      array.length = NUMBER_NEW_POST;
      var newPhotos = array;
      newPhotos = window.util.getShuffled(newPhotos);
      return newPhotos;
    },
  };

  var makeElementsPost = function (data) {
    var post = template.cloneNode(true);
    post.querySelector('.picture__img').src = data.url;
    post.querySelector('.picture__stat--likes').textContent = data.likes;
    post.querySelector('.picture__stat--comments').textContent = data.comments.length;

    return post;
  };

  var addFragment = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      var postItem = makeElementsPost(item);
      postItem.addEventListener('click', function () {
        window.showBigPost(item);
      });
      fragment.appendChild(postItem);
    });
    sectionPosts.appendChild(fragment);
  };

  var onDataLoad = function (data) {
    posts = data;
    addFragment(posts);
    filterBlock.classList.remove('img-filters--inactive');
  };

  var makeButtonInactive = function (evt) {
    activeButton.classList.remove('img-filters__button--active');
    activeButton = evt.target;
    activeButton.classList.add('img-filters__button--active');
  };

  var clearPictures = function () {
    var photosList = sectionPosts.querySelectorAll('.picture__link');
    photosList.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  var makeSortPost = function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      var sortArr = posts.slice();
      sort[evt.target.id](sortArr);

      clearPictures();
      window.util.debounce(addFragment(sortArr));
      makeButtonInactive(evt);
    }
  };

  filterBlock.addEventListener('click', makeSortPost);
  window.backend.onRequestLoad(onDataLoad, window.backend.onErrorRequest);
})();
