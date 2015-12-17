angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$state, $ionicModal, $timeout,$cordovaGeolocation,$http,$ionicHistory,$cordovaFacebook,SearchService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.data = {};
    if(window.localStorage.getItem("username"))
    {
        if((window.localStorage.getItem("username")).length > 0)
        {
            $scope.loginData.username = window.localStorage.getItem("username");
            if(!window.localStorage.getItem("face"))
            {
                $scope.loginData.face = "./img/ionic.png";
            }
            else
            {
                $scope.loginData.face = window.localStorage.getItem("face");
            }
        }
    }
            
    $scope.fbLogin = function () {
    $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {
          if (success.status === 'connected') {
              console.log('Facebook login succeeded');
              $cordovaFacebook.api("me", ["public_profile"])
                .then(function (user) {
                       $scope.user = user;
                       $scope.loginData.username = user.name;
                       $scope.loginData.face = "https://graph.facebook.com/" + user.id +"/picture?width=270&height=270";
                       $scope.loginData.id = user.id;
                       window.localStorage.setItem("IdFace", user.id);
                       window.localStorage.setItem("username", $scope.loginData.username);
                       window.localStorage.setItem("face",$scope.loginData.face);
                       $ionicHistory.nextViewOptions({
                                                     disableBack: true
                                                     });
                       $state.go('app.infouser');
                   },
                   function (error) {
                       alert('Facebook error: ' + error.error_description);
                   });
          }
          else {
            alert('Facebook login failed');
          }
      }, function (error) {
      // error
      });
    };
    $scope.doLogout = function() {
        $scope.loginData = {};
        window.localStorage.setItem("username", "");
        window.localStorage.setItem("password", "");
        if(window.localStorage.getItem("IdFace"))
        {
          $cordovaFacebook.logout()
          .then(function(success) {
                console.log("Logout");
                window.sessionStorage.clear();
                window.localStorage.setItem("IdFace", "");
            }, function (error) {
            // error
            });
        }
        $state.go('app.login', {reload: false});
        
    };
    //get data
    $scope.getDataProduct = function() {
        SearchService.getDataProduct($scope.data.nameProduct).success(function(data) {
              if(data.products.length > 0)
              {
                $scope.products = data.products;
              }
              else
              {
                $scope.products =[];
                $scope.data.message = "Sorry, we can not found any products";
              }
          }, function(err) {
          console.error('ERR', err);
          // err.status will contain the status code
          });
    };
    //get data store by City
    $scope.getDataStoreByCity = function() {
    SearchService.getDataSearchStoreByCity($scope.data.nameCity).success(function(data) {
           if(data.stores.length > 0)
           {
               $scope.stores = data.stores;
           }
           else
           {
               $scope.stores =[];
               $scope.data.message = "Sorry, we can not found any stores";
           }
         }, function(err) {
         console.error('ERR', err);
         // err.status will contain the status code
         });
    };
            
    //search store
    $scope.checkLocation = function() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
              var currentLat = position.coords.latitude;
              var currentLong = position.coords.longitude;
              console.log("Lat - long :" + currentLat + "-" + currentLong);
              SearchService.getDataSearchStore(currentLat,currentLong).success(function(data) {
                    $scope.stores =  data.stores;
               }, function(err) {
               console.error('ERR', err);
               // err.status will contain the status code
               });
              
          }, function(err) {
              var errorLogin = {
              name: 'Find Stores',
              text: 'Can not find stores',
              time : new Date().toLocaleString()
              };
              var sumLog = JSON.parse(window.localStorage.getItem('AppError')) || [];
              sumLog.push(errorLogin);
              window.localStorage['AppError'] = JSON.stringify(sumLog);
                alert("Please check your GPS before you searching stores");
          
        });
    };
               
            
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
        if($scope.loginData.username == "guest" && $scope.loginData.password && $scope.loginData.password.length > 4)
        {
            $scope.loginData.face = "./img/ionic.png";
            window.localStorage.setItem("username", $scope.loginData.username);
            window.localStorage.setItem("password", $scope.loginData.password);
            window.localStorage.setItem("face", "./img/ionic.png");
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            
            
            
            $state.go('app.infouser');
        }
        else
        {
            var errorLogin = {
                name: 'Login',
                text: 'Login error by username or password not correctly',
                time : new Date().toLocaleString()
            };
            var sumLog = JSON.parse(window.localStorage.getItem('AppError')) || [];
            sumLog.push(errorLogin);
            window.localStorage['AppError'] = JSON.stringify(sumLog);
            window.localStorage.setItem("username", "");
            window.localStorage.setItem("password", "");
            alert("Username or password is not correct, please try again ");
        }
  };
            
})

.controller('infouserCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

