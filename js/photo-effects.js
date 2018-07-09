'use strict';

(function () {
  var pinPosition = {
    MIN: 0,
    MAX: 450
  };

  var FilterCss = {
    none: {
      class: 'effects__preview--none'
    },
    chrome: {
      class: 'effects__preview--chrome',
      css: 'grayscale',
      max: 1,
      min: 0
    },
    sepia: {
      class: 'effects__preview--sepia',
      css: 'sepia',
      max: 1,
      min: 0
    },
    marvin: {
      class: 'effects__preview--marvin',
      css: 'invert',
      max: 100,
      min: 0,
      postFix: '%'
    },
    phobos: {
      class: 'effects__preview--phobos',
      css: 'blur',
      max: 3,
      min: 0,
      postFix: 'px'
    },
    heat: {
      class: 'effects__preview--heat',
      css: 'brightness',
      max: 3,
      min: 1
    }
  };

  var preview = document.querySelector('.img-upload__preview');
  var effectValue = document.querySelector('[name="effect-level"]');
  var line = document.querySelector('.scale__line');
  var pin = document.querySelector('.scale__pin');
  var blockPin = document.querySelector('.img-upload__scale');
  var effectList = document.querySelector('.effects__list');

  var makeValueFilter = function (value) {
    pin.style.left = value + 'px';
    line.style.width = value + 'px';
  };

  var filterChange = function (max, min, filter, position, filterPostfix) {
    var postFix = filterPostfix || '';
    var value = (max - min) * (position / pinPosition.MAX) + min;
    var change = '' + filter + '(' + value + postFix + ')';

    preview.style.filter = change;
    effectValue.value = value;
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var selectedFilter = document.querySelector('input[type="radio"]:checked').value;
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

      makeValueFilter(position);
      filterChange(FilterCss[selectedFilter].max, FilterCss[selectedFilter].min, FilterCss[selectedFilter].css, position, FilterCss[selectedFilter].postFix);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var cheskScaleShow = function (elem) {
    return elem.value !== 'none' ? blockPin.classList.remove('hidden') : blockPin.classList.add('hidden');
  };

  effectList.addEventListener('click', function (evt) {
    var toggler = evt.target.closest('input');
    if (toggler) {
      makeValueFilter(pinPosition.MAX);
      preview.classList = 'img-upload__preview';
      preview.removeAttribute('style');
      preview.classList.add(FilterCss[toggler.value].class);
      cheskScaleShow(toggler);
    }
  });

  var makeDeafultFilter = function () {
    makeValueFilter(pinPosition.MAX);
    preview.removeAttribute('style');
    blockPin.classList.add('hidden');
    preview.classList = 'img-upload__preview';
    // effectValue.value = '100';
  };

  window.photoEffect = {
    makeDeafultFilter: makeDeafultFilter
  };
})();
