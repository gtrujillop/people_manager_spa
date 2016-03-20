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
    // Session is equivalent to a class.

    $scope.session = {};
    $scope.isLogged = $sessionStorage.isLogged;
    $scope.save = save;
    $scope.startSession = startSession;
    $scope.addSession = addSession;

    getPackages();
    getSubjects();
    listSessions();

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

    $scope.classPopover = {
      content: '',
      templateUrl: 'classPopoverTemplate.html',
      title: ''
    };

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
          toaster.pop('success', "", "Class saved succesfully.");
          $state.go('classindex');
        }).error(function(data){
          toaster.pop('error', "", "Could not save class.");
        })
      }
    };

    function addSession() {
      $state.go('newclass');
    }

    function startSession(index) {
      var sessionToStart = angular.copy($scope.sessions[index]);
      var id = sessionToStart.id;
      sessionToStart.has_started = true;
      sessionToStart.start_date = new Date();
      delete sessionToStart.package;
      delete sessionToStart.subject;
      sessionService.update(sessionToStart, id).success(function(data) {
          toaster.pop('success', "", "Class started from: " + data.start_date);
          $scope.sessions[index] = data;
      }).error(function() {
        toaster.pop('error', "", "Could not start this class.");
      })
    }

    function listSessions() {
      if ($state.current.name == 'classindex') {
        sessionService.getAll().success(function(data){
          $scope.sessions = data;
          if($scope.sessions.length < 1){
            toaster.pop('warning', "", "No classes available")
          }
        }).error(function(){
           toaster.pop('error', "", "Could not retrieve classes.");
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