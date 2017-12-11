angular.module('Main', ['TribeService', 'TribeModule']);
angular.module('Main').controller('MainPageController', ['$scope', '$sce', 'TribeService', 'Tribe',
    function($scope, $sce, TribeService, Tribe) {
        $scope.endOfWeek = false;
        $scope.endOfWeekInfo = {};
        $scope.tribe = TribeService.tribe;

        var acc = document.getElementsByClassName("koboldsAccordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function(){
                /* Toggle between adding and removing the "active" class,
                to highlight the button that controls the panel */
                this.classList.toggle("active");

                /* Toggle between hiding and showing the active panel */
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            }
        }


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
