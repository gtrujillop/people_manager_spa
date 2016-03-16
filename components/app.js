(function () {
    var mainApp = angular.module('learningSystem', ['ui.router',
                                                                                       'ui.bootstrap',
                                                                                       'learningSystem.login'
                                                                                       // 'learningSystem.user',
                                                                                       // 'learningSystem.session',
                                                                                       // 'learningSystem.package',
                                                                                       // 'learningSystem.sessionResource',
                                                                                       // 'learningSystem.userPackage',
                                                                                       // 'learningSystem.userSession',
                                                                                       // 'learningSystem.userSessionToken'
                                                                                       ]);

    mainApp.config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

          $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'components/login/views/home.html',
                controller: 'homeCtrl'
            })
          $urlRouterProvider.otherwise('home');
      }]);
})();
