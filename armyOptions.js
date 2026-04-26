"use strict";

// BH
const bhUpgrades = {
    "Totems": [ "Gnarled Hide Totem", "Blood Horn Totem", "Clouded Eye Totem", "Black Wing Totem" ],
    "Totem Bearers" : [ "Totem Bearer", "Greater Totem Bearer"],
};

// DE
const deItems = {
    "Weapon": ["Mastery of Slaughter", "Height of Hubris", "Lacerating Touch", "Transcendence", "Pride of Gar Daecos",],
    "Armour": ["Seal of the Republic",],
    "Shield": [],
    "Artefact": ["Ceinran's Scales", "Moithir's Mirror", "Ring of the Obsidian Thrones", "Ring of Obsidian Thrones"],
    "Potion": ["Beastmaster's Vial",],
    "Banner": ["Caedhren's Pennon", "Banner of Urlain", "Eye of the Gorgon",],
};

// DH
const dhItems = {
    "Weapon": ["Rune of Destruction", "Rune of Smashing", "Rune of Quickening", "Rune of Might", "Rune of Penetration", "Rune of Anger", "Rune of Precision", "Rune of Craftsmanship", "Rune of Lightning", "Rune of Fire", "Rune of Returning",],
    "Armour": ["Rune of Steel", "Rune of Resistance", "Rune of Iron", "Rune of Retribution", "Rune of the Forge",],
    "Shield": [],
    "Artefact": ["Rune of Denial", "Rune of Devouring", "Rune of Grounding", "Rune of Harnessing", "Rune of Channeling", "Rune of Dragon's Breath", "Rune of Readiness", "Rune of Shielding", "Rune of Courage", "Rune of Storms", "Rune of Kinship", "Rune of Mining",],
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

const allUpgrades = { 
    "bh": bhUpgrades, 
    "de": deItems, 
    "dh": dhItems, 
    "dl": {} /* add DL */, 
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
    "wdg": wdgItems 
};

// exports
module.exports = {
    "bh": bhUpgrades,
    "de": deItems,
    "dh": dhItems,
    "dl": {},
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
};
