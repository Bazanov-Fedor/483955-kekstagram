'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var SERVER_TIMEOUT = 10000;

  var status = {
    SUCCESS: 200,
    ERROR: 400,
    NOT_FOUND: 404
  };

  var MESSAGES = {
    ERROR: 'Произошла ошибка соединения',
    ERROR_TIME: 'Запрос не успел выполниться за ',
    ERROR_REQUEST: 'Ошибка запроса',
    NOTHING_FOUND: 'Ничего не найденно',
    STATUS: 'Cтатус ответа: '
  };

  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('error', function () {
      onError(MESSAGES.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(MESSAGES.ERROR_TIME + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case status.SUCCESS:
          onSuccess(xhr.response);
          break;
        case status.ERROR:
          onError(MESSAGES.ERROR_REQUEST);
          break;
        case status.NOT_FOUND:
          onError(MESSAGES.NOTHING_FOUND);
          break;

        default:
          error = MESSAGES.STATUS + xhr.status + ' ' + xhr.statusText;
          break;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.responseType = 'json';
    return xhr;
  };

  var onRequestLoad = function (onSuccess, onError) {
    var xhr = makeRequest(onSuccess, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var onRequestUpload = function (file, onSuccess, onError) {
    var xhr = makeRequest(onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(file);
  };

  var onErrorRequest = function (message) {
    var popup = document.createElement('div');
    var p = document.createElement('p');
    var btnClose = document.createElement('button');

    popup.className = 'popup-error';
    btnClose.className = 'btn-error';
    btnClose.textContent = 'ок';
    p.textContent = message;

    popup.appendChild(p);
    popup.appendChild(btnClose);
    document.body.appendChild(popup);

    btnClose.addEventListener('click', function () {
      document.body.removeChild(popup);
    });
  };

  window.backend = {
    onErrorRequest: onErrorRequest,
    onRequestLoad: onRequestLoad,
    onRequestUpload: onRequestUpload,
  };

})();
