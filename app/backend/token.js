'use strict';

var fs = require('fs');
var q = require('q');

var config = require('./config');
var utils = require('./utils');

function get() {
  var defer = q.defer();

  utils
    .readFile(config.TOKEN_PATH)
    .then(function(content) {
      var token = JSON.parse(content);
      defer.resolve(token);
    }, function() {
      defer.resolve();
    });

  return defer.promise;
}

function save(token) {
  try {
    fs.mkdirSync(config.TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  
  fs.writeFile(config.TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + config.TOKEN_PATH);
}

function remove() {
  try {
    fs.unlinkSync(config.TOKEN_PATH);
    fs.rmdirSync(config.TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  } 
}


module.exports = {
  get: get,
  remove: remove,
  save: save
};