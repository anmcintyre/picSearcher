angular.module('instagramSearcher', ['ngMessages', 'ngAnimate'])
.controller('MyController', function($scope, $http) {
  $scope.photos = [];
  $scope.count = -1;
  $scope.lastSearch = "";
  $scope.httpError = false;

  $scope.submit = function(form) {
    if ( $scope.text.trim().length === 0){
      $scope.photos = [];  
      $scope.count = -1;  
      $scope.lastSearch = "";
      $scope.httpError = false;
      return;
    }

    var request = {
      client_id: '09fe30ae878a416f819cc4e0db3db363',
      callback: "JSON_CALLBACK"
    };
    console.log()    

    $http({
      method: 'JSONP',
      url: "https://api.instagram.com/v1/tags/" + $scope.text.replace(/ /g, "") + "/media/recent",
      params: request
    })
    .success(function(response, status, headers, config) { 
      $scope.photos = response.data;
      $scope.count = response.data.length;
      $scope.lastSearch = $scope.text;
      $scope.text = "";
      $scope.myForm.$setPristine();   
      $scope.httpError = false;   
    })
    .error(function(data, status, headers, config) {
      $scope.httpError = true;
      $scope.status = status;
      $scope.url = config.url;
      $scope.text = "";      
      $scope.myForm.$setPristine();
    });
  };
}); 