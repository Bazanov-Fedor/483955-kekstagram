'use strict';

(function () {
  var inputHashtag = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('#upload-submit');
  var form = document.querySelector('.img-upload__form');
  var imgError = document.querySelector('.img-upload__message--error');

  var HestagData = {
    START_POSITION: 0,
    MAX_COUNT: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    VALID_POSITION: 1
  };

  var Message = {
    HESTAG_START: 'Хэш-тег начинается с символа #',
    HESTAG_MIN_SYMBOL: 'Хеш-тег не может состоять только из одной решётки',
    HESTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега ',
    HESTAG_VALUE_INCLUSIVE: ' имволов, включая решётку',
    HESTAG_NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    HESTAG_MAX_NUMBER: 'Хэштегов может быть максимум ',
    HESTAG_SEPARATOR: 'Хэш-теги разделяются пробелами'
  };

  var validateHashtag = function (hashtag) {
    if (hashtag[HestagData.START_POSITION] !== '#') {
      inputHashtag.setCustomValidity(Message.HESTAG_START);
      return false;
    } else if (hashtag.length < HestagData.MIN_LENGTH) {
      inputHashtag.setCustomValidity(Message.HESTAG_MIN_SYMBOL);
      return false;
    } else if (hashtag.length > HestagData.MAX_LENGTH) {
      inputHashtag.setCustomValidity(Message.HESTAG_MAX_LENGTH + HestagData.MAX_LENGTH + Message.HESTAG_VALUE_INCLUSIVE);
      return false;
    } else if (hashtag.indexOf('#', HestagData.VALID_POSITION) > 0) {
      inputHashtag.setCustomValidity(Message.HESTAG_SEPARATOR);
      return false;
    }
    return true;
  };

  var showErrorImage = function () {
    imgError.classList.remove('hidden');
  };

  var onSubmitButtonClick = function (evt) {
    if (inputHashtag.value !== '') {
      var hashtagArray = inputHashtag.value.toLowerCase().split(' ');
      for (var i = 0; i < hashtagArray.length; i++) {
        var isHashtagValid = validateHashtag(hashtagArray[i]);
        if (!isHashtagValid) {
          break;
        }
        var positionNextHashtag = i + 1;
        if (hashtagArray.indexOf(hashtagArray[i], positionNextHashtag) > 0) {
          inputHashtag.setCustomValidity(Message.HESTAG_NO_REPEAT);
          break;
        }
      }
      if (hashtagArray.length > HestagData.MAX_COUNT) {
        inputHashtag.setCustomValidity(Message.HESTAG_MAX_NUMBER + HestagData.MAX_COUNT);
      }
    }

    if (!inputHashtag.validationMessage) {
      evt.preventDefault();
      var formData = new FormData(form);
      window.backend.onRequestUpload(formData, window.upload.closeUploadOverlay, showErrorImage);
    }
  };

  var onInputInput = function () {
    inputHashtag.setCustomValidity('');
  };

  submitButton.addEventListener('click', onSubmitButtonClick);
  inputHashtag.addEventListener('input', onInputInput);
})();
