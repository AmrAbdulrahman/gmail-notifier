'use strict';

var q = require('q');
var google = require('googleapis');

var oauth2 = require('./oauth2');

function list() {
  var defer = q.defer(),
      auth = oauth2.get(),
      gmail = google.gmail('v1');

  gmail.users.messages.list({
    auth: auth,
    userId: 'me',
  }, function(err, response) {
    if (err) {
      defer.reject('The API returned an error: ' + err);
      return;
    }

    defer.resolve(response.messages);
  });

  return defer.promise;
}


function get(id) {
  console.log('getting id: ' + id);
  var defer = q.defer(),
      auth = oauth2.get(),
      gmail = google.gmail('v1');

  gmail.users.messages.get({
    auth: auth,
    userId: 'me',
    id: id,
    query: '?maxResults=10'
  }, function(err, response) {
    console.log(err, response);
    if (err) {
      defer.reject('The API returned an error: ' + err);
      return;
    }
    console.log('resolving: ', response);
    defer.resolve(response);
  });

  return defer.promise;
}

module.exports = {
  list: list,
  get: get
};