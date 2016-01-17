angular
  .module('GClientApp')
  .config(function($stateProvider, $urlRouterProvider, DEFAULT_STATE) {
    $urlRouterProvider.otherwise('/' + DEFAULT_STATE);
    $urlRouterProvider.when('/', '/' + DEFAULT_STATE);
    
    $stateProvider
      .state('init', {
        url: '/init',
        templateUrl: 'ui/states/init/init.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'ui/states/login/login.html'
      })
      .state('labels', {
        url: '/labels',
        templateUrl: 'ui/states/labels/labels.html'
      });
  });