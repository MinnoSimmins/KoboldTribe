angular.module('TribeList', ['TribeService']);
angular.module('TribeList').controller('TribeListController', ['$scope', 'TribeService',
function ($scope, TribeService) {
    $scope.kobolds = TribeService.kobolds;
}]);