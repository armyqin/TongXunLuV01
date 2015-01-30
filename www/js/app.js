// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'com.tts.app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'com.tts.controllers' is found in controllers.js
var App = angular.module('App', ['ionic', 'ngCordova']);

App.run(function($ionicPlatform, $cordovaToast, confGeneralDAO, personDAO) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    console.log("Start Read DB.......");
    //Create or open DataBase
    confGeneralDAO.openTongXunLuDB();
    //Create Table
    confGeneralDAO.createTable();
    personDAO.createTable();
    //Init Data
    confGeneralDAO.selectSqlVersionByParamName("DB_VERSION")
      .then(function(sqlVersion){
        console.log("Current SQL Version = " + sqlVersion);
        if(sqlVersion === -1 || sqlVersion === '-1'){
          console.log("0- init confGeneral Data???");
          confGeneralDAO.initData().then(function(id){
            console.log("1- init person Data???");
            personDAO.initData();
          }, function(id){
            console.log("0- init confGeneral Data Error!!!");
          });
        }
      }, function(sqlVersion){
        $cordovaToast.showShortTop(sqlVersion);
      });

  });
});

App.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.changePassword', {
    url: "/changePassword",
    views: {
      'menuContent': {
        templateUrl: "templates/changePassword.html"
      }
    }
  })

  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })

  .state('app.personList', {
    url: "/personList",
    views: {
      'menuContent': {
        templateUrl: "templates/personList.html",
        controller: 'PersonListCtrl'
      }
    }
  })

  .state('app.person', {
    url: "/personList/:userName?address",
    views: {
      'menuContent': {
        templateUrl: "templates/person.html",
        controller: 'PersonCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
