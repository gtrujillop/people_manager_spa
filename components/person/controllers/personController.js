(function () {
  var person = angular.module('peopleManager.person');
  person.controller("personController", ["$scope",
                                           "personService",
                                           "$state",
                                           "$window",
                                           "toaster",
                                           "$sessionStorage",
                                           function($scope,
                                                    personService,
                                                    $state,
                                                    $window,
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
    $scope.calculateAge = calculateAge;

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

    function calculateAge(birthDate) {
      var now = new Date(); 
      var time = now.getTime();
      var birth = Date.parse(birthDate);
      var age = (time - birth) / (1000 * 60 * 60 * 24 * 365);
      var result = Math.round(age * 100) / 100
      return Math.floor(result);
    }

    // Works for new and edit
    // based on object's Id
    function save(formIsValid) {
      if (formIsValid) {
        personService.save($scope.person).success(function(data){
          toaster.pop('success', "", "Person saved succesfully.");
          $state.go('listpeople');
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

    function destroyPerson(personId, index) {
      if ($window.confirm("Do you want to proceed ?")) {
        $scope.people.splice(index, 1);
        personService.destroy(personId).success(function(data){
          toaster.pop('success', "", "Person was deleted successfully.")
        }).error(function(){
           toaster.pop('error', "", "Could not delete person.");
        })      
      }
    };

    function showPerson(personId) {
      $state.go('personprofile');
    };

    function listPersons() {
      if ($state.current.name == 'listpeople') {
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
