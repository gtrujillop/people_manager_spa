(function () {
   var user = angular.module('learningSystem.user');
   user.factory("userFactory", [function() {

    var factory = {
      user: {},
    };

    factory.getUser = function () {
      return factory.user;
    };

    factory.setUser = function(user) {
      factory.user = user;
    }

    return factory;
  }]);
 })();
