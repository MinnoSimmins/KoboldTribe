angular.module('HelloWorldApp', ['CharacterGenerator']);
angular.module('HelloWorldApp').controller('HelloWorldController', ['$scope', '$sce', 'CharacterGenerator',
    function($scope, $sce, CharacterGenerator) {
        var charGen = new CharacterGenerator();
        var kobolds = [];
        for (i = 0; i < 1; i++) {
            kobolds[i] = charGen.generateChar();
        }
        var koboldDescriptions = [];
        for (i = 0; i < kobolds.length; i++) {
            koboldDescriptions[i] = $sce.trustAsHtml(kobolds[i].toStringDescriptive());
        }
        $scope.raceStats = koboldRaceStats;
        $scope.kobolds = koboldDescriptions;
        $scope.genders = ['male', 'female'];
        $scope.Math = Math;
        $scope.player = charGen.generateChar();
        $scope.player.attributes = {
            str: {
                base: 8,
                mod: koboldRaceStats.attributes.str.mod
            },
            dex: {
                base: 8,
                mod: koboldRaceStats.attributes.dex.mod
            },
            con: {
                base: 8,
                mod: koboldRaceStats.attributes.con.mod
            },
            int: {
                base: 8,
                mod: koboldRaceStats.attributes.int.mod
            },
            wis: {
                base: 8,
                mod: koboldRaceStats.attributes.wis.mod
            },
            cha: {
                base: 8,
                mod: koboldRaceStats.attributes.cha.mod
            },
        };
        $scope.attrPoints = 27;

        $scope.incrAttr = function(attr, add) {

            costs =[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,3,3,4]
            if (add) {
                cost = costs[attr.base+1];

                if ($scope.attrPoints >= cost && attr.base < 18) {
                    $scope.attrPoints -= cost;
                    attr.base += 1;
                    return attr;
                }
            } else if (attr.base > 8) {
                cost = costs[attr.base];
                cost = costs[attr.base];
                if (attr.base-cost >= 8) {
                    $scope.attrPoints += cost;
                    attr.base -= 1;
                    return attr;
                }
            }
            return attr;
        }
    }]);



