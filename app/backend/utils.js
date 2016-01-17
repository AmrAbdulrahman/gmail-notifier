'use strict';

var fs = require('fs');
var q = require('q');

function readFile(filePath) {
    var defer = q.defer();

    fs.readFile(filePath, function(err, content) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(content);
        }
    });

    return defer.promise;
}

module.exports = {
    readFile: readFile
};