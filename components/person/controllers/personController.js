(function () {
  var package = angular.module('peopleManager.person');
  package.controller("personController", ["$scope",
                                           "personService",
                                           "$state",
                                           "toaster",
                                           "$sessionStorage",
                                           function($scope,
                                                    personService,
                                                    $state,
                                                    toaster,
                                                    $sessionStorage) {

    $scope.person = {};
    $scope.save = save;
    $scope.editPerson = editPerson;
    $scope.destroyPerson = destroyPerson;
    $scope.showPerson = showPerson;
    $scope.listPersons = listPersons;

    $scope.listPersons();

    $scope.packagePopover = {
      content: '',
      templateUrl: 'packagePopoverTemplate.html',
      title: ''
    };
    
    // Works for new and edit
    // based on object's Id
    function save(formIsValid) {
      if (formIsValid) {
        personService.save($scope.person).success(function(data){
          toaster.pop('success', "", "Person saved succesfully.");
          $state.go('listPersons');
        }).error(function(data){
          toaster.pop('error', "", "Could not save person.");
        })
      }
    };

    function addPerson() {
      $state.go('newPerson');
    };

    function editPerson() {
      $state.go('editPerson');
    };

    function destroyPerson() {
      personService.destroy().success(function(data){
        toaster.pop('success', "", "Person was deleted successfully.")
      }).error(function(){
         toaster.pop('error', "", "Could not delete person.");
      })      
    };

    function showPerson() {
    };

    function listPersons() {
      personService.getAll().success(function(data){
        $scope.people = data;
        if($scope.people.length < 1){
          toaster.pop('warning', "", "No people available")
        }
      }).error(function(){
         toaster.pop('error', "", "Could not retrieve people.");
      })      
    };

  }]);

})();
