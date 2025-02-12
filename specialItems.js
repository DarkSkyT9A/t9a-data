"use strict";

// Arcane Compendium Items by Category
const commonWeapon = [ "vorpal binding", "king slayer", "touch of greatness", "giant slayer" ];
const sharedWeapon = [ "eldritch inscriptions", "hero's heart", "shield breaker", "supernatural dexterity" ];
const commonArmour = [ "destiny's call", "basalt infusion", "warding of unity" ];
const sharedArmour = [ "death cheater", "ghostly guard", ];
const commonShield = [ "wild warding", ];
const sharedShield = [ "dusk forged", "sigil of protection", ];
const commonArtefact = [ "talisman of shielding", "talisman of the void", "magic heirloom", "crown of the wizard king", "mimic cloak", ];
const sharedArtefact = [ "essence of a free mind", "mask of mindless violence", "obsidian rock", ];
const commonPotion = [ "binding scroll", "potion of power preservation", "dragon's brew", "potion of swiftness", ];
const sharedPotion = [ "potion of healing", "scroll of draining", "scroll of power", "spell scroll (x)", ];
const commonBanner = [ "stalker's standard", "sheltering standard", "flaming standard", "aether icon", ];
const sharedBanner = [ "banner of courage", "banner of speed", "distortion emblem", "rending banner" ];

const arcCompAll = commonWeapon.concat(sharedWeapon, commonArmour, sharedArmour, commonShield, sharedShield, commonArtefact, sharedArtefact, commonPotion, sharedPotion, commonBanner, sharedBanner);

// TODO Add items per army
// BH
// DE
// DH
// DL
// EoS
const eosItems = [
    "the light of sonnstahl", "hammer of witches", "death warrant",
    "imperial seal", "blacksteel", 
    "witchfire guard", "shield of volund",
    "war college banner", "banner of unity", "marksman's pennant", 
    "locket of sunna", "winter cloak", "exemplar's flame", "ullor's horn",
    "scroll of conquest",
];

// HE
const heItems = [
    "sliver of the blazing dawn", "nova flare", "cadaron's heartwood", "elemental blade",
    "star metal alloy", "gleaming robe", "protection of dorac", "daemon's bane",
    "war banner of rymâ", "navigator's banner", "banner of becalming",
    "diadem of protection", "amethyst crystal", "book of meladys", 
    "scroll of the pearl throne", 
];

// ID
const idItems = [
    "onyx core", "flame of the east", "eye of the bull",
    "blaze of protection",
    "kadim binding",
    "banner of shamut", "their master's banner",
    "breath of the brass bull", "ring of desiccation", "tablet of vezodinesh", "mask of ages", "golden idol of shamut", "lugar's dice",
];

// KoE
const koeItems = [
    "divine judgment", "tristan's resolve", "mortal reminder", "uther's mettle",
    "prayer etched", "percival's panoply",
    "fortress of faith",
    "relic shroud", "oriflamme", "banner of roland", "castellan's crest", "lady's favour",
    "sacred chalice", 
    "black knight's tonic",
];

// OK
const okItems = [
    "khagadai's legacy", "viper's curse", "ritual bloodletter", "heart-ripper",
    "wrestler's belt", "mammoth-hide cloak", "aurochs resilience",
    "banner of the gyengget", "pennant of the great grass sky", "skull of qenghet",
    "lygur's tongue", "yeti furs", "rampager's chain",
];

// OnG
const ongItems = [
    "omen of the apocalypse", "attack gnasher", 
    "tazrek's guard",
    "goga cauldron",
    "skull fetish", "monster munch", "pan of protection pinchin'", "troll hide",
    "moon shrooms", "gnasher bait",
];
// SA
const saItems = [
    "glory of the dawn age", "alchemical arrows", "serpent's nest charm", 
    "vital essence", 
    "koru stone", "obelisk of collaboration", 
    "ancient plaque", "imbued jade", "starfall lodestone", "carved tablet",
    "stampede resonator crystal", "te aupouri smokestone",
]

// SE
const seItems = [
    "bough of wyscan", "hunter's honour", "oaken might", "spirit of the whirlwind", "spirit arrows",
    "shielding bark",
    "banner of deception", "predator pennant", "banner of silent mist", 
    "hail shot", "mist walker's mirror", "horn of the wild hunt", "glpyh of amryl",
    "sacred seeds", "song of cenryn",
];

// UD
const udItems = [
    "godslayer", "scourge of kings",
    "jackal's blessing", "sandstorm cloak",
    "sun's embrace",
    "icon of reflection", "sigil of the closed gates", "banner of the entombed",
    "sacred hourglass", "crown of the pharaohs", "death mask of teput", "book of the dead", "kherp sceptre", "blessed wrappings",
    "scroll of dessication",
];

// VC
const vcItems = [
    "reaper's harvest", "true thirst", 
    "legend of the black king",
    "black standard of zagvozd", "banner of eldritch might",
    "necromantic staff", "night's crown", "hypnotic pendant", "eternity gem", "cursed medallion",
];

// VS
const vsItems = [
    "secrets of the doom blade", "storm rocket", "rodentium bullets", "swarm master",
    "plague-hermit's blessing", 
    "sacred aquila", "bell of the deep roads", 
    "crown of hubris", "crown of the usurper", "darkstone detonator", "tome of the ratking", "tarina's lyre",
    "favanite powder", "potion of rat form",
];

// WDG
const wdgItems = [ 
    "burning portent", "symbol of slaughter", 
    "thrice-forged", "gladiator's spirit", 
    "zealot's banner", "icon of the infinite", "wasteland torch",
    "veilgate orb", "dark familiar", "immortal gauntlets", "lord of the damned", 
    "wyrd stone"
];

const allItems = arcCompAll.concat(eosItems, heItems, idItems, koeItems, okItems, ongItems, saItems, seItems, udItems, vcItems, vsItems, wdgItems);


// exports
module.exports = {
    "arcCompAll" : arcCompAll,
    "allItems" : allItems
};

