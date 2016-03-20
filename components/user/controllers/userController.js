(function () {
  var user = angular.module('learningSystem.user');
  user.controller("userController", ["$scope",
                                                                     "userService",
                                                                     "packageService",
                                                                     "$state",
                                                                     "toaster",
                                                                     "$sessionStorage",
                                                                     function($scope,
                                                                                    userService,
                                                                                    packageService,
                                                                                    $state,
                                                                                    toaster,
                                                                                    $sessionStorage) {

    $scope.user = {is_admin: 0};
    $scope.isLogged = $sessionStorage.isLogged;
    $scope.save = save;
    $scope.addUser= addUser;

    listUsers();

    $scope.userPopover = {
      content: '',
      templateUrl: 'userPopoverTemplate.html',
      title: ''
    };

    function save(formIsValid) {
      if (formIsValid) {
        userService.save($scope.user).success(function(data){
          toaster.pop('success', "", "user created succesfully.");
          $state.go('userindex');
        }).error(function(data){
          toaster.pop('error', "", "Could not save user.");
        })
      }
    };

    function addUser() {
      $state.go('newuser');
    };

    function listUsers() {
      userService.getAll().success(function(data){
        $scope.users = data;
        if($scope.users.length < 1){
          toaster.pop('warning', "", "No users available")
        }
      }).error(function(){
         toaster.pop('error', "", "Could not retrieve users.");
      })      
    };

  }]);

})();