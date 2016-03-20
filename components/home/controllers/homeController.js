(function () {
  var login = angular.module("learningSystem.home")
  login.controller("homeController", ["$scope",
                                       "loginService",
                                       "loginFactory",
                                       "$state",
                                       "$sessionStorage",
                                       function($scope,
                                                loginService,
                                                loginFactory,
                                                $state,
                                                $sessionStorage) {

    $scope.user = $sessionStorage.user;
    $scope.isLogged = $sessionStorage.isLogged;

   $scope.$watch(function(){return loginFactory.isLogged}, function(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.user = $sessionStorage.user;
            $scope.isLogged = $sessionStorage.isLogged;
        }
    }, true);

  }]);
})();
