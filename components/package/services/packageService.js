(function () {
  var package = angular.module('learningSystem.package');
  package.service('packageService', ['$http',
                                                             '$stateParams',
                                                              function ($http,
                                                                             $stateParams) {

    var urlBase = 'http://localhost:3001';
    var packageService = {};

    packageService.getAll = function () {
      return $http.get(urlBase + '/packages');
    };

    return packageService;
  }]);
})();