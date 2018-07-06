'use strict';

(function () {
  var uploadPopap = document.querySelector('.img-upload__overlay');
  var uploadInput = document.querySelector('#upload-file');
  var btnCloseUpload = document.querySelector('.img-upload__cancel');
  var textarea = document.querySelector('.text__description');
  var inputHashtag = document.querySelector('.text__hashtags');
  var form = document.querySelector('.img-upload__form');

  var closeUpload = function () {
    uploadPopap.classList.add('hidden');
    document.removeEventListener('keydown', closeUpload);
    btnCloseUpload.removeEventListener('click', closeUpload);
    form.reset();
  };

  var onKeydownEsc = function (evt) {
    window.util.isKeydownEsc(evt, closeUpload);
  };

  var openUpload = function () {
    uploadPopap.classList.remove('hidden');
    btnCloseUpload.addEventListener('click', closeUpload);
    document.addEventListener('keydown', onKeydownEsc);
  };

  var onInputFocus = function () {
    document.removeEventListener('keydown', onKeydownEsc);
  };

  var onInputBlur = function () {
    document.addEventListener('keydown', onKeydownEsc);
  };

  uploadInput.addEventListener('change', openUpload);
  inputHashtag.addEventListener('focus', onInputFocus);
  inputHashtag.addEventListener('blur', onInputBlur);
  textarea.addEventListener('focus', onInputFocus);
  textarea.addEventListener('blur', onInputBlur);

  window.upload = {
    closeUpload: closeUpload
  };
})();

