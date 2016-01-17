
angular
    .module('GClientApp', [
        'ui.router'
    ])
    .constant('DEFAULT_STATE', 'labels')
    .run(function($rootScope, $state, $log, authSrvc) {
        $rootScope.$on('$stateChangeSuccess', function() {
            var stateName = $state.current.name;

            if (authSrvc.ready() === false) {
                $state.go('init');
            } else if (stateName !== 'login' && stateName !== 'init') {
                authSrvc
                    .authorize()
                    .then(function(data) {
                        if (!data.authorized) {
                            $log.debug('to [' + stateName + ']: not logged');
                            $state.go('login');
                        } else {
                            $log.debug('to [' + stateName + ']: logged in');
                        }
                    }, function(err) {
                        $log.debug('something went wrong while authorization');
                        $state.go('login');
                    });
            }
        });
    });