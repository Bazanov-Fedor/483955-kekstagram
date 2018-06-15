'use strict';

(function () {
  // получение случайного числа в диапозоне от min до max
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Получение случайного элемента из массива
  var getRandomValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // imports util
  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomValue: getRandomValue
  };
})();
