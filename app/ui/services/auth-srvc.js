'use strict';

var auth = require('./backend/auth.js');

angular
    .module('GClientApp')
    .service('authSrvc', function() {
        function authorize() {
            return auth.authorize();
        }

        function getNewAuthorizationUrl() {
            return auth.getNewAuthorizationUrl();
        }

        function login(code) {
            return auth.setToken(code);
        }

        function logout() {
            return auth.removeToken();
        }

        function ready() {
            return auth.ready();
        }

        return {
            authorize: authorize,
            getNewAuthorizationUrl: getNewAuthorizationUrl,
            login: login,
            logout: logout,
            ready: ready
        };
    });