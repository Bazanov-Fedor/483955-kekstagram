'use strict';

(function () {
  var posts = [];
  var sectionPosts = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture__link');

  var pushElementPost = function (data) {
    var post = template.cloneNode(true);
    post.querySelector('.picture__img').src = data.url;
    post.querySelector('.picture__stat--likes').textContent = data.likes;
    post.querySelector('.picture__stat--comments').textContent = data.comments.length;

    return post;
  };

  function addFragment() {
    var fragment = document.createDocumentFragment();
    posts.forEach(function (post) {
      var postItem = pushElementPost(post);
      postItem.addEventListener('click', function () {
        window.showBigPost(post);
      });
      fragment.appendChild(postItem);
    });
    sectionPosts.appendChild(fragment);
  }

  var onDataLoad = function (data) {
    posts = data;
    addFragment();
    window.post = posts;
  };

  window.backend.onRequestLoad(onDataLoad, window.backend.onErrorRequest);
})();
