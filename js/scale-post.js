'use strict';

(function () {
  var preview = document.querySelector('.img-upload__preview');
  var resizeInput = document.querySelector('.resize__control--value');
  var btnResizeMin = document.querySelector('.resize__control--minus');
  var btnResizePlus = document.querySelector('.resize__control--plus');

  var scaleData = {
    MAX_SIZE: 100,
    MIN_SIZE: 25,
    STEP: 25,
    START_ELEM: 0,
    END_ELEM: -1
  };

  var onClickScaleBtn = function (action) {
    var value = +resizeInput.value.slice(scaleData.START_ELEM, scaleData.END_ELEM);

    if (action === 'reduce' && value !== scaleData.MIN_SIZE) {
      value -= scaleData.STEP;
    }

    if (action === 'increase' && value !== scaleData.MAX_SIZE) {
      value += scaleData.STEP;
    }

    preview.style.transform = 'scale(0' + value / 100 + ')';
    resizeInput.value = value + '%';
  };

  btnResizeMin.addEventListener('click', function () {
    onClickScaleBtn('reduce');
  });
  btnResizePlus.addEventListener('click', function () {
    onClickScaleBtn('increase');
  });
})();
