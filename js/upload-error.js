'use strict';

(function () {
  var ErrorData = {
    ELEMENT: 'div',
    CSS_CLASS: 'error__upload',
    MESSAGE_ERROR: 'При загрузке произошла ошибка. Попробуйте ещё раз поздее!',
    TIMEOUT_SHOW_ERROR: 3000
  };

  var getErrorHendler = function () {
    var errorBlock = document.createElement(ErrorData.ELEMENT);
    errorBlock.textContent = ErrorData.MESSAGE_ERROR;
    errorBlock.className = ErrorData.CSS_CLASS;
    document.body.appendChild(errorBlock);
    window.upload.closeUploadOverlay();

    setTimeout(function () {
      document.body.removeChild(errorBlock);
    }, ErrorData.TIMEOUT_SHOW_ERROR);
  };

  window.uploadError = {
    onErrorUploadFile: getErrorHendler
  };
})();
