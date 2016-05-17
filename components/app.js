(function () {
  var mainApp = angular.module('peopleManager', ['ui.router',
                                                 'ui.bootstrap',
                                                 'ngStorage',
                                                 'toaster',
                                                 'peopleManager.person']);


  mainApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('newPerson', {
              url: '/persons/new',
              templateUrl: '/person/views/newPerson.html',
              controller: 'personController'
          })
          .state('listPersons', {
              url: '/persons',
              templateUrl: '/person/views/personList.html',
              controller: 'personController'
          })
          .state('editPerson', {
            url: '/persons/:id/edit',
              templateUrl: '/person/views/editPerson.html',
              controller: 'personController'
          })
          .state('personProfile', {
            url: '/persons/:id',
              templateUrl: '/person/views/showPerson.html',
              controller: 'personController'
          })
        $urlRouterProvider.otherwise('listPersons');
    }]);
})();
