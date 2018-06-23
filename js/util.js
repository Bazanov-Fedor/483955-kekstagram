'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  // получение случайного числа в диапозоне от min до max
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  // Получение случайного элемента из массива
  var getRandomValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var isKeydownEsc = function (evt, callback) {
    if (evt.keyCode === keyCode.ESC) {
      callback();
    }
  };

  var isKeydownEnter = function (evt, callback) {
    if (evt.keyCode === keyCode.ENTER) {
      callback();
    }
  };

  // imports util
  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomValue: getRandomValue,
    isKeydownEsc: isKeydownEsc,
    isKeydownEnter: isKeydownEnter
  };
})();
