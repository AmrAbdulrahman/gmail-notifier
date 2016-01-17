angular
    .module('GClientApp')
    .controller('HeaderCtrl', function($scope, $state, authSrvc) {
        $scope.logout = function() {
            authSrvc.logout();
            $state.go('login');        
        };
    });