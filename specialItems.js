"use strict";

// Arcane Compendium Items by Category
const commonWeapon = [ "vorpal binding", "king slayer", "touch of greatness", "giant slayer" ];
const commonArmour = [ "destiny's call", "basalt infusion", "warding of unity" ];
const commonShield = [ "wild warding", ];
const commonArtefact = [ "talisman of shielding", "talisman of the void", "magical heirloom", "crown of the wizard king", "mimic cloak", ];
const commonPotion = [ "binding scroll", "potion of power preservation", "dragon's brew", "potion of swiftness", ];
const commonBanner = [ "stalker's standard", "sheltering standard", "flaming standard", "aether icon", ];

const sharedWeapon = [ "eldritch inscriptions", "hero's heart", "shield breaker", "supernatural dexterity" ];
const sharedArmour = [ "death cheater", "ghostly guard", ];
const sharedShield = [ "dusk forged", "sigil of protection", ];
const sharedArtefact = [ "essence of a free mind", "mask of mindless violence", "obsidian rock", "rod of battle", ];
const sharedPotion = [ "potion of healing", "scroll of draining", "scroll of power", "spell scroll", ];
const sharedBanner = [ "banner of courage", "banner of speed", "distortion emblem", "rending banner" ];

const arcCompAll = commonWeapon.concat(sharedWeapon, commonArmour, sharedArmour, commonShield, sharedShield, commonArtefact, sharedArtefact, commonPotion, sharedPotion, commonBanner, sharedBanner);
const arcCompCommon = {
    "weapon" : commonWeapon,
    "armour" : commonArmour, 
    "shield" : commonShield, 
    "artefact" : commonArtefact, 
    "potion": commonPotion, 
    "banner" : commonBanner,
};

const arcCompShared = sharedWeapon.concat(sharedArmour, sharedShield, sharedArtefact, sharedPotion, sharedBanner);

const sharedItems = {
    "weapon" : {
        "eldritch inscriptions" :   [ "he", "ok", "ong", "sa", "se", "vc", "vs", ],
        "hero's heart" :            [ "bh", "de", "eos", "id", "koe", "ok", "ud", "wdg", ],
        "shield breaker" :          [ "de", "id", "koe", "ok", "ong", "sa", "wdg", ],
        "supernatural dexterity" :  [ "bh", "de", "he", "se", "vc", "wdg", ],
    },
    "armour" : {
        "death cheater" :           [ "bh", "de", "ok", "ong", "sa", "vc", "vs", "wdg", ],
        "ghostly guard" :           [ "eos", "he", "id", "koe", "sa", "se", "ud", "vc", ],
    }, 
    "shield" : {
        "dusk forged" :             [ "eos", "he", "id", "koe", "sa", "vc", "wdg", ],
        "sigil of protection" :     [ "eos", "he", "id", "koe", "wdg", ], 
    },
    "artefact" : {
        "essence of a free mind" :  [ "eos", "he", "id", "sa", "se", "ud", "vc", ],
        "mask of mindless violence" :[ "bh", "de", "ong", "sa", "vc", "wdg", ],
        "obsidian rock" :           [ "he", "id", "sa", "se", "ud", "vc", "vs", ],
        "rod of battle" :           [ "he", "ok", "se", "vc", "vs", "wdg", ],
    },
    "potion": {
        "potion of healing" :       [ "bh", "de", "koe", "ok", "ong", "se", "vs", ],
        "scroll of draining" :      [ "eos", "koe", "ok", "ong", "se", "ud",  ],
        "scroll of power" :         [ "bh", "de", "eos", "he", "ok", "sa", "ud", "vs", ],
        "spell scroll" :            [ "bh", "de", "eos", "id", "ong", "se", "ud", "vs", "wdg", ],
    }, 
    "banner" : {
        "banner of courage" :       [ "bh", "de", "id", "koe", "ok", "ong", "vs", ], 
        "banner of speed" :         [ "bh", "de", "koe", "ok", "ong", "ud", "vc", "vs", "wdg", ], 
        "distortion emblem" :       [ "bh", "eos", "he", "koe", "ong", "ud", "vs", ], 
        "rending banner" :          [ "eos", "id", "sa", "se", ],
    }
};

// BH
const bhItems = {
    "weapon" : [ "hawthorne curse", "ancestral carvings", "fatal folly", "twin hungers",],
    "armour" : [ "aaghor's affliction", "trickster's cunning", "wild form", ],
    "shield" : [ "obscuring fog", ],
    "artefact" : [ "pillager icon", "crown of madness", "horn of bragh", "eye of dominance", ],
    "potion" : [ "rain augur brew", "seed of the dark forest", ],
    "banner" : [ "banner of the wild herd", ],
};

// DE
const deItems = {
    "weapon" : [ "mastery of slaughter", "height of hubris", "lacerating touch", "transcendence", "pride of gar daecos", ],
    "armour" : [ "seal of the republic",  ],
    "shield" : [ ],
    "artefact" : [ "ceinran's scales", "moithir's mirror", "ring of the obsidian thrones",  ],
    "potion" : [ "beastmaster's vial", ],
    "banner" : [ "caedhren's pennon", "banner of urlain", "eye of the gorgon", ],
};

