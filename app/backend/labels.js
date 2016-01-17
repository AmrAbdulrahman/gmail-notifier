'use strict';

var q = require('q');
var google = require('googleapis');

var oauth2 = require('./oauth2');

function list() {
  var defer = q.defer(),
      auth = oauth2.get(),
      gmail = google.gmail('v1');

  gmail.users.labels.list({
    auth: auth,
    userId: 'me',
  }, function(err, response) {
    if (err) {
      defer.reject('The API returned an error: ' + err);
      return;
    }

    defer.resolve(response.labels);
  });

  return defer.promise;
}

module.exports = {
  list: list
};