"use strict";

// Arcane Compendium Items by Category
const commonWeapon = [ "vorpal binding", "king slayer", "touch of greatness", "giant slayer" ];
const sharedWeapon = [ "eldritch inscriptions", "hero's heart", "shield breaker", "supernatural dexterity" ];
const commonArmour = [ "destiny's call", "basalt infusion", "warding of unity" ];
const sharedArmour = [ "death cheater", "ghostly guard", ];
const commonShield = [ "wild warding", ];
const sharedShield = [ "dusk forged", "sigil of protection", ];
const commonArtefact = [ "talisman of shielding", "talisman of the void", "magical heirloom", "crown of the wizard king", "mimic cloak", ];
const sharedArtefact = [ "essence of a free mind", "mask of mindless violence", "obsidian rock", "rod of battle", ];
const commonPotion = [ "binding scroll", "potion of power preservation", "dragon's brew", "potion of swiftness", ];
const sharedPotion = [ "potion of healing", "scroll of draining", "scroll of power", "spell scroll", ];
const commonBanner = [ "stalker's standard", "sheltering standard", "flaming standard", "aether icon", ];
const sharedBanner = [ "banner of courage", "banner of speed", "distortion emblem", "rending banner" ];

const arcCompAll = commonWeapon.concat(sharedWeapon, commonArmour, sharedArmour, commonShield, sharedShield, commonArtefact, sharedArtefact, commonPotion, sharedPotion, commonBanner, sharedBanner);
const arcCompCommon = commonWeapon.concat(commonArmour, commonShield, commonArtefact, commonPotion, commonBanner);
const arcCompShared = sharedWeapon.concat(sharedArmour, sharedShield, sharedArtefact, sharedPotion, sharedBanner);

const sharedItems = {
    "bh" : [ "hero's heart", "supernatural dexterity", "death cheater", "mask of mindless violence", "potion of healing", "scroll of power", "spell scroll", "banner of courage", "banner of speed", "distortion emblem", ],
    "de" : [ "hero's heart", "shield breaker", "supernatural dexterity", "death cheater", "mask of mindless violence", "potion of healing", "scroll of power", "spell scroll", "banner of courage", "banner of speed", ],
    "dh" : [],
    "dl" : [], // DL doesn't have items. Provide empty array to prevent "undefined" situations when looping over all armies
    "eos" : [ "hero's heart", "ghostly guard", "dusk forged", "sigil of protection", "essence of a free mind", "scroll of draining", "scroll of power", "spell scroll", "distortion emblem", "rending banner", ],
    "he" : [ "eldritch inscriptions", "supernatural dexterity", "ghostly guard", "dusk forged", "sigil of protection", "essence of a free mind", "obsidian rock", "rod of battle", "scroll of power", "distortion emblem", ],
    "id" : [ "hero's heart", "shield breaker", "ghostly guard", "dusk forged", "sigil of protection", "essence of a free mind", "obsidian rock", "spell scroll", "banner of courage", "rending banner", ],
    "koe" : [ "hero's heart", "shield breaker", "ghostly guard", "dusk forged", "sigil of protection", "potion of healing", "scroll of draining", "banner of courage", "banner of speed", "distortion emblem", ],
    "ok" : [ "eldritch inscriptions", "hero's heart", "shield breaker", "death cheater", "rod of battle", "potion of healing", "scroll of draining", "scroll of power", "banner of courage", "banner of speed", ],
    "ong" : [ "eldritch inscriptions", "shield breaker", "death cheater", "mask of mindless violence", "potion of healing", "scroll of draining", "spell scroll", "banner of courage", "banner of speed", "distortion emblem", ],
    "sa" : [ "eldritch inscriptions", "shield breaker", "death cheater", "ghostly guard", "dusk forged", "essence of a free mind", "mask of mindless violence", "obsidian rock", "scroll of power", "rending banner", ],
    "se" : [ "eldritch inscriptions", "supernatural dexterity", "ghostly guard", "essence of a free mind", "rod of battle", "obsidian rock", "potion of healing", "scroll of draining", "spell scroll", "rending banner", ],
    "ud" : [ "hero's heart", "ghostly guard", "essence of a free mind", "obsidian rock", "scroll of draining", "scroll of power", "spell scroll", "banner of speed", "distortion emblem", ],
    "vc" : [ "eldritch inscriptions", "supernatural dexterity", "death cheater", "ghostly guard", "dusk forged", "essence of a free mind", "mask of mindless violence", "obsidian rock", "rod of battle", "banner of speed", ],
    "vs" : [ "eldritch inscriptions", "death cheater", "obsidian rock", "rod of battle", "potion of healing", "scroll of power", "spell scroll", "banner of courage", "banner of speed", "distortion emblem", ],
    "wdg" : [ "hero's heart", "shield breaker", "supernatural dexterity", "death cheater", "dusk forged", "sigil of protection", "mask of mindless violence", "rod of battle", "spell scroll", "banner of speed", ],
};




