'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var SERVER_TIMEOUT = 10000;

  var Status = {
    SUCCESS: 200,
    ERROR: 400,
    NOT_FOUND: 404
  };

  var Message = {
    ERROR: 'Произошла ошибка соединения',
    ERROR_TIME: 'Запрос не успел выполниться за ',
    ERROR_REQUEST: 'Ошибка запроса',
    NOTHING_FOUND: 'Ничего не найденно',
    STATUS: 'Cтатус ответа: '
  };

  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('error', function () {
      onError(Message.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(Message.ERROR_TIME + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case Status.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Status.ERROR:
          onError(Message.ERROR_REQUEST);
          break;
        case Status.NOT_FOUND:
          onError(Message.NOTHING_FOUND);
          break;

        default:
          error = Message.STATUS + xhr.status + ' ' + xhr.statusText;
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
