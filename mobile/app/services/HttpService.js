var humps = require('humps');

class HttpService {
  constructor(url) {
    this.url = url;
  }

  get(callback) {
    return fetch(this.url)
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
