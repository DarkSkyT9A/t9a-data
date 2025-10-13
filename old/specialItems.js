"use strict";

// Arcane Compendium Items by Category
const commonWeapon = ["Vorpal Binding", "King Slayer", "Touch of Greatness", "Giant Slayer"];
const commonArmour = ["Destiny's Call", "Basalt Infusion", "Warding of Unity"];
const commonShield = ["Wild Warding",];
const commonArtefact = ["Talisman of Shielding", "Talisman of the Void", "Magical Heirloom", "Crown of the Wizard King", "Mimic Cloak",];
const commonPotion = ["Binding Scroll", "Potion of Power Preservation", "Dragon's Brew", "Potion of Swiftness",];
const commonBanner = ["Stalker's Standard", "Sheltering Standard", "Flaming Standard", "Aether Icon",];

const sharedWeapon = ["Eldritch Inscriptions", "Hero's Heart", "Shield Breaker", "Supernatural Dexterity"];
const sharedArmour = ["Death Cheater", "Ghostly Guard",];
const sharedShield = ["Dusk Forged", "Sigil of Protection",];
const sharedArtefact = ["Essence of a Free Mind", "Mask of Mindless Violence", "Obsidian Rock", "Rod of Battle",];
const sharedPotion = ["Potion of Healing", "Scroll of Draining", "Scroll of Power", "Spell Scroll",];
const sharedBanner = ["Banner of Courage", "Banner of Speed", "Distortion Emblem", "Rending Banner"];

const arcCompAll = commonWeapon.concat(sharedWeapon, commonArmour, sharedArmour, commonShield, sharedShield, commonArtefact, sharedArtefact, commonPotion, sharedPotion, commonBanner, sharedBanner);
const arcCompCommon = {
    "Weapon": commonWeapon,
    "Armour": commonArmour,
    "Shield": commonShield,
    "Artefact": commonArtefact,
    "Potion": commonPotion,
    "Banner": commonBanner,
};


const arcCompShared = {
    "Weapon": sharedWeapon,
    "Armour": sharedArmour,
    "Shield": sharedShield,
    "Artefact": sharedArtefact,
    "Potion": sharedPotion,
    "Banner": sharedBanner,
};

const sharedItems = {
    "Weapon": {
        "Eldritch Inscriptions": ["he", "ok", "ong", "sa", "se", "vc", "vs",],
        "Hero's Heart": ["bh", "de", "eos", "id", "koe", "ok", "ud", "wdg",],
        "Shield Breaker": ["de", "id", "koe", "ok", "ong", "sa", "wdg",],
        "Supernatural Dexterity": ["bh", "de", "he", "se", "vc", "wdg",],
    },
    "Armour": {
        "Death Cheater": ["bh", "de", "ok", "ong", "sa", "vc", "vs", "wdg",],
        "Ghostly Guard": ["eos", "he", "id", "koe", "sa", "se", "ud", "vc",],
    },
    "Shield": {
        "Dusk Forged": ["eos", "he", "id", "koe", "sa", "vc", "wdg",],
        "Sigil of Protection": ["eos", "he", "id", "koe", "wdg",],
    },
    "Artefact": {
        "Essence of a Free Mind": ["eos", "he", "id", "sa", "se", "ud", "vc",],
        "Mask of Mindless Violence": ["bh", "de", "ong", "sa", "vc", "wdg",],
        "Obsidian Rock": ["he", "id", "sa", "se", "ud", "vc", "vs",],
        "Rod of Battle": ["he", "ok", "se", "vc", "vs", "wdg",],
    },
    "Potion": {
        "Potion of Healing": ["bh", "de", "koe", "ok", "ong", "se", "vs",],
        "Scroll of Draining": ["eos", "koe", "ok", "ong", "se", "ud",],
        "Scroll of Power": ["bh", "de", "eos", "he", "ok", "sa", "ud", "vs",],
        "Spell Scroll": ["bh", "de", "eos", "id", "ong", "se", "ud", "vs", "wdg",],
    },
    "Banner": {
        "Banner of Courage": ["bh", "de", "id", "koe", "ok", "ong", "vs",],
        "Banner of Speed": ["bh", "de", "koe", "ok", "ong", "ud", "vc", "vs", "wdg",],
        "Distortion Emblem": ["bh", "eos", "he", "koe", "ong", "ud", "vs",],
        "Rending Banner": ["eos", "id", "sa", "se",],
    }
};

