// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.search-service','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
                       
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
    .state('app.login', {
           url: '/login',
           views: {
           'menuContent': {
           templateUrl: 'templates/login.html'
           }
        }
    })
  .state('app.searchstore', {
      url: '/searchstore',
      views: {
        'menuContent': {
          templateUrl: 'templates/searchstore.html',
         controller: 'AppCtrl'
        }
      }
    })
    .state('app.infouser', {
      url: '/infouser',
      views: {
        'menuContent': {
          templateUrl: 'templates/infouser.html',
          controller: 'infouserCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/infouser/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
        
        if(window.localStorage.getItem('username') == null || window.localStorage.getItem('username') == "")
        {
            $urlRouterProvider.otherwise('/app/login');
        
        }
        else
        {
            $urlRouterProvider.otherwise('/app/infouser');
             //if not first time
        }
});
