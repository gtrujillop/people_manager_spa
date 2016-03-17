(function () {
  var session = angular.module('learningSystem.session');
  session.service('sessionService', ['$http',
                                                         '$stateParams',
                                                          function ($http,
                                                                         $stateParams) {

    var urlBase = 'http://localhost:3001';
    var sessionService = {};

    sessionService.save = function (session) {
      return $http.post(urlBase + '/sessions', { session: session });
    };

    return sessionService;
  }]);
})();10