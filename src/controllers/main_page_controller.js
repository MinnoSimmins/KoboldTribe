angular.module('Main', ['TribeService', 'TribeModule']);
angular.module('Main').controller('MainPageController', ['$scope', '$sce', 'TribeService', 'Tribe',
    function($scope, $sce, TribeService, Tribe) {
        $scope.endOfWeek = false;
        $scope.endOfWeekInfo = {};
        $scope.tribe = TribeService.tribe;
        $scope.gameOver = false;


        $scope.endWeek = function() {
            $scope.endOfWeekInfo = $scope.tribe.endWeek();
            $scope.endOfWeek = true;
        };

        $scope.newWeek = function() {
            $scope.endOfWeek = false;
            $scope.gameOver = $scope.tribe.kobolds.length <= 0;
        };

        $scope.restart = function() {
            $scope.tribe = TribeService.restart();
            $scope.gameOver = false;
        }
}]);
angular.module('Main').directive('modalDialog', function() {
    return {
        restrict: 'E',
        templateUrl: '../view/endOfWeekReport.html'
    };
});
