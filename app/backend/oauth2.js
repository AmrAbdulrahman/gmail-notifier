'use strict';
/*
Sigelton module exposes or creates OAuth2
*/

var googleAuth = require('google-auth-library');
var q = require('q');

var config = require('./config');
var utils = require('./utils');
var token = require('./token');

var oauth2Client = null,
    initialized = false;

function init() {
    utils
        .readFile(config.CLIENT_SECRET)
        .then(function(content) {
            var credentials = JSON.parse(content);
            var clientSecret = credentials.installed.client_secret;
            var clientId = credentials.installed.client_id;
            var redirectUrl = credentials.installed.redirect_uris[0];
            var auth = new googleAuth();
            oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

            token
                .get()
                .then(function(data) {
                    if (data) {
                        oauth2Client.credentials = data;
                    }

                    initialized = true;
                });
        });
}

function get() {
    if (initialized === false) {
        throw 'OAuth not initialized yet!'
    }

    return oauth2Client;
}

function set(obj) {
    if (initialized === false) {
        throw 'OAuth not initialized yet!';
    }

    for (var key in obj) {
        oauth2Client[key] = obj[key];
    }

    return oauth2Client;
}

function setToken(code) {
    if (initialized === false) {
        throw 'OAuth not initialized yet!'
    }

    var defer = q.defer();

    oauth2Client
        .getToken(code, function(err, token_) {
            if (err) {
                defer.reject(err);
            } else {
                set({credentials: token_});
                token.save(token_);
                defer.resolve();
            }
        });

    return defer.promise;
}

function removeToken() {
    token.remove();
    delete oauth2Client['credentials'];
}

function ready() {
    return initialized === true;
}

module.exports = {
    init: init,
    get: get,
    set: set,
    setToken: setToken,
    removeToken: removeToken,
    ready: ready
};