angular.module('Main', ['TribeService', 'TribeModule']);
angular.module('Main').controller('MainPageController', ['$scope', '$sce', 'TribeService', 'Tribe',
    function($scope, $sce, TribeService, Tribe) {
        $scope.endOfWeek = false;
        $scope.endOfWeekInfo = {};
        $scope.tribe = TribeService.tribe;



        $scope.endWeek = function() {
            $scope.endOfWeekInfo = $scope.tribe.endWeek();
            $scope.endOfWeek = true;
        };

        $scope.newWeek = function() {
            $scope.endOfWeek = false;
        };
}]);
angular.module('Main').directive('modalDialog', function() {
    return {
        restrict: 'E',
        templateUrl: '../view/endOfWeekReport.html'
    };
});
