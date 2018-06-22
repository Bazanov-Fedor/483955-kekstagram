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

  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENT = 1;
  var MAX_COMMENT = 2;

  var getListComments = function (items) {
    var comments = [];

    for (var i = 0; i < items; i++) {
      comments.push(window.util.getRandomValue(COMMENTS));
    }

    return comments;
  };

  var getArrPost = function (objNumber) {
    var posts = [];

    for (var i = 0; i < objNumber; i++) {
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

  window.getArrPost = getArrPost;
})();
