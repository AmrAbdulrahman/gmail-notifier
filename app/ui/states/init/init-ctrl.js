angular
    .module('GClientApp')
    .controller('InitCtrl', function($state, $interval, authSrvc, DEFAULT_STATE) {
        
        var checkHandle = $interval(function() {
            if (authSrvc.ready() === true) {
                $state.go(DEFAULT_STATE);
                $interval.cancel(checkHandle);
            } else {
                console.log('initializing...');
            }
        }, 500);
    });