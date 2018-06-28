'use strict';

(function () {
  var pinPosition = {
    MIN: 0,
    MAX: 450
  };

  var filterCss = {
    none: {
      class: 'effects__preview--none'
    },
    chrome: {
      class: 'effects__preview--chrome',
      max: 1,
      min: 0
    },
    sepia: {
      class: 'effects__preview--sepia',
      max: 1,
      min: 0
    },
    marvin: {
      class: 'effects__preview--marvin',
      max: 100,
      min: 0,
      postFix: '%'
    },
    phobos: {
      class: 'effects__preview--phobos',
      max: 3,
      min: 0,
      postFix: 'px'
    },
    heat: {
      class: 'effects__preview--heat',
      max: 3,
      min: 1
    }
  };

  var preview = document.querySelector('.img-upload__preview');
  var effectValue = document.querySelector('.scale__value');
  var line = document.querySelector('.scale__line');
  var pin = document.querySelector('.scale__pin');
  var blockPin = document.querySelector('.img-upload__scale');

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var position = pin.offsetLeft - shift;
      startCoords = moveEvt.clientX;

      if (position <= pinPosition.MIN) {
        position = pinPosition.MIN;
      }
      if (position > pinPosition.MAX) {
        position = pinPosition.MAX;
      }

      pin.style.left = position + 'px';
      line.style.width = position + 'px';

      var filterChange = function (max, min, filter, filterPostfix) {
        var postFix = filterPostfix || '';
        var value = (max - min) * (position / pinPosition.MAX) + min;
        var change = '' + filter + '(' + value + postFix + ')';

        preview.style.filter = change;
        effectValue.value = change;
      };

      filterChange(1, 0, 'sepia');
      // filterChange(3, 1, 'brightness');
      // filterChange(100, 0, 'invert', '%');
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var effectList = document.querySelector('.effects__list');
  var upload = document.querySelector('.img-upload__overlay');
  // временно
  upload.classList.remove('hidden');

  var cheskScaleShow = function (elem) {
    return elem.value !== 'none' ? blockPin.classList.remove('hidden') : blockPin.classList.add('hidden');
  };

  effectList.addEventListener('click', function (evt) {
    var toggler = evt.target.closest('input');
    if (toggler) {
      preview.classList = 'img-upload__preview';
      preview.classList.add(filterCss[toggler.value].class);
      cheskScaleShow(toggler);
    }
  });
})();
