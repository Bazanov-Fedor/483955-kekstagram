'use strict';

(function () {
  var uploadPopap = document.querySelector('.img-upload__overlay');
  var uploadInput = document.querySelector('#upload-file');
  var btnCloseUpload = document.querySelector('.img-upload__cancel');
  var hashtegField = document.querySelector('.text__hashtags');
  var textarea = document.querySelector('.text__description');

  var onKeydownEscUpload = function (evt) {
    var noExitField = evt.target !== hashtegField && evt.target !== textarea;
    window.util.isKeydownEsc(evt, closeUpload, noExitField);
  };

  var closeUpload = function () {
    uploadInput.value = '';
    uploadPopap.classList.add('hidden');
    document.removeEventListener('keydown', closeUpload);
    btnCloseUpload.removeEventListener('click', closeUpload);
  };

  var openUpload = function () {
    uploadPopap.classList.remove('hidden');
    btnCloseUpload.addEventListener('click', closeUpload);
    document.addEventListener('keydown', onKeydownEscUpload);
  };

  uploadInput.addEventListener('change', openUpload);
})();