// DH
const dhItems = {
    "weapon" : [ "rune of destruction", "rune of smashing", "rune of quickening", "rune of might", "rune of penetration", "rune of anger", "rune of precision", "rune of craftmanship", "rune of lightning", "rune of fire", "rune of returning", ],
    "armour" : [ "rune of steel", "rune of resistance", "rune of iron", "rune of retribution", "rune of the forge", ],
    "shield" : [ ],
    "artefact" : [ "rune of denial", "rune of devouring", "rune of grounding", "rune of harnessing", "rune of channelling", "rune of dragon's breath", "rune of readiness", "rune of shielding", "rune of the courage", "rune of storms", "rune of kinship", "rune of mining", ],
    "potion" : [],
    "banner" : [ "runic standard of the hold", "runic standard of swiftness", "runic standard of grudges", "runic standard of wisdom", "runic standard of dismay", "runic standard of steadiness", "runic standard of the anvil", ],
};
// DL
// EoS
const eosItems = {
    "weapon" : [ "the light of sonnstahl", "hammer of witches", "death warrant", ],
    "armour" : [ "imperial seal", "blacksteel", ],
    "shield" : [ "witchfire guard", "shield of volund", ],
    "artefact" : [ "locket of sunna", "winter cloak", "exemplar's flame", "ullor's horn", ],
    "potion" : [ "scroll of conquest", ],
    "banner" : [ "war college banner", "banner of unity", "marksman's pennant", ],
};

// HE
const heItems = {
    "weapon" : [ "sliver of the blazing dawn", "nova flare", "cadaron's heartwood", /* TODO report this to NR */ "cadaron’s heartwood", "elemental blade", ],
    "armour" : [ "star metal alloy", "gleaming robe", "protection of dorac", "daemon's bane", ],
    "artefact" : [ "diadem of protection", "amethyst crystal", "book of meladys", ],
    "potion" : [ "scroll of the pearl throne", ],
    "banner" : [ "war banner of rymâ", "navigator's banner", "banner of becalming", ],
};

// ID
const idItems = {
    "weapon" : [ "onyx core", "flame of the east", "eye of the bull", ],
    "armour" : [ "blaze of protection", ],
    "shield" : [ "kadim binding", ],
    "artefact" : [ "breath of the brass bull", "ring of desiccation", "tablet of vezodinezh", "mask of ages", "golden idol of shamut", "lugar's dice", ],
    "banner" : [ "banner of shamut", "banner of the twice-branded", "their master's banner", ],
};

// KoE
const koeItems = {
    "weapon" : [ "divine judgment", "tristan's resolve", "mortal reminder", "uther's mettle", ],
    "armour" : [ "prayer etched", "percival's panoply", ],
    "shield" : [ "fortress of faith", ],
    "artefact" : [ "sacred chalice", ],
    "potion" : [ "black knight's tonic", ],
    "banner" : [ "relic shroud", "oriflamme", "banner of roland", "castellan's crest", "lady's favour", ],
};

// OK
const okItems = {
    "weapon" : [ "khagadai's legacy", "viper's curse", "ritual bloodletter", "heart-ripper", ],
    "armour" : [ "wrestler's belt", "mammoth-hide cloak", "aurochs resilience", ],
    "artefact" : [ "lygur's tongue", "yeti furs", "rampager's chain", ],
    "banner" : [ "banner of the gyengget", "pennant of the great grass sky", "skull of qenghet", ],
};

// OnG
const ongItems = {
    "weapon" : [ "omen of the apocalypse", "attack gnasher", ],
    "armour" : [ "tazrek's guard", ],
    "artefact" : [ "skull fetish", "monster munch", "pan of protection pinchin'", "troll hide", ],
    "potion" : [ "moon shrooms", "gnasher bait", ],
    "banner" : [ "goga cauldron", ],
};

// SA
const saItems = {
    "weapon" : [ "glory of the dawn age", "alchemical arrows", "serpent's nest charm", ],
    "armour" : [ "vital essence", ],
    "artefact" : [ "ancient plaque", "imbued jade", "starfall lodestone", "carved tablet", ],
    "potion" : [ "stampede resonator crystal", "te aupouri smokestone", ],
    "banner" : [ "koru stone", "obelisk of collaboration", ],
};

// SE
const seItems = {
    "weapon" : [ "bough of wyscan", "hunter's honour", "oaken might", "spirit of the whirlwind", "spirit arrows", ],
    "armour" : [ "shielding bark", ],
    "artefact" : [ "hail shot", "mist walker's mirror", "horn of the wild hunt", "glpyh of amryl", ],
    "potion" : [ "sacred seeds", "song of cenryn", ],
    "banner" : [ "banner of deception", "predator pennant", "banner of silent mist", ],
};

