'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserPhoto = document.querySelector('#upload-file');
  var photoPreview = document.querySelector('.img-upload__preview img');
  var effectList = document.querySelectorAll('.effects__preview');

  var mutchesNameFiles = function (name) {
    return FILE_TYPES.some(function (it) {
      return name.endsWith(it);
    });
  };

  var uploadPhoto = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = mutchesNameFiles(fileName);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.src = reader.result;

        [].forEach.call(effectList, function (effectPreview) {
          effectPreview.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });

      reader.readAsDataURL(file);
    }
  };

  var onPhotoChange = function () {
    var file = fileChooserPhoto.files[0];
    uploadPhoto(file);
  };

  fileChooserPhoto.addEventListener('change', onPhotoChange);
})();
