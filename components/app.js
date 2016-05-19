(function () {
  var mainApp = angular.module('peopleManager', ['ui.router',
                                                                            'ui.gravatar',
                                                                            'ui.bootstrap',
                                                                            'ngStorage',
                                                                            'toaster',
                                                                            'peopleManager.person']);

  mainApp.run(['$state', function ($state) {
     $state.transitionTo('listpeople');
  }]);

  mainApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('newperson', {
              url: '/people/new',
              templateUrl: '/person/views/newPerson.html',
              controller: 'personController'
          })
          .state('listpeople', {
              url: '/people',
              templateUrl: '/person/views/personList.html',
              controller: 'personController'
          })
          .state('editperson', {
            url: '/people/:id/edit',
              templateUrl: '/person/views/editPerson.html',
              controller: 'personController'
          })
          .state('personprofile', {
            url: '/people/:id',
              templateUrl: '/person/views/showPerson.html',
              controller: 'personController'
          })
        $urlRouterProvider.otherwise('listpeople');
    }]);
})();
