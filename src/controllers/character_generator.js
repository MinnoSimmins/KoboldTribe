angular.module('CharacterGenerator', []);
angular.module('CharacterGenerator').factory('CharacterGenerator', ['Character', function(Character) {
    function CharacterGenerator() {

    }

    CharacterGenerator.prototype.generateChar = function() {
        var race = 'kobold';

        var gender = Math.round(Math.random()) == 1 ? 'female' : 'male';

        var name;
        if (gender == 'female')
            name = namesKoboldFemale[Math.floor(Math.random()*namesKoboldFemale.length)];
        else {
            name = namesKoboldMale[Math.floor(Math.random()*namesKoboldFemale.length)];
        }
        var raceStats = koboldRaceStats;

        var heightStats = raceStats.height;
        var height = randn_bm()*heightStats.variance + heightStats.mean;
        height = Math.round(height*100)/100;

        var weightStats = raceStats.weight;
        var weight = randn_bm()*weightStats.variance + weightStats.mean;
        weight = Math.round(weight*100)/100;

        var skinStats = raceStats.skin;
        var skinType = skinStats.skinType
        var skinColorNum = Math.round(randn_bm()*skinStats.skinColorVariance+skinStats.skinColorMean);
        if (skinColorNum < 0) {
            skinColorNum = 0;
        }
        if (skinColorNum >= skinStats.skinColors.length) {
            skinColorNum = skinStats.skinColors.length - 1;
        }
        var skinColor = skinStats.skinColors[skinColorNum];
        var skinColorHex = skinStats.skinColorsHex[skinColorNum];
        var skin = {
            skinType: skinType,
            skinColor: skinColor,
            skinColorHex: skinColorHex
        };

        var eyesStats = raceStats.eyes;
        var eyesColorNum = Math.floor(Math.random()*eyesStats.eyesColors.length);
        var eyesColor = eyesStats.eyesColors[eyesColorNum];
        var eyesColorHex = eyesStats.eyesColorsHex[eyesColorNum];
        var eyes = {
            eyeColor: eyesColor,
            eyesColorHex: eyesColorHex
        };

        var tailStats = raceStats.tail;
        var tailLengthNum = Math.round(randn_bm()*tailStats.tailLengthVariance+tailStats.tailLengthMean);
        if (tailLengthNum < 0 || tailLengthNum >= tailStats.tailLengths.length) {
            tailLengthNum = Math.floor(tailStats.tailLengths.length / 2);
        }
        var tailLength = tailStats.tailLengths[tailLengthNum];
        var tailThicknessNum = Math.round(randn_bm()*tailStats.tailThicknessVariance+tailStats.tailThicknessMean);
        if (tailThicknessNum < 0 || tailThicknessNum >= tailStats.tailThicknesses.length) {
            tailThicknessNum = Math.floor(tailStats.tailThicknesses.length / 2);
        }
        var tailThickness = tailStats.tailThicknesses[tailThicknessNum];
        var tail = {
            tailType: tailStats.tailType,
            tailLength: tailLength,
            tailThickness: tailThickness
        };

        var attributeStats = raceStats.attributes;
        var str = Math.round(randn_bm()*attributeStats.str.variance+10+attributeStats.str.mod);
        var dex = Math.round(randn_bm()*attributeStats.dex.variance+10+attributeStats.dex.mod);
        var con = Math.round(randn_bm()*attributeStats.con.variance+10+attributeStats.con.mod);
        var int = Math.round(randn_bm()*attributeStats.int.variance+10+attributeStats.int.mod);
        var wis = Math.round(randn_bm()*attributeStats.wis.variance+10+attributeStats.wis.mod);
        var cha = Math.round(randn_bm()*attributeStats.cha.variance+10+attributeStats.cha.mod);
        var attributes = {
            str: str,
            dex: dex,
            con: con,
            int: int,
            wis: wis,
            cha: cha
        };

        return new Character(name, 20, gender, race, height, weight, skin, eyes, null, tail, attributes);
    };

    return CharacterGenerator;
}]);

