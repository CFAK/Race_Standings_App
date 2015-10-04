angular.module('starter.controllers', [])

.controller('LeaderboardCtrl', function($scope, $http, LoadingService, APIService, $ionicPopover) {

 $scope.boardType = 1;
 yearChanged = false;
 boardChanged = false;

 $scope.updateParamaters = function() {
  console.log(inputYear);
 }

 setBoard = function(input) {
  console.log(input);
  $scope.boardType = input;
  boardChanged = true;
 }


 $scope.getDriverLeaderBoard = function() {
  LoadingService.show();
  APIService.getDriverStandings($scope.year).success(function(response) {
   //Digging into the response to get the relevant data
   $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  });
  LoadingService.hide();
 }
 $scope.getDriverLeaderBoard();

 $scope.getConstructorLeaderboard = function() {
  LoadingService.show();
  APIService.getConstructorLeaderboard($scope.year).success(function(response) {
   console.log(JSON.stringify(response));
   $scope.teamList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  })
  LoadingService.hide();
 }

 // .fromTemplateUrl() method
 $ionicPopover.fromTemplateUrl('my-popover.html', {
  scope: $scope
 }).then(function(popover) {
  $scope.popover = popover;
 });


 setYear = function(inputYear) {
  yearChanged = true;
  $scope.year = parseInt(inputYear.substring(7));
 }

 $scope.openPopover = function($event) {
  yearChanged = false;
  $scope.popover.show($event);
 };

 $scope.closePopover = function() {
  $scope.popover.hide();
 };

 //Cleanup the popover when we're done with it!
 $scope.$on('$destroy', function() {
  $scope.popover.remove();
 });

 // Execute action on hide popover
 $scope.$on('popover.hidden', function() {
  if (!(yearChanged || boardChanged)) {
   console.log("");
  } else if ($scope.boardType == 1) {
   $scope.getDriverLeaderBoard();
  } else if ($scope.boardType == 2) {
   $scope.getConstructorLeaderboard();
  }
 });

 // Execute action on remove popover
 $scope.$on('popover.removed', function() {});

})

.controller('RacesCtrl', function($scope, $http, LoadingService, $ionicPopover, APIService) {

  yearChanged = false;

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
   scope: $scope
  }).then(function(popover) {
   $scope.popover = popover;
  });

  setYear = function(inputYear) {
   yearChanged = true;
   $scope.year = parseInt(inputYear.substring(7));
  }

  $scope.openPopover = function($event) {
   yearChanged = false;
   $scope.popover.show($event);
  };

  $scope.closePopover = function() {
   $scope.popover.hide();
  };

  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
   $scope.popover.remove();
  });

  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
			if(yearChanged){
				$scope.getRaces();
			}
  });

  $scope.getRaces = function() {
   LoadingService.show();
   APIService.getRaceSchedule($scope.year).success(function(response) {
    $scope.raceCal = response.MRData.RaceTable.Races;
   })
   LoadingService.hide();
  }
		$scope.getRaces();

 })

 .controller('InfoCtrl', function($scope) {

 });
