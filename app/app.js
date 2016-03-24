"use strict";

let soundApp = angular.module("soundApp", ['ngRoute'])
  .constant('firebaseURL', 'https://front-end-capstone12.firebaseio.com/');  // ngRoute object from angular-route is dependency -- needed to run

/*
    Define a promise for any view that needs an authenticated user
    before it will resolve (see below)
*/
let isAuth = function (authFactory) { 
    new Promise(function(resolve, reject) {
        if (authFactory.isAuthenticated()) {
            console.log("User is authenticated, resolve route promise");
        resolve();
        } else {
            console.log("User is not authenticated, reject route promise");
        reject();
        }
    }
)};

    soundApp.config(['$routeProvider',  // $routeProvider object is given to us by ngRoute
    function($routeProvider) {
        $routeProvider.  // note similarity of this syntax to switch/case
          when('/', {
            templateUrl: 'partials/songs-list.html',
            controller: 'SongsListCtrl',
            resolve: { isAuth }
          }).
          when('/songs-list', {
            templateUrl: 'partials/songs-list.html',
            controller: 'SongsListCtrl',
            resolve: { isAuth }
          }).
          when('/add-song', {
            templateUrl: 'partials/add-song.html',
            controller: 'AddSongCtrl',
            resolve: { isAuth }
          }).
          when('/my-gear', {
            templateUrl: 'partials/gear.html',
            controller: 'GearCtrl',
            resolve: { isAuth }
          }).
          // when('/searchresults', {
          //   templateUrl: 'partials/search-results.html',
          //   controller: 'ResultsCtrl'
          // }).
          when('/login', {
            templateUrl: 'partials/login.html',
            controller: "LoginCtrl"
          }).
          when('/logout', {
            templateUrl: 'partials/login.html',
            controller: "LoginCtrl"
          }).
          otherwise({
            redirectTo: '/'
          });
    }]);

/*
    When the application first loads, redirect the user to the login
    form if there is no authentication
*/
    soundApp.run([
        "$location",

        function ($location) {
            let soundAppRef = new Firebase("https://front-end-capstone12.firebaseio.com/");
            console.log("run method");
            soundAppRef.onAuth(function(authData) {
                console.log("authData",authData);

                if (!authData) {
                    window.location.replace("/#/login");
                } else {
                    window.location.replace("/#/");

                }
            });
        }   
    ]);