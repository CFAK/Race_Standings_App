angular.module('starter.services', [])

.filter('range', function() {
 return function(input, min, max) {
  min = parseInt(min); //Make string input int
  max = parseInt(max);
  for (var i = min; i < max; i++)
   input.push(i);
  return input;
 };
})

.factory('APIService', function($http) {
 var API = {};

 API.getDriverStandings = function(year) {
  if (!year) {
   year = 2016;
  }
  console.log("Getting the driver leaderboard for ", year);
  return $http({
   method: 'JSONP',
   url: 'http://ergast.com/api/f1/' + year + '/driverStandings.json?callback=JSON_CALLBACK'
  });
 }

	API.getConstructorLeaderboard = function(year){
		if(!year){
			year = 2016;
		}
		console.log("Getting constructor Standings for the year ", year);
		return $http({
			method: 'JSONP',
			url: 'http://ergast.com/api/f1/'+ year +'/constructorStandings.json?callback=JSON_CALLBACK'
		});
	}

	API.getRaceSchedule = function(year){
		if(!year){
			year = 2016;
		}
		console.log("Getting races for the year ", year);
		return $http({
			method: 'JSONP',
			url: 'http://ergast.com/api/f1/'+ year +'.json?callback=JSON_CALLBACK'
		});
	}

 return API;
})

.factory('LoadingService', function($ionicLoading) {

 var service = {}

 service.show = function() {
  $ionicLoading.show({
   template: '<ion-spinner class= "spinner-positive" icon="ripple"></ion-spinner><div>loading</div>'
  });
 };

 service.hide = function() {
  $ionicLoading.hide();
 };

 return service;
});
