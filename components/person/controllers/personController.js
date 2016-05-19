(function () {
  var person = angular.module('peopleManager.person');
  person.controller("personController", ["$scope",
                                           "personService",
                                           "$state",
                                           "$stateParams",
                                           "$window",
                                           "toaster",
                                           "$sessionStorage",
                                           function($scope,
                                                    personService,
                                                    $state,
                                                    $stateParams,
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
    $scope.getPerson = getPerson;
    $scope.returnToList = returnToList;
    $scope.calculateAge = calculateAge;
    $scope.disableForm = disableForm;
    $scope.formDisabled = false;

    $scope.listPersons();
    $scope.getPerson();


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

    function destroyPerson(person) {
      if ($window.confirm("Do you want to proceed ?")) {
        personService.destroy(person.id).success(function(data){
          toaster.pop('success', "", "Person was deleted successfully.");
          if ($state.current.name == 'personprofile') {
            $scope.returnToList();
          } else {
            $scope.people.splice($scope.people.indexOf(person),1);
          }
        }).error(function(){
           toaster.pop('error', "", "Could not delete person.");
        })      
      }
    };

    function showPerson(personId) {
      $state.go('personprofile', {id: personId});
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


    function getPerson() {
      if ($state.current.name == 'personprofile') {
        console.log($stateParams.id);
        personService.getById($stateParams.id).success(function(data){
          $scope.person = data;
          
          $scope.person.birthdate = new Date($scope.person.birthdate);
          $scope.formDisabled = true;
          if($scope.person === null){
            toaster.pop('warning', "", "No person available")
          }
        }).error(function(){
           toaster.pop('error', "", "Could not retrieve person.");
        })
      }
    };

    function editPerson() {
      $scope.originalPerson = angular.copy($scope.person);
      toaster.pop('warning', "", "Edit mode ON")
      $scope.formDisabled = false;
    };

    function disableForm() {
      toaster.pop('warning', "", "Edit mode OFF");
      $scope.person = $scope.originalPerson;
      $scope.formDisabled = true;
    }

    function returnToList() {
      $state.go('listpeople');
    };

  }]);
})();
