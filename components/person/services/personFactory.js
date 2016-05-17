(function () {
  var person = angular.module('peopleManager.person');
  person.service('personService', ['$http',
                                   '$stateParams',
                                   function ($http,                                                                   $stateParams) {
    var urlBase = 'http://localhost:3000';
    var personService = {};

    personService.getAll = function () {
      return $http.get(urlBase + '/people');
    };

    personService.getById = function (personId) {
      return $http.get(urlBase + '/people/' + personId);
    };
    
    personService.destroy = function (personId) {
      return $http.delete(urlBase + '/people/' + personId);
    };

    personService.save = function(person) {
      if (person.id !== undefined) {
        return $http.put(urlBase + '/people/' + person.id  , { person: person })
      } else {
        return $http.post(urlBase + '/people', { person: person })
      }
    }

    return personService;
  }]);
})();