// BH
const bhItems = [
    "hawthorne curse", "ancestral carvings", "fatal folly", "twin hungers",
    "aaghor's affliction", "trickster's cunning", "wild form",
    "obscuring fog",
    "banner of the wild herd",
    "pillager icon", "crown of madness", "horn of bragh", "eye of dominance",
    "rain augur brew", "seed of the dark forest",
];

// DE
const deItems = [
    "mastery of slaughter", "height of hubris", "lacerating touch", "transcendence", "pride of gar daecos",
    "seal of the republic",
    "caedhren's pennon", "banner of urlain", "eye of the gorgon",
    "ceinran's scales", "moithir's mirror", "ring of the obsidian thrones", "beastmaster's vial",
];

// DH
const dhItems = [
    "rune of destruction", "rune of smashing", "rune of quickening", "rune of might", "rune of penetration",
    "rune of anger", "rune of precision", "rune of craftmanship", "rune of lightning", "rune of fire", "rune of returning",
    "rune of steel", "rune of resistance", "rune of iron", "rune of retribution", "rune of the forge",
    "runic standard of the hold", "runic standard of swiftness", "runic standard of grudges", "runic standard of wisdom",
    "runic standard of dismay", "runic standard of steadiness", "runic standard of the anvil",
    "rune of denial", "rune of devouring", "rune of grounding", "rune of harnessing", "rune of channelling",
    "rune of dragon's breath", "rune of readiness", "rune of shielding", "rune of the courage", "rune of storms",
    "rune of kinship", "rune of mining",
];
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
    "sliver of the blazing dawn", "nova flare", "cadaron's heartwood", /* TODO report this to NR */ "cadaron’s heartwood", "elemental blade",
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
    "banner of shamut", "banner of the twice-branded", "their master's banner",
    "breath of the brass bull", "ring of desiccation", "tablet of vezodinezh", "mask of ages", "golden idol of shamut", "lugar's dice",
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
    "scroll of desiccation",
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
    "zealots' banner", "icon of the infinite", "wasteland torch",
    "veilgate orb", "dark familiar", "immortal gauntlets", "lord of the damned",
    "wyrd stone"
];

const allItems = arcCompAll.concat(bhItems, deItems, dhItems, eosItems, heItems, idItems, koeItems, okItems, ongItems, saItems, seItems, udItems, vcItems, vsItems, wdgItems);
const armyItems = bhItems.concat(deItems, dhItems, eosItems, heItems, idItems, koeItems, okItems, ongItems, saItems, seItems, udItems, vcItems, vsItems, wdgItems);

// exports
module.exports = {
    "arcCompAll" : arcCompAll,
    "arcCompCommon" : arcCompCommon,
    "arcCompShared" : arcCompShared,
    "allItems" : allItems,
    "armyItems" : armyItems,
    "sharedItems": sharedItems,
    "bh" : bhItems,
    "de" : deItems,
    "dh" : dhItems,
    "dl" : [], // DL doesn't have items. Provide empty array to prevent "undefined" situations when looping over all armies
    "eos" : eosItems,
    "he" : heItems,
    "id" : idItems,
    "koe" : koeItems,
    "ok" : okItems,
    "ong" : ongItems,
    "sa" : saItems,
    "se" : seItems,
    "ud" : udItems,
    "vc" : vcItems,
    "vs" : vsItems,
    "wdg" : wdgItems,
    commonWeapon,
    sharedWeapon, 
    commonArmour, 
    sharedArmour, 
    commonShield, 
    sharedShield, 
    commonArtefact, 
    sharedArtefact, 
    commonPotion, 
    sharedPotion, 
    commonBanner, 
    sharedBanner,
};
