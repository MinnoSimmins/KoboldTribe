angular.module('TribeService', ['TribeModule']);
angular.module('TribeService').service('TribeService', ['Tribe',
function(Tribe) {
    this.tribe = new Tribe();


}]);