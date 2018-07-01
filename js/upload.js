'use strict';

(function () {
  var uploadPopap = document.querySelector('.img-upload__overlay');
  var uploadInput = document.querySelector('#upload-file');
  var btnCloseUpload = document.querySelector('.img-upload__cancel');

  var closeUpload = function () {
    uploadInput.value = '';
    uploadPopap.classList.add('hidden');
    document.removeEventListener('keydown', closeUpload);
    btnCloseUpload.removeEventListener('click', closeUpload);
  };

  var onKeydownEsc = function (evt) {
    if (evt.target.tagName !== 'INPUT') {
      window.util.isKeydownEsc(evt, closeUpload);
    }
  };

  var openUpload = function () {
    uploadPopap.classList.remove('hidden');
    btnCloseUpload.addEventListener('click', closeUpload);
    document.addEventListener('keydown', onKeydownEsc);
  };

  uploadInput.addEventListener('change', openUpload);
})();

