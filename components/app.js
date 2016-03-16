(function () {
    var mainApp = angular.module('learningSystem', ['ui.router',
                                                                                       'ui.bootstrap',
                                                                                       'learningSystem.login'
                                                                                       'learningSystem.user',
                                                                                       'learningSystem.session',
                                                                                       'learningSystem.package',
                                                                                       'learningSystem.sessionResource',
                                                                                       'learningSystem.userPackage',
                                                                                       'learningSystem.userSession',
                                                                                       'learningSystem.userSessionToken']);

    mainApp.config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

          $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'Scripts/spa/components/dashboard/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .state('budget', {
                url: '/budget',
                templateUrl: 'Scripts/spa/components/budget/budget.html',
                controller: 'budgetCtrl'
            })
            .state('resources', {
                url: '/resources',
                templateUrl: 'Scripts/spa/components/staffing/views/indexProjectStaffing.html',
                controller: 'indexProjectStaffingController'
            })
            .state('roadmap', {
                url: '/roadmap',
                templateUrl: 'Scripts/spa/components/roadmap/roadmap.html',
                controller: 'roadmapCtrl'
            })
            .state('projects', {
              url: '/projects',
              templateUrl: 'Scripts/spa/components/projects/projects.html',
              controller: 'projectsCtrl'
            })
            .state('newProject', {
                url: '/projects/new',
                templateUrl: 'Scripts/spa/components/projects/views/newProject.html',
                controller: 'projectsCtrl'
            })
            .state('projectStaffingPlan', {
               url: '/project/:projectId/staffingPlan',
               templateUrl: 'Scripts/spa/components/staffing/views/projectStaffing.html',
               controller: 'projectStaffingController'
            })
            .state('editProject', {
              url: '/project/:projectId/edit',
              templateUrl: 'Scripts/spa/components/projects/views/newProject.html',
              controller: 'projectEditCtrl'
            })
           .state('viewProject', {
             url: '/project/:projectId/view/:tabActive',
             templateUrl: 'Scripts/spa/components/projects/views/viewProject.html',
             controller: 'projectViewCtrl'
            
           })

          $urlRouterProvider.otherwise('dashboard');
      }]);

    mainApp.directive('footer', function () {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/spa/views/footer.html',
            controller: function ($scope) {
             
            }
        }
    });
})();
