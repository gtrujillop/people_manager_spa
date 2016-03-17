(function () {
  var session = angular.module('learningSystem.session');
  session.controller("sessionController", ["$scope",
                                                                 "sessionService",
                                                                 "sessionFactory", 
                                                                 "packageService",
                                                                 "subjectService",
                                                                 "$state",
                                                                 "toaster",
                                                                 "$sessionStorage",
                                                                 function($scope,
                                                                                sessionService,
                                                                                sessionFactory,
                                                                                packageService,
                                                                                subjectService,
                                                                                $state,
                                                                                toaster,
                                                                                $sessionStorage) {
    $scope.session = {};
    $scope.isLogged = $sessionStorage.isLogged;
    $scope.save = save;

    getPackages();
    getSubjects();

    $scope.$watch($scope.packages, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          $scope.packages = newValue;
        }
    }, true);

    $scope.$watch($scope.subjects, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          $scope.subjects = newValue;
        }
    }, true);

    $scope.dateOptions = {
      formatYear: 'YYYY',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    $scope.dateFormat = 'shortDate';

    $scope.openDate1 = function() {
      $scope.date1.opened = true;
    };

    $scope.openDate2 = function() {
      $scope.date2.opened = true;
    };

    $scope.date1 = {
      opened: false
    };

    $scope.date2 = {
      opened: false
    };

    function save(formIsValid) {
      if (formIsValid) {
        sessionService.save($scope.session).success(function(data){
          toaster.pop('success', "", "Class saved succesfully");
        }).error(function(data){
          toaster.pop('error', "", "Could not save class.");
        })
      }
    };

    function getPackages() {
      packageService.getAll().success(function(data){
        $scope.packages = data;
        if ($scope.packages.length < 1) {
          toaster.pop('warning', "", "No packages available")
        }
      }).error(function() {
         toaster.pop('error', "", "Could not retrieve packages.");
      })
    }; 

    function getSubjects() {
      subjectService.getAll().success(function(data){
        $scope.subjects = data;
        if ($scope.subjects.length < 1) {
          toaster.pop('warning', "", "No subjects available")
        }
      }).error(function() {
         toaster.pop('error', "", "Could not retrieve subjects.");
      })
    };     

  }]);

})();