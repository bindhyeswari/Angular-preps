angular.module('googleMap.controllers', ['myApp.services']).controller('MyController', function ($scope, City) {
    $scope.cities = City.getAll(); // will need to be moved to a promise later
});