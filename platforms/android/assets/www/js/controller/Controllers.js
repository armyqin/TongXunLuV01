// angular.module('com.tts.App')

App.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/addUserGroup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

App.controller('PersonListCtrl', function($scope, personDAO) {
  
  console.log("&&&&&&&&&&&&&&&&&&&&");
  personDAO.selectAll().then(function(data){
    console.log("Select All Success!!!");

    $scope.personList = personDAO.fetchAll(data);

  }, function(data){
    console.log("Select All ERROR!!!");
  });

});

App.controller('PersonCtrl', function($scope, $stateParams, $timeout, commonUtils, personDAO) {
  // console.log("PersonCtrl: " + $timeout(commonUtils.imgToBase64Str('../img/small/default.jpg'), 1000));
  // personDAO.initData();
  $scope.params = $stateParams;
});

App.controller('LoginCtrl', function($scope, $state) {
  
  // Form data for the login modal
  $scope.loginData = {userId: 'army.qin', password: 'armyqin'};


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login'+ $scope.loginData);

    $state.go('app.personList');
  };

});
