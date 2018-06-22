'use strict';

(function () {

  var preview = document.querySelector('.img-upload__preview');
  var effectList = document.querySelector('.effects__list');

  var filterCss = {
    none: 'effects__preview effects__preview--none',
    chrom: 'effects__preview effects__preview--chrome',
    sepia: 'effects__preview effects__preview--sepia',
    invert: 'effects__preview effects__preview--marvin',
    blur: 'effects__preview effects__preview--phobos',
    brightness: 'effects__preview effects__preview--heat'
  };

  effectList.addEventListener('click', function (evt) {
    var toggler = evt.target.closest('span');
    if (toggler) {
      switch (toggler.className) {
        case 'effects__preview effects__preview--none':
          preview.className = filterCss.none;
          break;
        case 'effects__preview effects__preview--chrome':
          preview.className = filterCss.chrom;
          break;
        case 'effects__preview effects__preview--sepia':
          preview.className = filterCss.sepia;
          break;
        case 'effects__preview effects__preview--marvin':
          preview.className = filterCss.invert;
          break;
        case 'effects__preview effects__preview--phobos':
          preview.className = filterCss.blur;
          break;
        case 'effects__preview effects__preview--heat':
          preview.className = filterCss.brightness;
          break;

        default:
          break;
      }
    }
  });
})();