// BH
const bhItems = {
    "Weapon": ["Hawthorne Curse", "Ancestral Carvings", "Fatal Folly", "Twin Hungers",],
    "Armour": ["Aaghor's Affliction", "Trickster's Cunning", "Wild Form",],
    "Shield": ["Obscuring Fog",],
    "Artefact": ["Pillager Icon", "Crown of Madness", "Horn of Bragh", "Eye of Dominance",],
    "Potion": ["Rain Augur Brew", "Seed of the Dark Forest",],
    "Banner": ["Banner of the Wild Herd",],
};

// DE
const deItems = {
    "Weapon": ["Mastery of Slaughter", "Height of Hubris", "Lacerating Touch", "Transcendence", "Pride of Gar Daecos",],
    "Armour": ["Seal of the Republic",],
    "Shield": [],
    "Artefact": ["Ceinran's Scales", "Moithir's Mirror", "Ring of the Obsidian Thrones",],
    "Potion": ["Beastmaster's Vial",],
    "Banner": ["Caedhren's Pennon", "Banner of Urlain", "Eye of the Gorgon",],
};

// DH
const dhItems = {
    "Weapon": ["Rune of Destruction", "Rune of Smashing", "Rune of Quickening", "Rune of Might", "Rune of Penetration", "Rune of Anger", "Rune of Precision", "Rune of Craftsmanship", "Rune of Lightning", "Rune of Fire", "Rune of Returning",],
    "Armour": ["Rune of Steel", "Rune of Resistance", "Rune of Iron", "Rune of Retribution", "Rune of the Forge",],
    "Shield": [],
    "Artefact": ["Rune of Denial", "Rune of Devouring", "Rune of Grounding", "Rune of Harnessing", "Rune of Channelling", "Rune of Dragon's Breath", "Rune of Readiness", "Rune of Shielding", "Rune of the Courage", "Rune of Storms", "Rune of Kinship", "Rune of Mining",],
    "Potion": [],
    "Banner": ["Runic Standard of the Hold", "Runic Standard of Swiftness", "Runic Standard of Grudges", "Runic Standard of Wisdom", "Runic Standard of Dismay", "Runic Standard of Steadiness", "Runic Standard of the Anvil",],
};
// DL
// EoS
const eosItems = {
    "Weapon": ["The Light of Sonnstahl", "Hammer of Witches", "Death Warrant",],
    "Armour": ["Imperial Seal", "Blacksteel",],
    "Shield": ["Witchfire Guard", "Shield of Volund",],
    "Artefact": ["Locket of Sunna", "Winter Cloak", "Exemplar's Flame", "Ullor's Horn",],
    "Potion": ["Scroll of Conquest",],
    "Banner": ["War College Banner", "Banner of Unity", "Marksman's Pennant",],
};

// HE
const heItems = {
    "Weapon": ["Sliver of the Blazing Dawn", "Nova Flare", "Cadaron's Heartwood", /* Todo Report This To Nr */ "Cadaron’s Heartwood", "Elemental Blade",],
    "Armour": ["Star Metal Alloy", "Gleaming Robe", "Protection of Dorac", "Daemon's Bane",],
    "Artefact": ["Diadem of Protection", "Amethyst Crystal", "Book of Meladys",],
    "Potion": ["Scroll of the Pearl Throne",],
    "Banner": ["War Banner of Rymâ", "Navigator's Banner", "Banner of Becalming",],
};

// ID
const idItems = {
    "Weapon": ["Onyx Core", "Flame of the East", "Eye of the Bull",],
    "Armour": ["Blaze of Protection",],
    "Shield": ["Kadim Binding",],
    "Artefact": ["Breath of the Brass Bull", "Ring of Desiccation", "Tablet of Vezodinezh", "Mask of Ages", "Golden Idol of Shamut", "Lugar's Dice",],
    "Banner": ["Banner of Shamut", "Banner of the Twice-Branded", "Their Master's Banner",],
};

