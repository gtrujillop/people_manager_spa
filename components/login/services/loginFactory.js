(function () {
  var login = angular.module('learningSystem.login');
  login.factory("loginFactory", [function() {

    var factory = {
      authToken: {},
      isLogged: {}
    };

    factory.isLogged = false;

    factory.getAuthToken = function () {
      return factory.authToken;
    };

    factory.getAuthStatus = function () {
      return factory.isLogged;
    };

    factory.setAuthToken = function (token) {
      factory.authToken = token;
    };

    factory.setAuthStatus = function (status) {
      factory.isLogged = status;
    };

    return factory;
  }]);
})();
