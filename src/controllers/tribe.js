angular.module('TribeModule', ['CharacterGenerator']);
angular.module('TribeModule').factory('Tribe', ['CharacterGenerator', function(CharacterGenerator) {
    function Tribe() {
        this.kobolds = [];
        this.inventory = [];
        this.week = 1;
        this.happiness = "content";
        this.food = 0;
        this.gold = 0;

        this.kobolds = Tribe.prototype.generateKobolds(this.tribeSize);
    }

    Tribe.prototype.generateKobolds = function(numKobolds) {
        this.charGen = new CharacterGenerator();
        var kobolds = [];
        for (i = 0; i < numKobolds; i++) {
            kobolds[i] = this.charGen.generateChar();
        }
        return kobolds;
    };

    Tribe.prototype.endWeek = function() {
        var endOfWeekReport = {};
        endOfWeekReport["jobReports"] = this.doJobReport();
        endOfWeekReport["foodReport"] = this.doFoodReport();
        this.week++;
        return endOfWeekReport;
    };

    Tribe.prototype.doJobReport = function() {
      var jobReports = {};
      for (var i = 0; i < this.kobolds.length; i++) {
          var kobold = this.kobolds[i];
          if (kobold.job.text == kobold.JOBS.SCAVENGE.text) {
              var foodScavenged = 2;
              this.food += foodScavenged;
              jobReports[i] = kobold.name + " scavenged " + foodScavenged + " food.";
          }
      }
      return jobReports;
    };

    Tribe.prototype.doFoodReport = function() {
        this.food -= this.kobolds.length;
        return "The tribe consumed " + this.kobolds.length + " units of food. It gained " + (this.food - this.kobolds.length) + " units of food.";
    };

    return Tribe;
}]);