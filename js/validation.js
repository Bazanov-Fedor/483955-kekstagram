'use strict';

(function () {
  var MAX_HESTAG = 5;
  var formSubmit = document.querySelector('#upload-submit');
  var inputHestag = document.querySelector('.text__hashtags');

  var getCheckHeshtag = function (heshtag) {
    if (heshtag[0] !== '#') {
      inputHestag.setCustomValidity('хэш-тег начинается с символа #');
      return false;
    } else if (heshtag.length === 1) {
      inputHestag.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      return false;
    } else if (heshtag.length > 20) {
      inputHestag.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      return false;
    } else if (heshtag.indexOf('#', 1) > 0) {
      inputHestag.setCustomValidity('хэш-теги разделяются пробелами');
      return false;
    }

    return true;
  };

  var getCheckForm = function (evt) {
    var hestags = inputHestag.value.toLowerCase().split(' ');

    for (var i = 0; i < hestags.length; i++) {
      var heshtagValid = getCheckHeshtag(hestags[i]);

      if (!heshtagValid) {
        break;
      }

      if (hestags.indexOf(hestags[i], i + 1) > 0) {
        inputHestag.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      }

      if (hestags.length > MAX_HESTAG) {
        inputHestag.setCustomValidity('хэштегов может быть максимум 5');
      }

      if (!inputHestag.validationMessage) {
        evt.preventDefault();
      }
    }
  };

  var clearCustomValidity = function () {
    inputHestag.setCustomValidity('');
  };

  formSubmit.addEventListener('click', getCheckForm);
  inputHestag.addEventListener('input', clearCustomValidity);
})();
