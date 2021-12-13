/* -----------------------------------------------
    JS Files
----------------------------------------------- */

// Checking the correct connection
console.log("Connexion JS - Ok")

let apologies = [
    // Random
    // Array remained empty so as not to create a conflict with the indexes
    [],
    // Transports
    [
        'Bouchons sur le pont.',
        'Les gilets jaunes ont bloqué la route.',
        'Le cheminaux a oublié de se réveiller, il était à une dégustation de Rhum hier.',
        'Le mec devant moi roulait lentement.',
        'GreenPeace a braqué ma caisse.',
        'Manifestation pour adopter une écriture inclusive.'
    ],
    // Animals
    [
        'Y\'avait un ours dans mon jardin.',
        'Mon chats a explosé celui du voisin.',
        'J\'ai éclaté une biche en caisse.',
        'j\'ai eu une portée de 19 chiots.',
        'Mon perroquet a fait un infarctus.',
    ],
    // Weather
    [
        '110 km/h de vent, j\'ai faillis m\'envoler.',
        'J\'avais le soleil dans les yeux, obligé de ralentir.',
        'Trop de neige sur la route.',
        'Je me suis pas réveillé à cause de la comète Léonard qui est passé cette nuit.',
        'Lune en Cancer mon astrologue m\'a conseillé de rester au lit.', 
    ],
    // WTF
    [
        'J\'ai explosé Excalibur donc on m\'a convoqué au palais du Roi.',
        'J\'ai formation Jedi de 8h à 10h.',
        'J\'ai percuté un Chocobon sur la route.',
        'Je me suis coincé les doigts dans la porte et comme elle était fermé à clef, je suis resté coincé.',
        'Je bosse pour le KGB, si j\' étais arrivé à l\'heure vous seriez tous morts.',
        'Mon Jungler était mauvais, j\'en ai fait des cauchemares.',
        'Ne posez pas de question dont vous ne voulez pas connaître la réponse.', 
        'Tu n\'as rien vue, rien entendu.',
        'J\'ai pris un Wookie en stop.', 
        'C\'est la faute de Tom.',
        'Je ne pense pas qu\'il y est de bonne ou de mauvaise raison d\'être en retard.',
    ],
    // Personalized Excuse
    [
        [
            'Dégustation de rhum hier soir, j\'ai pas pus me réveiller.',
            'Le chauffeur de bus avait une odeur de Trois Rivière.',
        ],
        [
            'Hulk a explosé ma caisse.',
            'Mjömnir était sur la route.',
        ],
        [
            'Mon X-Wing est tombé en rade.',
            'Controle des Men In Black au pont de Normandie.',
        ],
        [
            'La quête du Grall passe avant toute chose.',
            'J\'ai demandé au roi Arthur de me téléporter pour arriver à l\'heure, il m\'a envoyé voir son druide.',
            'J\'ai participé au jeux du Cailoux, on a terminé à 6h du matin.'
        ],
    ]
];

// Teachers coefficients
let teachers = [
    // Fred
    0.8,
    // Anousone
    0.4,
    // Sébastien
    0.7,
    // Camille
    0.6,
]

// Category coefficients
let categories = [
    // Aléatoire
    0.6,
    // Transports
    0.2,
    // Animaux
    0.7,
    // Météo
    0.4,
    // WTF
    2,
    // Personnalisée
    1,
]

// Delays coefficients
let late = [
    // < 15 min
    0.25,
    // 15 à 45 min
    0.6,
    // 45 min à 1h30
    0.8,
    // > 1h30
    1,
]

// Texts of delays
let latelabels = [
    '< 15 min',
    '15 à 45 min',
    '45 min à 1h30',
    '> 1h30',
]


$(function () {
    // Initialization
    $('#late').val(0);
    $('#lateLabel').text(latelabels[0]);

    let teacherText;
    let teacherId;
    let categoriesText;
    let categoriesId;
    let lateId = 0;

    let indexArray;
    let indexElement = -1;
    let tmp = -1;

    let prob;
    let apology;

    // Detecting Changes on inputs

    $('#late').on('change', function () {
        lateId = $("#late").val();
        console.log(lateId);
        $('#lateLabel').text(latelabels[lateId]);
        submitActivation();
    });

    $('#teacher').on('change', function () {
        teacherText = $("#teacher option:selected").text();
        teacherId = $("#teacher").val();
        console.log(teacherText + ' - ' + teacherId);
        submitActivation();
    });

    $('#categories').on('change', function () {
        categoriesText = $("#categories option:selected").text();
        categoriesId = $("#categories").val();
        console.log(categoriesText + ' - ' + categoriesId);
        submitActivation();
    });

    // Triggering of the calculation

    $("#generateApology").submit(function (event) {
        // Result display
        event.preventDefault();
        $('#result').removeClass("d-none");

        // Calculating the probability
        prob = (teachers[teacherId] + categories[categoriesId] + late[lateId]) / 3 * 100;
        prob = Math.round(prob * 100) / 100 + ' %';
        $('#pourcentage').text(prob);

        // Algorithm to find the excuse
        if (categoriesId == 0) {
            indexArray = Math.floor(Math.random() * 4) + 1;
        }
        else {
            indexArray = categoriesId;
        }

        if (indexArray != 5) {
            while (indexElement == tmp) {
                tmp = Math.floor(Math.random() * apologies[indexArray].length) + 0;
            }
            indexElement = tmp;
            apology = apologies[indexArray][indexElement];
        }
        else {
            while (indexElement == tmp) {
                tmp = Math.floor(Math.random() * apologies[5][teacherId].length) + 0;
            }
            indexElement = tmp;
            apology = apologies[5][teacherId][indexElement];
        }

        $('#apology').text(apology);
    });
});

function submitActivation() {
    // Checking the completion of the form
    let teacherStatus = $("#teacher").val();
    let categoryStatus = $("#categories").val();

    if (teacherStatus != null && categoryStatus != null) {
        $('#submitBtn').removeAttr("disabled");
    }
}