// UD
const udItems = {
    "weapon" : [ "godslayer", "scourge of kings", ],
    "armour" : [ "jackal's blessing", "sandstorm cloak", ],
    "shield" : [ "sun's embrace", ],
    "artefact" : [ "sacred hourglass", "crown of the pharaohs", "death mask of teput", "book of the dead", "kherp sceptre", "blessed wrappings", ],
    "potion" : [ "scroll of desiccation", ],
    "banner" : [ "icon of reflection", "sigil of the closed gates", "banner of the entombed", ],
};

// VC
const vcItems = {
    "weapon" : [ "reaper's harvest", "true thirst", ],
    "armour" : [ "legend of the black king", ],
    "artefact" : [ "necromantic staff", "night's crown", "hypnotic pendant", "eternity gem", "cursed medallion", ],
    "banner" : [ "black standard of zagvozd", "banner of eldritch might", ],
};

// VS
const vsItems = {
    "weapon" : [ "secrets of the doom blade", "storm rocket", "rodentium bullets", "swarm master", ],
    "armour" : [ "plague-hermit's blessing", ],
    "artefact" : [ "crown of hubris", "crown of the usurper", "darkstone detonator", "tome of the ratking", "tarina's lyre", ],
    "potion" : [ "favanite powder", "potion of rat form", ],
    "banner" : [ "sacred aquila", "bell of the deep roads", ],
};

// WDG
const wdgItems = {
    "weapon" : [ "burning portent", "symbol of slaughter", ],
    "armour" : [ "thrice-forged", "gladiator's spirit", ],
    "artefact" : [ "veilgate orb", "dark familiar", "immortal gauntlets", "lord of the damned", ],
    "potion" : [ "wyrd stone" ],
    "banner" : [ "zealots' banner", "icon of the infinite", "wasteland torch", ],
};

const allItems = arcCompAll.concat(Object.values(bhItems).flat(), Object.values(deItems).flat(), Object.values(dhItems).flat(), Object.values(eosItems).flat(), Object.values(heItems).flat(), Object.values(idItems).flat(), Object.values(koeItems).flat(), Object.values(okItems).flat(), Object.values(ongItems).flat(), Object.values(saItems).flat(), Object.values(seItems).flat(), Object.values(udItems).flat(), Object.values(vcItems).flat(), Object.values(vsItems).flat(), Object.values(wdgItems).flat());

const allWeapon = arcCompCommon.weapon.concat(sharedWeapon, bhItems.weapon, deItems.weapon, dhItems.weapon, eosItems.weapon, heItems.weapon, idItems.weapon, koeItems.weapon, okItems.weapon, ongItems.weapon, saItems.weapon, seItems.weapon, udItems.weapon, vcItems.weapon, vsItems.weapon, wdgItems.weapon);
const allArmour = arcCompCommon.armour.concat(sharedArmour, bhItems.armour, deItems.armour, dhItems.armour, eosItems.armour, heItems.armour, idItems.armour, koeItems.armour, okItems.armour, ongItems.armour, saItems.armour, seItems.armour, udItems.armour, vcItems.armour, vsItems.armour, wdgItems.armour);
const allShield = arcCompCommon.shield.concat(sharedShield, bhItems.shield, deItems.shield, dhItems.shield, eosItems.shield, heItems.shield, idItems.shield, koeItems.shield, okItems.shield, ongItems.shield, saItems.shield, seItems.shield, udItems.shield, vcItems.shield, vsItems.shield, wdgItems.shield);
const allArtefact = arcCompCommon.artefact.concat(sharedArtefact, bhItems.artefact, deItems.artefact, dhItems.artefact, eosItems.artefact, heItems.artefact, idItems.artefact, koeItems.artefact, okItems.artefact, ongItems.artefact, saItems.artefact, seItems.artefact, udItems.artefact, vcItems.artefact, vsItems.artefact, wdgItems.artefact);
const allPotion = arcCompCommon.potion.concat(sharedPotion, bhItems.potion, deItems.potion, dhItems.potion, eosItems.potion, heItems.potion, idItems.potion, koeItems.potion, okItems.potion, ongItems.potion, saItems.potion, seItems.potion, udItems.potion, vcItems.potion, vsItems.potion, wdgItems.potion);
const allBanner = arcCompCommon.banner.concat(sharedBanner, bhItems.banner, deItems.banner, dhItems.banner, eosItems.banner, heItems.banner, idItems.banner, koeItems.banner, okItems.banner, ongItems.banner, saItems.banner, seItems.banner, udItems.banner, vcItems.banner, vsItems.banner, wdgItems.banner);

// exports
module.exports = {
    "arcCompAll" : arcCompAll,
    "arcCompCommon" : arcCompCommon,
    "arcCompShared" : arcCompShared,
    "allItems" : allItems,
    "sharedItems": sharedItems,
    "bh" : bhItems,
    "de" : deItems,
    "dh" : dhItems,
    "dl" : {}, // DL doesn't have items. Provide empty array to prevent "undefined" situations when looping over all armies
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
    sharedWeapon, 
    sharedArmour, 
    sharedShield, 
    sharedArtefact, 
    sharedPotion, 
    sharedBanner,
    allWeapon,
    allArmour,
    allShield,
    allArtefact,
    allBanner,
    allPotion
};
