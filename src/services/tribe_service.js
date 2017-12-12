angular.module('TribeService', ['TribeModule']);
angular.module('TribeService').service('TribeService', ['Tribe',
function(Tribe) {
    this.tribe = new Tribe(0);

    this.restart = function() {
        this.tribe = new Tribe(5);
        return this.tribe;
    }
}]);