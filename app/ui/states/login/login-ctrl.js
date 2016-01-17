'use strict';

angular
    .module('GClientApp')
    .controller('LoginCtrl', function($scope, $state, authSrvc, DEFAULT_STATE) {
        if (authSrvc.ready() === true) {
            $scope.authorizationUrl = authSrvc.getNewAuthorizationUrl();
        }

        $scope.login = function() {
            $scope.loading = true;

            authSrvc
                .login($scope.authorizationCode)
                .then(function() {
                    $state.go(DEFAULT_STATE);
                }, function(err) {
                    $scope.error = true;
                })['finally'](function() {
                    $scope.loading = false;
                });
        };
    });