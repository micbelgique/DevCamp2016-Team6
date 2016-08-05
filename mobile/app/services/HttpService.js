var humps = require('humps');

class HttpService {
  constructor(url) {
    this.url = url;
  }

  get(request, callback) {
    requestString = this._stringify(request)

    console.log(this.url + '?' + requestString);

    return fetch(this.url + '?' + requestString)
             .then(this._parseJSON)
             .then(data => {
               if(callback) {
                 callback(humps.camelizeKeys(data));
               }
             })
  }

  put(request, callback) {
    return this._postOrPutRequest(request, 'PUT', callback);
  }

  post(request, callback) {
    return this._postOrPutRequest(request, 'POST', callback);
  }

  _stringify(request) {
    var requestString = "";

    for (var key in request) {
      if (requestString != "")
        requestString += "&";
      requestString += key + "=" + encodeURIComponent(request[key]);
    }

    return requestString;
  }

  _parseJSON(response) {
    return response.json()
  }

  _postOrPutRequest(request, type, callback) {
    return fetch(this.url, {
      method: type,
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(humps.decamelizeKeys(request))
    }).then(this._parseJSON)
      .then(data => {
        if(callback) {
          callback(humps.camelizeKeys(data));
        }
      })
  }
}

module.exports = HttpService;
