angular.module('TribeModule', ['CharacterGenerator']);
angular.module('TribeModule').factory('Tribe', ['CharacterGenerator', '$sce', function(CharacterGenerator, $sce) {
    function Tribe(tribeSize) {
        this.kobolds = [];
        this.inventory = [];
        this.week = 1;
        this.happiness = "content";
        this.tribeSize = tribeSize;
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
        endOfWeekReport["deathReports"] = this.doDeathReport();
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
        var report = "The tribe consumed " + this.foodConsumption + " units of food, and gained " + this.foodIncome + " units of food.";
        if (this.food - this.foodConsumption + this.foodIncome < 0) {
            report += "Your tribe is starving!";
        }
        this.food = this.food - this.foodConsumption + this.foodIncome;
        this.food = (this.food < 0) ? 0 : this.food;
        if (this.food == 0 && this.foodConsumption > this.foodIncome) {
            var foodLoss = this.foodConsumption - this.foodIncome;
            for (var i = 0; i < this.kobolds.length; i++) {
                this.kobolds[i].decreaseHunger(Math.random()*(foodLoss*10)+1);
            }
        } else if (this.food > 0) {
            var foodGain = this.foodIncome - this.foodConsumption;
            for (var i = 0; i < this.kobolds.length; i++) {
                this.kobolds[i].increaseHunger(Math.random()*(foodGain-1)+1);
            }
        }
        return report;
    };

    Tribe.prototype.doDeathReport = function() {
        var deathReports = [];
        for (var i = 0; i < this.kobolds.length; i++) {
            if (this.kobolds[i].hunger <= 0) {
                deathReports.push(this.kobolds[i].name + " has died of starvation!");
                this.kobolds.splice(i, 1);
            }
        }
        return deathReports;
    };

    return Tribe;
}]);