// KoE
const koeItems = {
    "Weapon": ["Divine Judgement", "Tristan's Resolve", "Mortal Reminder", "Uther's Mettle",],
    "Armour": ["Prayer Etched", "Percival's Panoply",],
    "Shield": ["Fortress of Faith",],
    "Artefact": ["Sacred Chalice",],
    "Potion": ["Black Knight's Tonic",],
    "Banner": ["Relic Shroud", "Oriflamme", "Banner of Roland", "Castellan's Crest", "Lady's Favour",],
};

// OK
const okItems = {
    "Weapon": ["Khagadai's Legacy", "Viper's Curse", "Ritual Bloodletter", "Heart-Ripper",],
    "Armour": ["Wrestler's Belt", "Mammoth-Hide Cloak", "Aurochs Resilience",],
    "Artefact": ["Lygur's Tongue", "Yeti Furs", "Rampager's Chain",],
    "Banner": ["Banner of the Gyengget", "Pennant of the Great Grass Sky", "Skull of Qenghet",],
};

// OnG
const ongItems = {
    "Weapon": ["Omen of the Apocalypse", "Attack Gnasher",],
    "Armour": ["Tazrek's Guard",],
    "Artefact": ["Skull Fetish", "Monster Munch", "Pan of Protection Pinchin'", "Troll Hide",],
    "Potion": ["Moon Shrooms", "Gnasher Bait",],
    "Banner": ["Goga Cauldron",],
};

// SA
const saItems = {
    "Weapon": ["Glory of the Dawn Age", "Alchemical Arrows", "Serpent's Nest Charm",],
    "Armour": ["Vital Essence",],
    "Artefact": ["Ancient Plaque", "Imbued Jade", "Starfall Lodestone", "Carved Tablet",],
    "Potion": ["Stampede Resonator Crystal", "Te Aupouri Smokestone",],
    "Banner": ["Koru Stone", "Obelisk of Collaboration",],
};

// SE
const seItems = {
    "Weapon": ["Bough Of Wyscan", "Bough of Wyscan", "Hunter's Honour", "Oaken Might", "Spirit of the Whirlwind", "Spirit Arrows",],
    "Armour": ["Shielding Bark",],
    "Artefact": ["Hail Shot", "Mist Walker's Mirror", "Horn of the Wild Hunt", "Glyph of Amryl",],
    "Potion": ["Sacred Seeds", "Song of Cenyrn",],
    "Banner": ["Banner of Deception", "Predator Pennant", "Banner of Silent Mist",],
};

// UD
const udItems = {
    "Weapon": ["Godslayer", "Scourge of Kings",],
    "Armour": ["Jackal's Blessing", "Sandstorm Cloak",],
    "Shield": ["Sun's Embrace",],
    "Artefact": ["Sacred Hourglass", "Crown of the Pharaohs", "Death Mask of Teput", "Book of the Dead", "Kherp Sceptre", "Blessed Wrappings",],
    "Potion": ["Scroll of Desiccation",],
    "Banner": ["Icon of Reflection", "Sigil of the Closed Gates", "Banner of the Entombed",],
};

// VC
const vcItems = {
    "Weapon": ["Reaper's Harvest", "True Thirst",],
    "Armour": ["Legend of the Black King",],
    "Artefact": ["Necromantic Staff", "Night's Crown", "Hypnotic Pendant", "Eternity Gem", "Cursed Medallion",],
    "Banner": ["Black Standard of Zagvozd", "Banner of Eldritch Might",],
};

// VS
const vsItems = {
    "Weapon": ["Secrets of the Doom Blade", "Storm Rocket", "Rodentium Bullets", "Swarm Master",],
    "Armour": ["Plague-Hermit's Blessing",],
    "Artefact": ["Crown of Hubris", "Scepter of the Usurper", "Darkstone Detonator", "Tome of the Ratking", "Tarina's Lyre",],
    "Potion": ["Favanite Powder", "Potion of Rat Form",],
    "Banner": ["Sacred Aquila", "Bell of the Deep Roads",],
};

