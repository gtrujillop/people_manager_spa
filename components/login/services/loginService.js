(function () {
    var login = angular.module('learningSystem.login');
    login.service('loginService', ['$http',
                                   '$rootScope',
                                   '$stateParams',
                                   'loginFactory',
                                   function ($http,
                                             $rootScope,
                                             $stateParams,
                                             loginFactory) {

    var urlBase = 'http://192.168.56.101:3001';
    var loginService = {};

    loginService.login = function (user) {
      return $http.post(urlBase + '/auth', user);
    };

    return loginService;
  }]);
})();
