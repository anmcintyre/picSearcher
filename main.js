angular.module('instagramSearcher', [])
.controller('MyController', function($scope, $http) {
  $scope.photos = [];
  $scope.submit = function() {
    var request = {
      client_id: '09fe30ae878a416f819cc4e0db3db363',
      callback: "JSON_CALLBACK"
    };

    $http({
      method: 'JSONP',
      url: "https://api.instagram.com/v1/tags/" + $scope.text + "/media/recent",
      params: request
    })
    .success(function(response, status, headers, config) { 
      $scope.photos = response.data;
    })
    .error(function(data, status, headers, config) {
      alert('error');
    });
  };
}); 