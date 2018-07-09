'use strict';

(function () {
  var ScaleData = {
    MAX_SIZE: 100,
    MIN_SIZE: 25,
    STEP: 25,
    START_ELEM: 0,
    END_ELEM: -1
  };

  var preview = document.querySelector('.img-upload__preview');
  var resizeInput = document.querySelector('.resize__control--value');
  var btnResizeMin = document.querySelector('.resize__control--minus');
  var btnResizePlus = document.querySelector('.resize__control--plus');

  var onBtnScaleClick = function (action) {
    var value = +resizeInput.value.slice(ScaleData.START_ELEM, ScaleData.END_ELEM);

    if (action === 'reduce' && value !== ScaleData.MIN_SIZE) {
      value -= ScaleData.STEP;
    }

    if (action === 'increase' && value !== ScaleData.MAX_SIZE) {
      value += ScaleData.STEP;
    }

    preview.style.transform = 'scale(0' + value / 100 + ')';
    resizeInput.value = value + '%';
  };

  btnResizeMin.addEventListener('click', function () {
    onBtnScaleClick('reduce');
  });
  btnResizePlus.addEventListener('click', function () {
    onBtnScaleClick('increase');
  });
})();
