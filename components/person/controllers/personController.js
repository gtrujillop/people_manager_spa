(function () {
  var person = angular.module('peopleManager.person');
  person.controller("personController", ["$scope",
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
    $scope.addPerson = addPerson;
    $scope.editPerson = editPerson;
    $scope.destroyPerson = destroyPerson;
    $scope.showPerson = showPerson;
    $scope.listPersons = listPersons;
    $scope.returnToList = returnToList;

    $scope.listPersons();

    $scope.personPopover = {
      content: '',
      templateUrl: 'personPopoverTemplate.html',
      title: ''
    };
    
    $scope.dateOptions = {
      formatYear: 'YYYY',
      maxDate: new Date(),
      minDate: new Date(1900, 1, 1),
      startingDay: 1
    };

    $scope.dateFormat = 'shortDate';

    $scope.openDate = function() {
      $scope.date1.opened = true;
    };
    
    $scope.date1 = {
      opened: false
    };

    // Works for new and edit
    // based on object's Id
    function save(formIsValid) {
      if (formIsValid) {
        personService.save($scope.person).success(function(data){
          toaster.pop('success', "", "Person saved succesfully.");
          $state.go('listpersons');
        }).error(function(data){
          toaster.pop('error', "", "Could not save person.");
        })
      }
    };

    function addPerson() {
      $state.go('newperson');
    };

    function editPerson() {
      $state.go('editperson');
    };

    function destroyPerson(personId) {
      personService.destroy(personId).success(function(data){
        toaster.pop('success', "", "Person was deleted successfully.")
      }).error(function(){
         toaster.pop('error', "", "Could not delete person.");
      })      
    };

    function showPerson(personId) {
      $state.go('personprofile');
    };

    function listPersons() {
      if ($state.current.name == 'listpersons') {
        personService.getAll().success(function(data){
          $scope.people = data;
          if($scope.people === null || $scope.people.length < 1){
            toaster.pop('warning', "", "No people available")
          }
        }).error(function(){
           toaster.pop('error', "", "Could not retrieve people.");
        })
      }
    };

    function returnToList() {
      $state.go('listpeople');
    };

  }]);
})();