angular.module('CharacterGenerator').factory('Character',['$sce', function($sce) {
    Character.prototype.JOBS = {
        REST: {
            text: 'rest',
            description: 'Regain health'
        },
        SCAVENGE: {
            text: 'scavenge',
            description: 'Search for food and materials'
        }
    };

    function Character(name, age, gender, race, height, weight, skin, eyes, hair, tail, attributes) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.race = race;
        this.height = height;
        this.weight = weight;
        this.hair = hair;
        this.skin = skin;
        this.eyes = eyes;
        this.tail = tail;
        this.attributes = attributes;

        this.genderPronoun = this.gender == 'female' ? 'she' : 'he';
        this.genderPossesive = this.gender == 'female' ? 'her' : 'his';
        this.skin.skinTypeMultiple = this.skin.skinType.substr(this.skin.skinType.length, 1) == 's' ? 'is' : 'are';
        this.skin.skinColorAAn = startsWithVowel(this.skin.skinColor) ? 'an' : 'a';
        this.eyes.eyeColorAAn = startsWithVowel(this.eyes.eyeColor) ? 'an' : 'a';
        this.bmi = Math.round((this.weight / (this.height*this.height))*100)/100;
        this.job = Character.prototype.JOBS.SCAVENGE;
        this.hp = 100;
        this.health = 100;
        this.happiness = 50;
        this.hunger = 50;
        this.inventory = {
            'gold': {
                text: 'gold',
                equippable: false,
                amount: 3
            }
        };
        this.equipped = {
            'stick': {
                text: 'wooden stick',
                equippable: true,
                amount: 1
            },
            'loincloth': {
                text: 'loincloth',
                equippable: true,
                amount: 1
            }
        };
    }

    Character.prototype.unequip = function(name,item) {
        var equippedItem = this.equipped[name];
        if (equippedItem != null) {
            this.inventory[name] = item;
            delete this.equipped[name];
        }
    };

    Character.prototype.equip = function(name, item) {
        var inventoryItem = this.inventory[name];
        if (inventoryItem != null) {
            this.equipped[name] = item;
            delete this.inventory[name];
        }
    };

    Character.prototype.decreaseHunger = function(amt) {
        this.hunger -= amt;
        this.hunger = this.hunger < 0 ? 0 : this.hunger;
    };

    Character.prototype.increaseHunger = function(amt) {
      this.hunger += amt;
      this.hunger = this.hunger > 100 ? 100 : this.hunger;
    };

    Character.prototype.getHPDescriptive = function() {
      switch(true) {
          case (this.hp < 10):
              return "<span style='color:darkred'>near death</span>";
              break;
          case (this.hp >= 10 && this.hp < 25):
              return "<span style='color:darkred'>grievously injured</span>";
              break;
          case (this.hp >= 25 && this.hp < 50):
              return "<span style='color:red'>very injured</span>";
              break;
          case (this.hp >= 50 && this.hp < 75):
              return "<span style='color:orange'>injured</span>";
              break;
          case (this.hp >= 75 && this.hp < 100):
              return "<span style='color:yellow'>slightly injured</span>";
              break;
          case (this.hp == 100):
              return "<span style='color:green'>uninjured</span>";
              break;
      }
    };

    Character.prototype.getHappinessDescriptive = function() {
        switch(true) {
            case (this.happiness < 10):
                return "<span style='color:darkred'>livid</span>";
                break;
            case (this.happiness >= 10 && this.happiness < 25):
                return "<span style='color:red'>very unhappy</span>";
                break;
            case (this.happiness >= 25 && this.happiness < 40):
                return "<span style='color:orange'>unhappy</span>";
                break;
            case (this.happiness >= 40 && this.happiness < 60):
                return "<span style='color:yellow'>content</span>";
                break;
            case (this.happiness >= 60 && this.happiness < 75):
                return "<span style='color:lightgreen'>happy</span>";
                break;
            case (this.happiness >= 75 && this.happiness < 90):
                return "<span style='color:green'>very happy</span>";
                break;
            case (this.happiness >= 90):
                return "<span style='color:darkgreen'>ecstatic</span>";
                break;
        }
    };

    Character.prototype.getHungerDescriptive = function() {
        switch(true) {
            case (this.hunger < 10):
                return "<span style='color:darkred'>starving</span>";
                break;
            case (this.hunger >= 10 && this.hunger < 25):
                return "<span style='color:red'>near-starving</span>";
                break;
            case (this.hunger >= 25 && this.hunger < 40):
                return "<span style='color:orange'>very hungry</span>";
                break;
            case (this.hunger >= 40 && this.hunger < 60):
                return "<span style='color:yellow'>hungry</span>";
                break;
            case (this.hunger >= 60 && this.hunger < 75):
                return "<span style='color:lightgreen'>slightly hungry</span>";
                break;
            case (this.hunger >= 75 && this.hunger < 90):
                return "<span style='color:green'>well fed</span>";
                break;
            case (this.hunger >= 90):
                return "<span style='color:darkgreen'>very well fed</span>";
                break;
        }
    };

    Character.prototype.toString = function() {
        description =
            'Name: ' + this.name +
            '\nAge: ' + this.age +
            '\nGender: ' + this.gender +
            '\nRace: ' + this.race +
            '\nHeight: ' + this.height + ' meters' +
            '\nWeight: ' + this.weight + ' kilograms' +
            '\nSkin Type: ' + this.skin.skinType +
            '\nSkin Color: ' + this.skin.skinColor;
        if (this.hair) {
            description +=
                '\nHair Style: ' + this.hair.hairStyle +
                '\nHair Length: ' + this.hair.hairLength +
                '\nHair Color: ' + this.hair.hairColor;
        }

        if (this.tail) {
            description +=
                '\nTail Type: ' + this.tail.tailType +
                '\nTail Length: ' + this.tail.tailLength +
                '\nTail Thickness: ' + this.tail.tailThickness;
        }

        description += '\nEye Color: ' + this.eyes.eyeColor;

        return description;
    };

    Character.prototype.toStringDescriptive = function() {
        description = '<div><b>' + this.name + '</b> is a ' + this.gender + ' ' + this.race + '.' +
            '<br/>' + capitalize(this.genderPronoun) + ' is ' + this.age + ' years old.' +
            //'<br/>' + capitalize(this.genderPronoun) + ' stands at ' + this.height + ' meters tall, and ' + this.genderPronoun + ' weighs ' + this.weight + ' kilograms. ' +
            //capitalize(this.genderPossesive) + ' bmi is ' + this.bmi + '.' +
            '<br/>' + capitalize(this.genderPossesive) + ' ' + this.skin.skinType + ' ' + this.skin.skinTypeMultiple + ' a shade of ' + '<span style="color:' + this.skin.skinColorHex + '">' + this.skin.skinColor
            + '</span>, and ' + this.genderPossesive + ' eyes are ' + this.eyes.eyeColorAAn + ' <span style="color:' + this.eyes.eyesColorHex + '">' + this.eyes.eyeColor + '</span> hue.';
        if (this.hair) {

        }
        if (this.tail) {
            description +=
                '<br/>For a ' + this.race + ', ' + this.genderPronoun + ' has a ' + this.tail.tailThickness + ', ' + this.tail.tailLength + ' tail.';
        }
        description += '<br/>Injury: ' + this.getHPDescriptive();
        description += '<br/>Happiness: ' + this.getHappinessDescriptive();
        description += '<br/>Hunger: ' + this.getHungerDescriptive();
        description += '</div>';
        return description;
    };

    Character.prototype.toStringDescriptiveHTML = function() {
        return $sce.trustAsHtml(this.toStringDescriptive());
    };

    return Character;
}]);

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function startsWithVowel(str) {
    start = str.substr(0, 1);
    return containsAny(start, ['a','e','i','o','u']);
}

function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i];
        if (str.indexOf(substring) != - 1) {
            return true;
        }
    }
    return false;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}