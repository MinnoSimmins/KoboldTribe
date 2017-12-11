var koboldRaceStats = {
    skin: {
        skinType: 'scales',
        skinColors: [
            'black',
            'grey',
            'light blue',
            'dark blue',
            'blue',
            'dark red',
            'red',
            'light red',
            'green',
            'dark green',
            'light green',
            'white'
        ],
        skinColorsHex: [
            '#505050',
            '#989898',
            '#6bd2ff',
            '#467496',
            '#3da4ff',
            '#a72613',
            '#e62b15',
            '#ff978b',
            '#4aca59',
            '#34883d',
            '#8fff9e',
            '#f7f7f7'
        ],
        skinColorMean: 7,
        skinColorVariance: 1
    },
    height: {
        mean: 1.1,
        variance: 0.15
    },
    weight: {
        mean: 20,
        variance: 2
    },
    eyes: {
        eyesColors: [
            'yellow',
            'amber',
            'orange',
            'redish orange',
            'red'
        ],
        eyesColorsHex: [
            '#ffff00',
            '#ffcc00',
            '#ffb20f',
            '#ff9818',
            '#e62b15'
        ]
    },
    tail: {
        tailType: 'prehensile',
        tailLengths: [
            'very short',
            'short',
            'slightly short',
            'moderately long',
            'slightly long',
            'long',
            'very long'
        ],
        tailLengthMean: 3,
        tailLengthVariance: 2,
        tailThicknesses: [
            'very thin',
            'thin',
            'slightly thin',
            'moderately thick',
            'slightly thick',
            'thick',
            'very thick'
        ],
        tailThicknessMean: 3,
        tailThicknessVariance: 2
    },
    attributes: {
        str: {
            mod: -4
        },
        dex: {
            mod: 2
        },
        con: {
            mod: -2
        },
        int: {
            mod: 0
        },
        wis: {
            mod: 0
        },
        cha: {
            mod: 0
        }
    }

}