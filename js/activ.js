'use strict';

(function () {
  var POST_TOTAL = 25;
  var posts = window.getArrPost(POST_TOTAL);
  window.getRenderPost(posts);

  var previews = document.querySelectorAll('.picture__link');

  var addClickListener = function (elem, num) {
    elem.addEventListener('click', function () {
      window.showBigPost(posts[num]);
    });
  };

  for (var i = 0; i < previews.length; i++) {
    addClickListener(previews[i], i);
  }
})();
