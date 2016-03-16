(function () {
  var login = angular.module("learningSystem.login")
  login.controller("loginController", ["$scope",
                                       "loginService",
                                       "loginFactory",
                                       "$state",
                                       "toaster",
                                       function($scope,
                                                loginService,
                                                loginFactory,
                                                $state,
                                                toaster) {

    $scope.isLogged = loginFactory.getAuthStatus();
    console.log($scope.isLogged);
    $scope.user = {};
    $scope.user.username = '';
    $scope.user.password = '';

    $scope.login = login;

    function login(validForm) {
      if (validForm) {
        loginService.login($scope.user)
        .success(function(data) {
          loginFactory.setAuthToken(data.auth_token);
          loginFactory.setAuthStatus(true);
          $scope.status = 'Successfully logged in.'
          toaster.pop('success', "", $scope.status);
        }).error(function() {
          loginFactory.setAuthStatus(false);
          $scope.status = 'user does not exist.'
          toaster.pop('error', "", $scope.status);
        });
      }
    }


  }]);
})();
