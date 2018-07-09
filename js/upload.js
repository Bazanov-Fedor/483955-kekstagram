'use strict';

(function () {
  var uploadPopap = document.querySelector('.img-upload__overlay');
  var uploadInput = document.querySelector('#upload-file');
  var btnCloseUpload = uploadPopap.querySelector('.img-upload__cancel');
  var textarea = uploadPopap.querySelector('.text__description');
  var inputHashtag = uploadPopap.querySelector('.text__hashtags');
  var form = document.querySelector('.img-upload__form');

  var closeUploadOverlay = function () {
    uploadPopap.classList.add('hidden');
    btnCloseUpload.removeEventListener('click', closeUploadOverlay);
    document.removeEventListener('keydown', onOverlayKeydownEsc);
    form.reset();
  };

  var onOverlayKeydownEsc = function (evt) {
    window.util.isKeydownEsc(evt, closeUploadOverlay);
  };

  var onUploadInputChange = function () {
    uploadPopap.classList.remove('hidden');
    btnCloseUpload.addEventListener('click', closeUploadOverlay);
    document.addEventListener('keydown', onOverlayKeydownEsc);
    window.photoEffect.makeDeafultFilter();
  };

  var onInputFocus = function () {
    document.removeEventListener('keydown', onOverlayKeydownEsc);
  };

  var onInputBlur = function () {
    document.addEventListener('keydown', onOverlayKeydownEsc);
  };

  uploadInput.addEventListener('change', onUploadInputChange);
  inputHashtag.addEventListener('focus', onInputFocus);
  inputHashtag.addEventListener('blur', onInputBlur);
  textarea.addEventListener('focus', onInputFocus);
  textarea.addEventListener('blur', onInputBlur);

  window.upload = {
    closeUploadOverlay: closeUploadOverlay
  };
})();
