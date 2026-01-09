"use strict";

const units = require("./units.js");
const optionsNew = require("./options.json");
const allItems = require("./old/specialItems.js").allItems;
const magicalness = require("./magicalness.js").magicalness;

// Constants
const SPECIAL = "Special";
const CORE = "Core";
const CHARACTERS = "Characters";


// #################################################################################################################
//      Test Code
// #################################################################################################################

// let reportList = {
//     "units": {
//         "Damsel": [
//             {
//                 "totalCost": 520,
//                 "amount": 1
//             }
//         ],
//         "Duke": [
//             {
//                 "totalCost": 335,
//                 "amount": 1
//             }
//         ],
//         "Paladin": [
//             {
//                 "totalCost": 285,
//                 "amount": 1
//             }
//         ],
//         "Knights of the Realm": [
//             {
//                 "totalCost": 510,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 505,
//                 "amount": 1
//             }
//         ],
//         "Knights of the Quest": [
//             {
//                 "totalCost": 595,
//                 "amount": 1
//             }
//         ],
//         "Sky Heralds": [
//             {
//                 "totalCost": 210,
//                 "amount": 1
//             }
//         ],
//         "Yeoman Outriders": [
//             {
//                 "totalCost": 150,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 150,
//                 "amount": 1
//             }
//         ],
//         "Fey Knight": [
//             {
//                 "totalCost": 380,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 360,
//                 "amount": 1
//             }
//         ]
//     },
//     "options": {
//         "General": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Recruiting Officer": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Battleline Hero": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Innovative Leader": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Trusted Adviser": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Glory Hunter": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Curse of Lycanthropy": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Light Troops": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Heraldic Steed": [
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Pegasus Charger": [
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 140,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 140,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Fey Steed": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 140,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 140,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Destrier": [
//             {
//                 "totalCost": 50,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 1,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Revered Unicorn": [
//             {
//                 "totalCost": 80,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 1,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Wizard Adept": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Wizard Master": [
//             {
//                 "totalCost": 150,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Divination": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Foresight": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Chance of Redemption": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "The Stars Align": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Fate's Judgement": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Augury of Despair": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Inescapable Doom": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Druidism": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Fountain of Youth": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Entwining Roots": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Veil of Mist": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Gravel Storm": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Stone Skin": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Quicksand": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Shamanism": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Predator's Instinct": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Savage Fury": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Awaken the Beast": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Swarm of Insects": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Wild Spikes": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Totemic Summon": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Prayer Etched": [
//             {
//                 "totalCost": 90,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 90,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 90,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Destiny's Call": [
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Percival's Panoply": [
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Basalt Infusion": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Warding of Unity": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Ghostly Guard": [
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 1,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Vorpal Binding": [
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Tristan's Resolve": [
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Hero's Heart": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 1,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "King Slayer": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Shield Breaker": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Touch of Greatness": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Giant Slayer": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Talisman of the Void": [
//             {
//                 "totalCost": 50,
//                 "amount": 1,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Talisman of Shielding": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Magical Heirloom": [
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Mimic Cloak": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Crown of the Wizard King": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Sacred Chalice": [
//             {
//                 "totalCost": 15,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 15,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 15,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Binding Scroll": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Potion of Power Preservation": [
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Dragon's Brew": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Black Knight's Tonic": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Scroll of Draining": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Potion of Healing": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Potion of Swiftness": [
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Sainted": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Damsel"
//             }
//         ],
//         "Battle Standard Bearer": [
//             {
//                 "totalCost": 50,
//                 "amount": 1,
//                 "parentUnit": "Duke"
//             }
//         ],
//         "Hippogriff": [
//             {
//                 "totalCost": 260,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 300,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Paired Weapons": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 3,
//                 "parentUnit": "Sky Heralds"
//             }
//         ],
//         "Halberd": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Mortal Reminder": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Lance": [
//             {
//                 "totalCost": 20,
//                 "amount": 1,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Divine Judgement": [
//             {
//                 "totalCost": 65,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 65,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Uther's Mettle": [
//             {
//                 "totalCost": 30,
//                 "amount": 1,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Bastard Sword": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Great Weapon": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Relic Shroud": [
//             {
//                 "totalCost": 55,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Oriflamme": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Banner of Speed": [
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Stalker's Standard": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Castellan's Crest": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Lady's Favour": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Banner of Roland": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Distortion Emblem": [
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Sheltering Standard": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Flaming Standard": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Banner of Courage": [
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Aether Icon": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Dusk Forged": [
//             {
//                 "totalCost": 65,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 65,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Wild Warding": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Fortress of Faith": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Sigil of Protection": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Sainted and Gallantry": [
//             {
//                 "totalCost": 80,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             },
//             {
//                 "totalCost": 100,
//                 "amount": 0,
//                 "parentUnit": "Paladin"
//             }
//         ],
//         "Valour": [
//             {
//                 "totalCost": 65,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             }
//         ],
//         "Honour": [
//             {
//                 "totalCost": 65,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             }
//         ],
//         "Excellence": [
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             }
//         ],
//         "Justice": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             }
//         ],
//         "Forbearance": [
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             }
//         ],
//         "Faith": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Duke"
//             }
//         ],
//         "Generosity": [
//             {
//                 "totalCost": 25,
//                 "amount": 1,
//                 "parentUnit": "Duke"
//             }
//         ],
//         "Knights of the Realm": [
//             {
//                 "totalCost": 35,
//                 "amount": 11,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 11,
//                 "parentUnit": "Knights of the Realm"
//             }
//         ],
//         "Solemn Oath": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             }
//         ],
//         "Musician": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Sky Heralds"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             }
//         ],
//         "Standard Bearer": [
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Quest"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Sky Heralds"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             }
//         ],
//         "Knight Banneret": [
//             {
//                 "totalCost": 30,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 1,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Fresh Meat": [
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Realm"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Knights of the Quest"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Sky Heralds"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             }
//         ],
//         "Knights of the Quest": [
//             {
//                 "totalCost": 65,
//                 "amount": 9,
//                 "parentUnit": "Knights of the Quest"
//             }
//         ],
//         "Sky Heralds": [
//             {
//                 "totalCost": 35,
//                 "amount": 3,
//                 "parentUnit": "Sky Heralds"
//             }
//         ],
//         "Light Lance": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Sky Heralds"
//             }
//         ],
//         "Yeoman Outriders": [
//             {
//                 "totalCost": 8,
//                 "amount": 5,
//                 "parentUnit": "Yeoman Outriders"
//             },
//             {
//                 "totalCost": 8,
//                 "amount": 5,
//                 "parentUnit": "Yeoman Outriders"
//             }
//         ],
//         "Bow": [
//             {
//                 "totalCost": 0,
//                 "amount": 5,
//                 "parentUnit": "Yeoman Outriders"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 5,
//                 "parentUnit": "Yeoman Outriders"
//             }
//         ],
//         "Throwing Weapons": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             }
//         ],
//         "Shield": [
//             {
//                 "totalCost": 1,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             },
//             {
//                 "totalCost": 1,
//                 "amount": 0,
//                 "parentUnit": "Yeoman Outriders"
//             }
//         ],
//         "Champion of the Green Knight": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Fey Knight"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Fey Knight"
//             }
//         ],
//         "Warden of the Hooded Man": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Fey Knight"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Fey Knight"
//             }
//         ],
//         "Chosen of the Snow Childe": [
//             {
//                 "totalCost": 20,
//                 "amount": 1,
//                 "parentUnit": "Fey Knight"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Fey Knight"
//             }
//         ]
//     },
//     "refs": {
//         "characters": 1,
//         "wizard": 1,
//         "damsel": 1,
//         "tag_Human": 9,
//         "tag_Holy Vows": 4,
//         "army_general": 3,
//         "leadershipSkills": 3,
//         "recruiting_officer": 3,
//         "leadership_skill": 9,
//         "heraldic_steed_mount_unit": 1,
//         "mount": 15,
//         "gallantry": 16,
//         "tag_Mount": 23,
//         "pegasus_charger_mount_unit": 3,
//         "flyer": 5,
//         "fey_steed_unit": 3,
//         "tag_Fey": 5,
//         "destrier_mount_unit": 3,
//         "revered_unicorn_mount_unit": 3,
//         "wizardAdept": 1,
//         "wizardMaster": 1,
//         "divination": 1,
//         "spell": 18,
//         "druidism": 1,
//         "shamanism": 1,
//         "prayer_etched_ring": 3,
//         "ae_destiny": 3,
//         "cavalry_banner": 3,
//         "ae_basalt_inject": 3,
//         "ae_warding_unity": 3,
//         "ae_phantom": 3,
//         "army_unique": 84,
//         "weaponEnchantUni": 87,
//         "we_vorpal_binding": 13,
//         "tristan_resolve": 7,
//         "we_hero_heart": 7,
//         "we_king_slayer": 13,
//         "we_shield_breaker": 13,
//         "we_grace_touched": 13,
//         "we_giant_slayer": 13,
//         "art_void_talis": 3,
//         "protect_talis": 3,
//         "art_magical_inh": 3,
//         "art_mimic_cloak": 3,
//         "art_wizard_crown": 3,
//         "sacred_chalice": 3,
//         "art_blocking_scroll": 3,
//         "pot_preservation": 3,
//         "dragons_brew": 3,
//         "black_knight_tonic": 3,
//         "pot_negation": 3,
//         "pot_healing": 3,
//         "art_speed_pot": 3,
//         "one_use_item": 3,
//         "sainted": 3,
//         "duke": 1,
//         "tag_Metal Armour": 7,
//         "army_bsb": 1,
//         "hippogriff_mount_unit": 2,
//         "mortal_reminder": 4,
//         "bane_breaker": 2,
//         "warsong_stirng": 2,
//         "relic_shroud": 7,
//         "oriflamme": 7,
//         "be_speed": 4,
//         "be_ranger": 4,
//         "castella_crast": 7,
//         "lord_arms": 7,
//         "banner_of_roland": 7,
//         "be_distortion": 4,
//         "be_sheltering": 4,
//         "be_burning": 4,
//         "be_discipline": 4,
//         "be_ether": 4,
//         "ce_duskforge": 2,
//         "se_wild_warding": 2,
//         "fortress_faith": 2,
//         "se_sigil_of_protection": 2,
//         "kp_valour": 1,
//         "kp_honour": 1,
//         "kp_excellence": 1,
//         "kp_justice": 1,
//         "kp_forebearance": 1,
//         "kp_faith": 1,
//         "kp_generosity": 1,
//         "paladin": 1,
//         "core": 1,
//         "knightsOfTheRealm": 2,
//         "core_unit": 2,
//         "knights_of_the_realm_amount": 2,
//         "solemn_oath": 2,
//         "knight_banneret": 3,
//         "recruitingOfficer": 6,
//         "fresh_meat": 6,
//         "special": 1,
//         "knightsOfTheQuest": 1,
//         "knights_of_the_quest_amount": 1,
//         "skyHeralds": 1,
//         "tag_Light Armour": 3,
//         "sky_heralds_amount": 1,
//         "yeomanOutriders": 2,
//         "yeoman_outriders_amount": 2,
//         "small_arms_fire": 4,
//         "fey": 1,
//         "feyKnight": 2,
//         "green_k_champ": 2,
//         "warden_hooded": 2,
//         "snow_chosen": 2,
//         "mounts": 1
//     },
//     "forces": {}
// };
// /*
// reportList = {
//     "units": {
//         "Goblin Witch": [
//             {
//                 "totalCost": 325,
//                 "amount": 1
//             }
//         ],
//         "Goblin Demagogue": [
//             {
//                 "totalCost": 175,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 1
//             }
//         ],
//         "Mad Git": [
//             {
//                 "totalCost": 55,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 55,
//                 "amount": 1
//             }
//         ],
//         "Gogtuk Initiate": [
//             {
//                 "totalCost": 50,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 1
//             }
//         ],
//         "Goblin Rabble": [
//             {
//                 "totalCost": 430,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 430,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 205,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 180,
//                 "amount": 1
//             }
//         ],
//         "Iron Orcs": [
//             {
//                 "totalCost": 375,
//                 "amount": 1
//             }
//         ],
//         "Goblin Artillery": [
//             {
//                 "totalCost": 170,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 170,
//                 "amount": 1
//             }
//         ],
//         "Gogtuk Neophytes": [
//             {
//                 "totalCost": 160,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 160,
//                 "amount": 1
//             }
//         ],
//         "Grotling Scrap Wagon": [
//             {
//                 "totalCost": 110,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 110,
//                 "amount": 1
//             },
//             {
//                 "totalCost": 110,
//                 "amount": 1
//             }
//         ]
//     },
//     "options": {
//         "General": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Darrmu": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Recruiting Officer": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Battleline Hero": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Innovative Leader": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Trusted Adviser": [
//             {
//                 "totalCost": 25,
//                 "amount": 1,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Glory Hunter": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Curse of Lycanthropy": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Mad Git"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Light Troops": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Beastie": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Creepy-Crawlies": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Beastie Chariot": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 80,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 80,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Pet Monster": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 85,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 85,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Huntsman Spider": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Gargantula": [
//             {
//                 "totalCost": 290,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 360,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 360,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Wizard Apprentice": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Wizard Adept": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Wizard Master": [
//             {
//                 "totalCost": 150,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Witchcraft": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Evil Eye": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Soured Luck": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Illusory Paths": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Cauldron's Curse": [
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Clouded Sight": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Mists of Invisibility": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Thaumaturgy": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Smite the Unbeliever": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Light of Faith": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Weight of Judgement": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Holy Affliction": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Wrath of God": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Rain of Fire": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Pyromancy": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Fireball": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Flaming Swords": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Dragon's Roar": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Pyroclastic Flow": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Pillars of Fire": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Cage of Embers": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             }
//         ],
//         "Death Cheater": [
//             {
//                 "totalCost": 100,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 100,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 100,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Tazrek's Guard": [
//             {
//                 "totalCost": 75,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 75,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 75,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Destiny's Call": [
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Basalt Infusion": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Warding of Unity": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Omen of the Apocalypse": [
//             {
//                 "totalCost": 110,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 110,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 110,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Vorpal Binding": [
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 70,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Attack Gnasher": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "King Slayer": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Shield Breaker": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Touch of Greatness": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Giant Slayer": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Eldritch Inscriptions": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Skull Fetish": [
//             {
//                 "totalCost": 75,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 75,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 75,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Monster Munch": [
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 1,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Talisman of the Void": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Talisman of Shielding": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Magical Heirloom": [
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Mimic Cloak": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Crown of the Wizard King": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Pan of Protection Pinchin'": [
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Mask of Mindless Violence": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Troll Hide": [
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Binding Scroll": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Moon Shrooms": [
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 50,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Potion of Power Preservation": [
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Dragon's Brew": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Potion of Healing": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Gnasher Bait": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Spell Scroll": [
//             {
//                 "totalCost": 30,
//                 "amount": 1,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Potion of Swiftness": [
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Scroll of Draining": [
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Witch"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Captain and Attached": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Darrmu and Goblin Gardens": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Solitary": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Battle Standard Bearer": [
//             {
//                 "totalCost": 60,
//                 "amount": 1,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 60,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Banner of Speed": [
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 45,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Stalker's Standard": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Sheltering Standard": [
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 30,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Flaming Standard": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Distortion Emblem": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Goga Cauldron": [
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 1,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 1,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 25,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Banner of Courage": [
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 20,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Aether Icon": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Shield": [
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 25,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 25,
//                 "parentUnit": "Goblin Rabble"
//             }
//         ],
//         "Wild Warding": [
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 40,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Bow": [
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 1,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 1,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 1,
//                 "amount": 25,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 1,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             }
//         ],
//         "Paired Weapons": [
//             {
//                 "totalCost": 5,
//                 "amount": 1,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Great Weapon": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Lance": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Poisoned Spear": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Demagogue"
//             }
//         ],
//         "Netter": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Headhunter": [
//             {
//                 "totalCost": 5,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Mauler": [
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Initiate"
//             }
//         ],
//         "Goblin Rabble": [
//             {
//                 "totalCost": 5,
//                 "amount": 50,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 50,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 25,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 5,
//                 "amount": 25,
//                 "parentUnit": "Goblin Rabble"
//             }
//         ],
//         "Spear and Shield": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             }
//         ],
//         "Poisoned Spear and Shield": [
//             {
//                 "totalCost": 2,
//                 "amount": 50,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 2,
//                 "amount": 50,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 2,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 2,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             }
//         ],
//         "Musician": [
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Neophytes"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Neophytes"
//             }
//         ],
//         "Standard Bearer": [
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Iron Orcs"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Neophytes"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 1,
//                 "parentUnit": "Gogtuk Neophytes"
//             }
//         ],
//         "Fresh Meat": [
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Goblin Rabble"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Neophytes"
//             },
//             {
//                 "totalCost": 35,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Neophytes"
//             }
//         ],
//         "Iron Orcs": [
//             {
//                 "totalCost": 19,
//                 "amount": 20,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Crossbow": [
//             {
//                 "totalCost": 2,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Headbashers": [
//             {
//                 "totalCost": 2,
//                 "amount": 0,
//                 "parentUnit": "Iron Orcs"
//             }
//         ],
//         "Skewerer": [
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Artillery"
//             },
//             {
//                 "totalCost": 0,
//                 "amount": 0,
//                 "parentUnit": "Goblin Artillery"
//             }
//         ],
//         "Git Launcher": [
//             {
//                 "totalCost": 80,
//                 "amount": 1,
//                 "parentUnit": "Goblin Artillery"
//             },
//             {
//                 "totalCost": 80,
//                 "amount": 1,
//                 "parentUnit": "Goblin Artillery"
//             }
//         ],
//         "Splatterer": [
//             {
//                 "totalCost": 90,
//                 "amount": 0,
//                 "parentUnit": "Goblin Artillery"
//             },
//             {
//                 "totalCost": 90,
//                 "amount": 0,
//                 "parentUnit": "Goblin Artillery"
//             }
//         ],
//         "Gogtuk Neophytes": [
//             {
//                 "totalCost": 10,
//                 "amount": 10,
//                 "parentUnit": "Gogtuk Neophytes"
//             },
//             {
//                 "totalCost": 10,
//                 "amount": 10,
//                 "parentUnit": "Gogtuk Neophytes"
//             }
//         ],
//         "Creepers": [
//             {
//                 "totalCost": 1,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Neophytes"
//             },
//             {
//                 "totalCost": 1,
//                 "amount": 0,
//                 "parentUnit": "Gogtuk Neophytes"
//             }
//         ]
//     },
//     "refs": {
//         "characters": 1,
//         "goblinWitch": 1,
//         "wizard": 1,
//         "goblin_cunning": 27,
//         "tag_Goblin": 30,
//         "tag_Light Armour": 25,
//         "army_general": 3,
//         "darrmu": 3,
//         "leadershipSkills": 19,
//         "recruiting_officer": 19,
//         "leadership_skill": 57,
//         "mount": 40,
//         "beastie_mount_option": 3,
//         "beastie_mount_unit": 11,
//         "tag_Mount": 20,
//         "beastie_chariot_mount_option": 3,
//         "beastieChariot_mount_unit": 3,
//         "tag_Construct": 8,
//         "pet_monster_mount_option": 3,
//         "petMonster_mount_unit": 3,
//         "gargantula_mount_option": 3,
//         "gargantula_mount_unit": 3,
//         "tag_Beast": 3,
//         "archer_broods": 57,
//         "wizardApprentice": 1,
//         "wizardAdept": 1,
//         "wizardMaster": 1,
//         "witchcraft": 1,
//         "spell": 18,
//         "thaumaturgy": 1,
//         "pyromancy": 1,
//         "ae_vc_deathcheat": 3,
//         "tazrek's guard_16mqw57": 3,
//         "ae_destiny": 3,
//         "ae_basalt_inject": 3,
//         "ae_warding_unity": 3,
//         "omen of the apocalypse_7sf3si4t": 3,
//         "weaponEnchantUni": 80,
//         "army_unique": 73,
//         "we_vorpal_binding": 11,
//         "attack_gnasher": 11,
//         "we_king_slayer": 11,
//         "we_shield_breaker": 11,
//         "we_grace_touched": 11,
//         "we_giant_slayer": 11,
//         "we_eldritch_ins": 11,
//         "dominant": 10,
//         "skull fetish_x8o5myu": 3,
//         "monster munch_qdpf71aa": 3,
//         "art_void_talis": 3,
//         "protect_talis": 3,
//         "art_magical_inh": 3,
//         "art_mimic_cloak": 3,
//         "art_wizard_crown": 3,
//         "pan of protection pinchin'_3n1ilyts": 3,
//         "art_mask_of_mindless_violence": 3,
//         "troll_hide": 3,
//         "art_blocking_scroll": 3,
//         "moon_shrroms": 3,
//         "pot_preservation": 3,
//         "dragons_brew": 3,
//         "pot_healing": 3,
//         "gnasher_whistle": 3,
//         "scroll_spell": 3,
//         "art_speed_pot": 3,
//         "one_use_item": 3,
//         "pot_negation": 3,
//         "goblinDemagogue": 2,
//         "tag_Metal Armour": 3,
//         "leadership_amount": 2,
//         "solitary": 2,
//         "army_bsb": 2,
//         "be_speed": 7,
//         "be_ranger": 7,
//         "be_sheltering": 7,
//         "be_burning": 7,
//         "be_distortion": 7,
//         "goga brew_hzyne4vv": 7,
//         "be_discipline": 7,
//         "be_ether": 7,
//         "se_wild_warding": 2,
//         "madGit": 8,
//         "not_a_leader": 16,
//         "gogtukInitiate": 8,
//         "netter": 8,
//         "headhunter": 8,
//         "mauler": 8,
//         "gogtuk_initiate_amount": 8,
//         "core": 1,
//         "goblinRabble": 4,
//         "core_unit": 4,
//         "goblin_rabble_amount": 4,
//         "recruitingOfficer": 7,
//         "fresh_meat": 7,
//         "special": 1,
//         "ironOrcs": 1,
//         "brood_rivalry": 1,
//         "tag_Orc": 1,
//         "iron_orcs_amount": 1,
//         "iron_orc_xbows": 1,
//         "headbashers": 1,
//         "standard_bearer": 1,
//         "goblinArtillery": 2,
//         "skewerer": 2,
//         "death_from_above": 6,
//         "git_launcher": 2,
//         "splatterer_or_git_launcher": 4,
//         "splatterer": 2,
//         "gogtukNeophytes": 2,
//         "gogtuk_neophytes_amount": 2,
//         "creepers_9a29l3yc": 2,
//         "grotlingScrapWagon": 3,
//         "tag_Grotling": 3,
//         "mounts": 1
//     },
//     "forces": {}
// };
// */

// reportList = {
//                     "units": {
//                         "Sorcerer": [
//                             {
//                                 "totalCost": 665,
//                                 "amount": 1
//                             }
//                         ],
//                         "Warriors": [
//                             {
//                                 "totalCost": 785,
//                                 "amount": 1
//                             }
//                         ],
//                         "Warhounds": [
//                             {
//                                 "totalCost": 130,
//                                 "amount": 1
//                             }
//                         ],
//                         "Chosen Knights": [
//                             {
//                                 "totalCost": 570,
//                                 "amount": 1
//                             }
//                         ],
//                         "Forsworn": [
//                             {
//                                 "totalCost": 500,
//                                 "amount": 1
//                             }
//                         ],
//                         "Hellmaw": [
//                             {
//                                 "totalCost": 340,
//                                 "amount": 1
//                             }
//                         ],
//                         "Feldraks": [
//                             {
//                                 "totalCost": 310,
//                                 "amount": 1
//                             }
//                         ],
//                         "Chimera": [
//                             {
//                                 "totalCost": 260,
//                                 "amount": 1
//                             }
//                         ],
//                         "Warrior Chariot": [
//                             {
//                                 "totalCost": 220,
//                                 "amount": 1
//                             },
//                             {
//                                 "totalCost": 220,
//                                 "amount": 1
//                             }
//                         ]
//                     },
//                     "options": {
//                         "General": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Recruiting Officer": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Battleline Hero": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Innovative Leader": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Trusted Adviser": [
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Glory Hunter": [
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Curse of Lycanthropy": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Light Troops": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "War Dais": [
//                             {
//                                 "totalCost": 45,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Black Steed": [
//                             {
//                                 "totalCost": 50,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Scythed Skywheel": [
//                             {
//                                 "totalCost": 50,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Dark Chariot": [
//                             {
//                                 "totalCost": 70,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Battleshrine": [
//                             {
//                                 "totalCost": 190,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Standard Bearer": [
//                             {
//                                 "totalCost": 15,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 1,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 1,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 1,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 1,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Molten Copper": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Whispers of the Veil": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Danse Macabre": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Wrath of God": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Wasteland Behemoth": [
//                             {
//                                 "totalCost": 300,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Additional Limbs": [
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Wasteland Dragon": [
//                             {
//                                 "totalCost": 320,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Wizard Adept": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Wizard Master": [
//                             {
//                                 "totalCost": 150,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Alchemy": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Living Steel": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Corruption of Tin": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Wall of Lead": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Word of Iron": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Quicksilver Lash": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Evocation": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Chorus of the Damned": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Touch of the Reaper": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Spectral Blades": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Soul Blight": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Occultism": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "The Devouring Dark": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Hand of Glory": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Blood Curse": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Pentagram of Pain": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Umbral Majesty": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "The Grave Calls": [
//                             {
//                                 "totalCost": 0,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Zealots' Banner": [
//                             {
//                                 "totalCost": 60,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 60,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 60,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 60,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 60,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Stalker's Standard": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 1,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Banner of Speed": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 1,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Wasteland Torch": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Icon of the Infinite": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Sheltering Standard": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Flaming Standard": [
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Aether Icon": [
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 1,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Death Cheater": [
//                             {
//                                 "totalCost": 100,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Destiny's Call": [
//                             {
//                                 "totalCost": 70,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Thrice-Forged": [
//                             {
//                                 "totalCost": 60,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Basalt Infusion": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Warding of Unity": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Gladiator's Spirit": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Paired Weapons": [
//                             {
//                                 "totalCost": 5,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Vorpal Binding": [
//                             {
//                                 "totalCost": 70,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 70,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Hero's Heart": [
//                             {
//                                 "totalCost": 50,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 50,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "King Slayer": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Symbol of Slaughter": [
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Shield Breaker": [
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Touch of Greatness": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Supernatural Dexterity": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Giant Slayer": [
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             },
//                             {
//                                 "totalCost": 25,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Burning Portent": [
//                             {
//                                 "totalCost": 110,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Veilgate Orb": [
//                             {
//                                 "totalCost": 100,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Dark Familiar": [
//                             {
//                                 "totalCost": 60,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Talisman of the Void": [
//                             {
//                                 "totalCost": 50,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Talisman of Shielding": [
//                             {
//                                 "totalCost": 50,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Immortal Gauntlets": [
//                             {
//                                 "totalCost": 50,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Magical Heirloom": [
//                             {
//                                 "totalCost": 45,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Mimic Cloak": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Crown of the Wizard King": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Lord of the Damned": [
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Rod of Battle": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Mask of Mindless Violence": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Binding Scroll": [
//                             {
//                                 "totalCost": 50,
//                                 "amount": 1,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Potion of Power Preservation": [
//                             {
//                                 "totalCost": 45,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Dragon's Brew": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Wyrd Stone": [
//                             {
//                                 "totalCost": 40,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Spell Scroll": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Potion of Swiftness": [
//                             {
//                                 "totalCost": 20,
//                                 "amount": 0,
//                                 "parentUnit": "Sorcerer"
//                             }
//                         ],
//                         "Warriors": [
//                             {
//                                 "totalCost": 20,
//                                 "amount": 25,
//                                 "parentUnit": "Warriors"
//                             }
//                         ],
//                         "Spiked Shield": [
//                             {
//                                 "totalCost": 2,
//                                 "amount": 25,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             }
//                         ],
//                         "Great Weapon": [
//                             {
//                                 "totalCost": 4,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 6,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Halberd": [
//                             {
//                                 "totalCost": 4,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 3,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Gluttony": [
//                             {
//                                 "totalCost": 2,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             }
//                         ],
//                         "Envy": [
//                             {
//                                 "totalCost": 2,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 20,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             },
//                             {
//                                 "totalCost": 20,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             }
//                         ],
//                         "Lust": [
//                             {
//                                 "totalCost": 2,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 4,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 20,
//                                 "amount": 1,
//                                 "parentUnit": "Warrior Chariot"
//                             },
//                             {
//                                 "totalCost": 20,
//                                 "amount": 1,
//                                 "parentUnit": "Warrior Chariot"
//                             }
//                         ],
//                         "Pride": [
//                             {
//                                 "totalCost": 2,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 0,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             }
//                         ],
//                         "Sloth": [
//                             {
//                                 "totalCost": 6,
//                                 "amount": 25,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             }
//                         ],
//                         "Wrath": [
//                             {
//                                 "totalCost": 6,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             }
//                         ],
//                         "Greed": [
//                             {
//                                 "totalCost": 8,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 5,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 20,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             },
//                             {
//                                 "totalCost": 20,
//                                 "amount": 0,
//                                 "parentUnit": "Warrior Chariot"
//                             }
//                         ],
//                         "Musician": [
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 10,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Fresh Meat": [
//                             {
//                                 "totalCost": 35,
//                                 "amount": 1,
//                                 "parentUnit": "Warriors"
//                             },
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Warhounds"
//                             },
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Chosen Knights"
//                             },
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Forsworn"
//                             },
//                             {
//                                 "totalCost": 35,
//                                 "amount": 0,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Warhounds": [
//                             {
//                                 "totalCost": 10,
//                                 "amount": 8,
//                                 "parentUnit": "Warhounds"
//                             }
//                         ],
//                         "Chosen Knights": [
//                             {
//                                 "totalCost": 120,
//                                 "amount": 4,
//                                 "parentUnit": "Chosen Knights"
//                             }
//                         ],
//                         "Forsworn": [
//                             {
//                                 "totalCost": 65,
//                                 "amount": 6,
//                                 "parentUnit": "Forsworn"
//                             }
//                         ],
//                         "Damnation": [
//                             {
//                                 "totalCost": 10,
//                                 "amount": 6,
//                                 "parentUnit": "Forsworn"
//                             }
//                         ],
//                         "Feldraks": [
//                             {
//                                 "totalCost": 100,
//                                 "amount": 3,
//                                 "parentUnit": "Feldraks"
//                             }
//                         ],
//                         "Wings": [
//                             {
//                                 "totalCost": 30,
//                                 "amount": 0,
//                                 "parentUnit": "Chimera"
//                             }
//                         ]
//                     },
//                     "refs": {
//                         "perso": 1,
//                         "wizard": 1,
//                         "sorcerer": 1,
//                         "tag_Human": 2,
//                         "tag_Metal Armour": 6,
//                         "army_general": 1,
//                         "leadershipSkills": 1,
//                         "recruiting_officer": 1,
//                         "leadership_skill": 3,
//                         "mount": 7,
//                         "warDais_mount_unit": 1,
//                         "tag_Mount": 10,
//                         "blackSteed_mount_unit": 1,
//                         "scythedSkywheel_mount_unit": 1,
//                         "solitary": 3,
//                         "darkChariot_mount_unit": 1,
//                         "tag_Construct": 3,
//                         "battleshrine_mount_unit": 1,
//                         "tag_Irredeemable": 1,
//                         "spell": 22,
//                         "wastelandBehemoth_mount_unit": 1,
//                         "legendary_beast": 3,
//                         "tag_Beast": 5,
//                         "flyer": 2,
//                         "mount_dragon": 1,
//                         "wizardAdept": 1,
//                         "wizardMaster": 1,
//                         "alchemy": 1,
//                         "evocation": 1,
//                         "occultism": 1,
//                         "wdg_be_zeal": 5,
//                         "be_ranger": 5,
//                         "be_speed": 5,
//                         "wdg_wasteland_torch": 5,
//                         "wdg_be_infinite": 5,
//                         "be_sheltering": 5,
//                         "be_burning": 5,
//                         "be_ether": 5,
//                         "ae_vc_deathcheat": 1,
//                         "ae_destiny": 1,
//                         "ae_wdg_thrice": 1,
//                         "ae_basalt_inject": 1,
//                         "ae_warding_unity": 1,
//                         "spe_gladiator": 1,
//                         "army_unique": 21,
//                         "weaponEnchantUni": 17,
//                         "we_vorpal_binding": 2,
//                         "we_hero_heart": 2,
//                         "we_king_slayer": 2,
//                         "symbol_slaughter": 2,
//                         "we_shield_breaker": 2,
//                         "we_grace_touched": 2,
//                         "we_sur_dex": 2,
//                         "we_giant_slayer": 2,
//                         "burning_portent": 1,
//                         "wdg_forebodorb": 1,
//                         "wdg_dark_familiar": 1,
//                         "art_void_talis": 1,
//                         "protect_talis": 1,
//                         "wdg_immogaunt": 1,
//                         "art_magical_inh": 1,
//                         "art_mimic_cloak": 1,
//                         "art_wizard_crown": 1,
//                         "wdg_lord_damned": 1,
//                         "art_rod_of_battle": 1,
//                         "bound_spell": 1,
//                         "art_mask_of_mindless_violence": 1,
//                         "art_blocking_scroll": 1,
//                         "pot_preservation": 1,
//                         "dragons_brew": 1,
//                         "wdg_wyrdstone": 1,
//                         "scroll_spell": 1,
//                         "art_speed_pot": 1,
//                         "one_use_item": 1,
//                         "base": 1,
//                         "warriors": 1,
//                         "core_unit": 1,
//                         "tag_Path of the Favoured": 4,
//                         "warriors_amount": 1,
//                         "warrior_favour": 7,
//                         "favour_greed": 4,
//                         "recruitingOfficer": 5,
//                         "fresh_meat": 5,
//                         "warhounds": 1,
//                         "beat": 1,
//                         "warhounds_count": 1,
//                         "special": 1,
//                         "chosen_knights": 1,
//                         "chosen_model": 1,
//                         "tag_": 3,
//                         "chosen_knights_numbers": 1,
//                         "forsworn": 1,
//                         "tag_Path of the Exiled": 1,
//                         "forsworn_amount": 1,
//                         "forsworn_damnation": 1,
//                         "hellmaw": 1,
//                         "tag_Daemon": 1,
//                         "unit_feldraks": 1,
//                         "tag_Feldrak": 1,
//                         "tag_Centauroid": 1,
//                         "feldrak": 1,
//                         "chimera_unit": 1,
//                         "chimera_wings": 1,
//                         "warrior_charriot": 2,
//                         "warrior_chariot_amount": 2,
//                         "mounts": 1
//                     },
//                     "forces": {}
//                 };

// let result = transformArmyList(reportList, "WDG");
// console.log(JSON.stringify(result, null, 4));


// #################################################################################################################
//      Functions
// #################################################################################################################

function transformArmyList(input, army) {

    let r = {
        "units": [],
    };

    for (let unit in input.units) {
        let index = 0;
        for (let entry of input.units[unit]) {
            r.units.push({
                "name": unit,
                "cost": entry.totalCost,
                "options": [],
                "index": index
            });
            index++;
        }
    }

    for (let option in input.options) {
        // console.log(`Option: ${JSON.stringify(option)}`);
        let unitIndex = 0;
        let previousUnit = "";
        for (let optionEntry of input.options[option]) {
            // Check if this is not the first entry with this name
            // console.log(`Comparing '${optionEntry.parentUnit}' with '${previousUnit}' at unit index ${unitIndex}`);
            if (optionEntry.parentUnit === previousUnit) {
                unitIndex++;
            } else {
                unitIndex = 0;
            }
            previousUnit = optionEntry.parentUnit;

            // Add it as option
            if (optionEntry.amount > 0) {
                // console.log("" + unitIndex + "/" + previousUnit + "/" + JSON.stringify(optionEntry));
                let unitEntry = r.units.find(u => u.name === optionEntry.parentUnit && u.index === unitIndex);
                // Exception handling for fucked up reported list
                while (unitEntry === undefined) {
                    // console.error(`~~ Exception Handling for faulty list ~~`);
                    // console.log(`Could not find unit entry for ${optionEntry.parentUnit}/${unitIndex} in ${JSON.stringify(r.units)}`);
                    let unitAmount = r.units.filter(u => u.name === optionEntry.parentUnit).length;
                    unitIndex = unitIndex - unitAmount;
                    // console.log(`now checking at index ${unitIndex}`);
                    unitEntry = r.units.find(u => u.name === optionEntry.parentUnit && u.index === unitIndex);
                }

                // console.log(JSON.stringify(unitEntry, null, 4));
                // Categorize and optimize options
                if (option === unitEntry.name) {
                    // console.log(`Recognized ${option} as model option for ${unitEntry.name}`);
                    unitEntry.models = optionEntry.amount;
                } else {
                    // console.log(JSON.stringify(optionsNew));
                    categorizeOption(unitEntry, option);
                }
            }
        }
    }

    // Determine category after collecting options, since some units depend on them
    for (let u of r.units) {
        u.category = determineCategory(u, army);
    }

    summarizeCategoryPoints(r, army);

    calculateMagicalness(r);
    calculateModelCounts(r);

    return r;
}

function categorizeOption(unitEntry, option) {
    // console.log("Categorize Option: " + option);
    // console.log(JSON.stringify(allItems, null, 4));
    let optionLower = option.toLowerCase();
    // Try to find it in options first
    let type = "Other";
    if (optionsNew.find(o => o.name.toLowerCase() === optionLower)) {
        type = optionsNew.find(o => o.name.toLowerCase() === optionLower)?.type;
        // console.log(`Found out the type: ${type}`);
        // Skip all spells
        if (type === "Spell") {
            // console.log("Skipping because it is a spell");
            return;
        }
    } else if (allItems.find(s => s.toLowerCase() === optionLower)) {
        type = "Magic Items";
    }
    // console.log("Type is " + type);

    unitEntry.options.push(
        {
            "name": option,
            "type": type
        });
}

function determineCategory(unit, army) {

    let unitEntry = units[army].find(u => u.name === unit.name);
    if (undefined === unitEntry) {
        // eslint-disable-next-line no-console
        console.error(`Could not find unit entry for ${unit.name}`);
        // console.error(JSON.stringify(input, null, 4));
    }

    // Shadow Riders
    if (unit.name === `Shadow Riders`) {
        if (unit.options.some(o => o.name === "Light Lance and Repeater Crossbow")) {
            return SPECIAL;
        }
    }
    // Dancers of Yema
    else if (unit.name === `Temple Militants`) {
        if (unit.options.some(o => o.name === "Dancers of Yema")) {
            return SPECIAL;
        }
    }
    // Raptor Pack
    else if (unit.name === `Raptor Pack`) {
        if (!unit.options.some(o => o.name === "Corrosive Spitter" || o.name === "Ambush")) {
            return CORE;
        }
    }
    // Headbashers
    else if (["Feral Orcs", "Feral Orc Marauders", "Veteran Orcs", "Veteran Orc Marauders"].includes(unit.name)) {
        // console.log(JSON.stringify(unit.options));
        if (unit.options.some(o => o.name === "Headbashers")) {
            return SPECIAL;
        }
    }
    // Conditional Core
    else if (unitEntry.conditionalCore) {
        // console.log(`Found unit with conditional core, checking: ${JSON.stringify(unit)}`);
        if (unit.models >= unitEntry.conditionalCore) {
            // console.log(`Treating the following unit as core: ${JSON.stringify(unit, null, 4)}`);
            return CORE;
        }
    }

    return unitEntry.category;
}

function summarizeCategoryPoints(list, army) {
    let coreFactor = (army === "WDG" || army === "BH") ? 1.25 : 1.00;
    if (army === "OK" && list.units.some(u => u.options.some(o => o.name === "General, Disciplined and Wildheart"))) {
        // console.log(`Found Wildheart list for OK`);
        coreFactor = 1.25;
    }
    list.pointsPerCategory = {
        "Characters": list.units.reduce((a, b) => a + (b.category === CHARACTERS ? b.cost : 0), 0),
        "Core": list.units.reduce((a, b) => a + (b.category === CORE ? b.cost : 0), 0) * coreFactor,
        "Special": list.units.reduce((a, b) => a + (b.category === SPECIAL ? b.cost : 0), 0),
        "Total": list.units.reduce((a, b) => a + b.cost, 0)
    };

    // if(list.pointsPerCategory.Core < 1000) {
    //     console.error(`Core Error for ${army}: ${JSON.stringify(list, null, 4)}`);
    // }
}

function calculateMagicalness(list) {
    let magicInList = 0;

    for (let unit of list.units) {
        if (magicalness[unit.name.toLowerCase()]) {
            magicInList = magicInList + magicalness[unit.name.toLowerCase()];
        } else {
            for (let option of unit.options) {
                if (magicalness[option.name.toLowerCase()]) {
                    if (option.name.toLowerCase() === "wizard conclave") {
                        magicInList = magicInList + magicalness["wizard conclave"][unit.name.toLowerCase()];
                    } else {
                        magicInList = magicInList + magicalness[option.name.toLowerCase()];
                    }
                }
            }
        }
    }

    list.magicalness = magicInList;
}

function calculateModelCounts(list) {
    let modelCount = 0;

    for (let unit of list.units) {
        if (unit.models) {
            modelCount += unit.models;
        } else {
            modelCount++;
        }
    }
    list.modelCount = modelCount;
}

module.exports = {
    transformArmyList
};