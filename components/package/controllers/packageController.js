(function () {
  var package = angular.module('learningSystem.package');
  package.controller("packageController", ["$scope",
                                                                     "packageService",
                                                                     "$state",
                                                                     "toaster",
                                                                     "$sessionStorage",
                                                                     function($scope,
                                                                                    packageService,
                                                                                    $state,
                                                                                    toaster,
                                                                                    $sessionStorage) {

    $scope.package = {};
    $scope.isLogged = $sessionStorage.isLogged;
    $scope.save = save;
    $scope.addPackage = addPackage;

    listPackages();

    $scope.packagePopover = {
      content: '',
      templateUrl: 'packagePopoverTemplate.html',
      title: ''
    };

    function save(formIsValid) {
      if (formIsValid) {
        packageService.save($scope.package).success(function(data){
          toaster.pop('success', "", "Package saved succesfully.");
          $state.go('packageindex');
        }).error(function(data){
          toaster.pop('error', "", "Could not save package.");
        })
      }
    };

    function addPackage() {
      $state.go('newpackage');
    };

    function listPackages() {
      packageService.getAll().success(function(data){
        $scope.packages = data;
        if($scope.packages.length < 1){
          toaster.pop('warning', "", "No packages available")
        }
      }).error(function(){
         toaster.pop('error', "", "Could not retrieve packages.");
      })      
    };

  }]);

})();