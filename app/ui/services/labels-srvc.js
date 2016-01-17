'use strict';

var labels = require('./backend/labels.js');

angular
    .module('GClientApp')
    .service('labelsSrvc', function() {
        function list() {
            return labels.list();   
        }

        return {
            list: list
        };
    });