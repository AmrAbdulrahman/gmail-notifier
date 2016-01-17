'use strict';

var messages = require('./backend/messages.js');

angular
    .module('GClientApp')
    .service('messagesSrvc', function() {
        function list() {
            return messages.list();   
        }

        function get(id) {
            return messages.get(id);   
        }

        return {
            list: list,
            get: get
        };
    });