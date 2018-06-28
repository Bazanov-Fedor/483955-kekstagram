'use strict';

(function () {
  var hestagData = {
    START_POSITION: 0,
    MAX_COUNT: 5,
    MIN_LENGTH: 1,
    MAX_LENGTH: 20,
    VALID_POSITION: 1
  };

  var formSubmit = document.querySelector('#upload-submit');
  var inputHestag = document.querySelector('.text__hashtags');

  var getCheckHeshtag = function (heshtag) {
    if (heshtag[hestagData.START_POSITION] !== '#') {
      inputHestag.setCustomValidity('хэш-тег начинается с символа #');
      return false;
    } else if (heshtag.length === hestagData.MIN_LENGTH) {
      inputHestag.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      return false;
    } else if (heshtag.length > hestagData.MAX_LENGTH) {
      inputHestag.setCustomValidity('максимальная длина одного хэш-тега ' + hestagData.MAX_LENGTH + ' символов, включая решётку');
      return false;
    } else if (heshtag.indexOf('#', hestagData.VALID_POSITION) > 0) {
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

      var hextStep = i + 1;
      if (hestags.indexOf(hestags[i], hextStep) > 0) {
        inputHestag.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      }

      if (hestags.length > hestagData.MAX_COUNT) {
        inputHestag.setCustomValidity('хэштегов может быть максимум ' + hestagData.MAX_COUNT);
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
