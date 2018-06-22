'use strict';

(function () {
  var sectionPosts = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture__link');

  var pushElementPost = function (posts) {
    var post = template.cloneNode(true);
    post.querySelector('.picture__img').src = posts.url;
    post.querySelector('.picture__stat--likes').textContent = posts.likes;
    post.querySelector('.picture__stat--comments').textContent = posts.comments.length;

    return post;
  };

  window.getRenderPost = function (posts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(pushElementPost(posts[i]));
    }

    return sectionPosts.appendChild(fragment);
  };
})();
