'use strict';

var fs = require('fs');
var q = require('q');

var config = require('./config');
var utils = require('./utils');
var oauth2 = require('./oauth2');

oauth2.init();

function authorize() {
  var defer = q.defer();

  if (oauth2.ready() === false) {
      defer.resolve({
        authorized: false
      });
  }

  utils
    .readFile(config.TOKEN_PATH)
    .then(function(content) {
      var token = JSON.parse(content);
      oauth2.set({credentials: token});

      defer.resolve({
        authorized: true
      });
    }, function() {
      defer.resolve({
        authorized: false
      });
    });

  return defer.promise;
}

function getNewAuthorizationUrl() {
  var oauth2Client = oauth2.get(),
      authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: config.SCOPES
      });

  return authUrl;
}


function ready() {
  return oauth2.ready();
}

module.exports = {
  authorize: authorize,
  getNewAuthorizationUrl: getNewAuthorizationUrl,
  setToken: oauth2.setToken,
  removeToken: oauth2.removeToken,
  ready: ready
};