// WDG
const wdgItems = {
    "Weapon": ["Burning Portent", "Symbol of Slaughter",],
    "Armour": ["Thrice-Forged", "Gladiator's Spirit",],
    "Artefact": ["Veilgate Orb", "Dark Familiar", "Immortal Gauntlets", "Lord of the Damned",],
    "Potion": ["Wyrd Stone"],
    "Banner": ["Zealots' Banner", "Icon of the Infinite", "Wasteland Torch",],
};

const allItems = arcCompAll.concat(Object.values(bhItems).flat(), Object.values(deItems).flat(), Object.values(dhItems).flat(), Object.values(eosItems).flat(), Object.values(heItems).flat(), Object.values(idItems).flat(), Object.values(koeItems).flat(), Object.values(okItems).flat(), Object.values(ongItems).flat(), Object.values(saItems).flat(), Object.values(seItems).flat(), Object.values(udItems).flat(), Object.values(vcItems).flat(), Object.values(vsItems).flat(), Object.values(wdgItems).flat());

const allWeapon = arcCompCommon.Weapon.concat(sharedWeapon, bhItems.Weapon, deItems.Weapon, dhItems.Weapon, eosItems.Weapon, heItems.Weapon, idItems.Weapon, koeItems.Weapon, okItems.Weapon, ongItems.Weapon, saItems.Weapon, seItems.Weapon, udItems.Weapon, vcItems.Weapon, vsItems.Weapon, wdgItems.Weapon);
const allArmour = arcCompCommon.Armour.concat(sharedArmour, bhItems.Armour, deItems.Armour, dhItems.Armour, eosItems.Armour, heItems.Armour, idItems.Armour, koeItems.Armour, okItems.Armour, ongItems.Armour, saItems.Armour, seItems.Armour, udItems.Armour, vcItems.Armour, vsItems.Armour, wdgItems.Armour);
const allShield = arcCompCommon.Shield.concat(sharedShield, bhItems.Shield, deItems.Shield, dhItems.Shield, eosItems.Shield, heItems.shield, idItems.Shield, koeItems.Shield, okItems.shield, ongItems.shield, saItems.shield, seItems.shield, udItems.Shield, vcItems.shield, vsItems.shield, wdgItems.shield);
const allArtefact = arcCompCommon.Artefact.concat(sharedArtefact, bhItems.Artefact, deItems.Artefact, dhItems.Artefact, eosItems.Artefact, heItems.Artefact, idItems.Artefact, koeItems.Artefact, okItems.Artefact, ongItems.Artefact, saItems.Artefact, seItems.Artefact, udItems.Artefact, vcItems.Artefact, vsItems.Artefact, wdgItems.Artefact);
const allPotion = arcCompCommon.Potion.concat(sharedPotion, bhItems.Potion, deItems.Potion, dhItems.Potion, eosItems.Potion, heItems.Potion, idItems.potion, koeItems.Potion, okItems.potion, ongItems.Potion, saItems.Potion, seItems.Potion, udItems.Potion, vcItems.potion, vsItems.Potion, wdgItems.Potion);
const allBanner = arcCompCommon.Banner.concat(sharedBanner, bhItems.Banner, deItems.Banner, dhItems.Banner, eosItems.Banner, heItems.Banner, idItems.Banner, koeItems.Banner, okItems.Banner, ongItems.Banner, saItems.Banner, seItems.Banner, udItems.Banner, vcItems.Banner, vsItems.Banner, wdgItems.Banner);

// exports
module.exports = {
    "arcCompAll": arcCompAll,
    "arcCompCommon": arcCompCommon,
    "arcCompShared": arcCompShared,
    "allItems": allItems,
    "sharedItems": sharedItems,
    "bh": bhItems,
    "de": deItems,
    "dh": dhItems,
    "dl": {}, // DL doesn't have items. Provide empty array to prevent "undefined" situations when looping over all armies
    "eos": eosItems,
    "he": heItems,
    "id": idItems,
    "koe": koeItems,
    "ok": okItems,
    "ong": ongItems,
    "sa": saItems,
    "se": seItems,
    "ud": udItems,
    "vc": vcItems,
    "vs": vsItems,
    "wdg": wdgItems,
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
