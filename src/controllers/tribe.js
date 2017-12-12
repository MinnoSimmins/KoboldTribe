angular.module('TribeModule', ['CharacterGenerator']);
angular.module('TribeModule').factory('Tribe', ['CharacterGenerator', function(CharacterGenerator) {
    function Tribe() {
        this.kobolds = [];
        this.inventory = [];
        this.week = 1;
        this.happiness = "content";
        this.tribeSize = 5;
        this.food = 0;
        this.gold = 0;
        this.foodIncome = 0;
        this.foodConsumption = this.tribeSize;

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
        this.clearReport();
        endOfWeekReport["koboldReports"] = this.doKoboldReports();
        endOfWeekReport["foodReport"] = this.doFoodReport();
        this.doEndOfWeekEffects();
        this.week++;
        return endOfWeekReport;
    };

    Tribe.prototype.clearReport = function() {
        this.foodIncome = 0;
        this.foodConsumption = this.kobolds.length;
    };

    Tribe.prototype.doKoboldReports = function() {
        var koboldReports = [];
        for (var i = 0; i < this.kobolds.length; i++) {
            var jobReport = this.doJobReport(this.kobolds[i]);
            koboldReports[i] = {
                "name" : this.kobolds[i].name,
                "jobReport" : jobReport
            };
        }
        return koboldReports;
    };

    Tribe.prototype.doJobReport = function(kobold) {
        var jobReport;
        switch (kobold.job.text) {
            case (kobold.JOBS.SCAVENGE.text):
                var foodScavenged = 2;
                this.foodIncome += foodScavenged;
                jobReport = "Job: scavenged " + foodScavenged + " units of food.";
                break;

        }
        return jobReport;
    };

    Tribe.prototype.doFoodReport = function() {
        return "The tribe consumed " + this.foodConsumption + " units of food, and gained " + this.foodIncome + " units of food.";
    };

    Tribe.prototype.doEndOfWeekEffects = function() {
      this.food = this.food - this.foodConsumption + this.foodIncome;
        this.food = (this.food < 0) ? 0 : this.food;
    };

    return Tribe;
}]);