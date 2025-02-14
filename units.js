"use strict";

//BH
const bh = [
  {
    "name" : "wildhorn lord",
    "category" : "character",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "wildhorn chieftain",
    "category" : "character",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "soothsayer",
    "category" : "character",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "centaur chieftain",
    "category" : "character",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "minotaur warlord",
    "category" : "character",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "minotaur chieftain",
    "category" : "character",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "wildhorn herd",
    "category" : "core",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "mongrel herd",
    "category" : "core",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "mongrel raiders",
    "category" : "core",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "feral hounds",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "longhorn herd",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "minotaurs",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "centaurs",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "raiding chariots",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "razortusk herd",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "razortusk chariot",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "briar beast",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "gargoyles",
    "category" : "special",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "cyclops",
    "category" : "terrors of the wild",
    "sticksandstones" : 0,
    "bigrocks" : 1,
  },
  {
    "name" : "gortach",
    "category" : "terrors of the wild",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "jabberwock",
    "category" : "terrors of the wild",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
  {
    "name" : "beast giant",
    "category" : "terrors of the wild",
    "sticksandstones" : 0,
    "bigrocks" : 0,
  },
];

// DE
const de = [
  {
    "name" : "dread prince",
    "category" : "character",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "silexian officer",
    "category" : "character",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "temple exarch",
    "category" : "character",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "sanctioned warlock",
    "category" : "character",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "silent assassin",
    "category" : "character",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "silexian spears",
    "category" : "core",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "silexian auxiliaries",
    "category" : "core",
    "raiders" : 1,
    "boltThrowers" : 0,
  },
  {
    "name" : "temple militants",
    "category" : "core",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "corsairs",
    "category" : "core",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "shadow riders",
    "category" : "core",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "dread acolytes",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "dread knights",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "obsidian guard",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "judicators",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "harpies",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "gorgons",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "thunder pack",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "raptor chariot",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "divine altar",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "hunting chariot",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 1,
  },
  {
    "name" : "repeater battery",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 1,
  },
  {
    "name" : "black cloaks",
    "category" : "special",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "kraken",
    "category" : "the menagerie",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "hydra",
    "category" : "the menagerie",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
  {
    "name" : "mist leviathan",
    "category" : "the menagerie",
    "raiders" : 0,
    "boltThrowers" : 0,
  },
];

// DH
const dh = [
  {
    "name" : "king",
    "category" : "character",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "thane",
    "category" : "character",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "runic smith",
    "category" : "character",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "engineer",
    "category" : "character",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "dragon seeker",
    "category" : "character",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "clan warriors",
    "category" : "core",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "greybeards",
    "category" : "core",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "clan marksman",
    "category" : "core",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "king's guard",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "deep watch",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "seekers",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "vengeance seeker",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "hold guardians",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "grudge buster",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "miners",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "anvil of power",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "rangers",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "forge wardens",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "steam copters",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 0,
  },
  {
    "name" : "field artillery",
    "category" : "special",
    "clansThunder" : 0,
    "enginesOfWar" : 1,
  },
];

// DL
const dl = [
  {
    "name" : "harbinger of father chaos",
    "category" : "character",
    "magicShooting" : 0,
  },
  {
    "name" : "kuulima's deceiver",
    "category" : "character",
    "magicShooting" : 0,
  },
  {
    "name" : "maw of akaan",
    "category" : "character",
    "magicShooting" : 0,
  },
  {
    "name" : "miser of sugulag",
    "category" : "character",
    "magicShooting" : 0,
  },
  {
    "name" : "courtesan of cibaresh",
    "category" : "character",
    "magicShooting" : 0,
  },
  {
    "name" : "omen of savar",
    "category" : "character",
    "magicShooting" : 0,
  },
  {
    "name" : "sentinel of nukuja",
    "category" : "character",
    "magicShooting" : 0,
  },
  {
    "name" : "vanadra's scourge",
    "category" : "character",
    "magicShooting" : 0,
  },
  {
    "name" : "imps",
    "category" : "core",
    "magicShooting" : 1,
  },
  {
    "name" : "succubi",
    "category" : "core",
    "magicShooting" : 0,
  },
  {
    "name" : "lemures",
    "category" : "core",
    "magicShooting" : 0,
  },
  {
    "name" : "myrmidons",
    "category" : "core",
    "magicShooting" : 0,
  },
  {
    "name" : "eidolons",
    "category" : "special",
    "magicShooting" : 3,
  },
  {
    "name" : "hellhounds",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "threshing engine",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "titanslayer chariot",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "mageblight gremlins",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "clawed fiends",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "hoarders",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "succubi tempters",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "blazing glory",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "hope harvester",
    "category" : "special",
    "magicShooting" : 5,
  },
  {
    "name" : "brazen beasts",
    "category" : "special",
    "magicShooting" : 0,
  },
  {
    "name" : "furies",
    "category" : "aves",
    "magicShooting" : 0,
  },
  {
    "name" : "veil serpents",
    "category" : "aves",
    "magicShooting" : 0,
  },
  {
    "name" : "bloat flies",
    "category" : "aves",
    "magicShooting" : 0,
  },
];

// EoS
const eos = [
  {
    "name" : "marshal",
    "category" : "character",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "knight commander",
    "category" : "character",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "battlefield wizard",
    "category" : "character",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "prelate",
    "category" : "character",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "artificer",
    "category" : "character",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "inquisitor",
    "category" : "character",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "state infantry",
    "category" : "core",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "state marksmen",
    "category" : "core",
    "imperialAuxiliaries" : 1,
    "imperialArmory" : 0,
  },
  {
    "name" : "local militia",
    "category" : "core",
    "imperialAuxiliaries" : 1,
    "imperialArmory" : 0,
  },
  {
    "name" : "electoral cavalry",
    "category" : "core",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "knightly orders",
    "category" : "core",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "imperial guard",
    "category" : "special",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "knights of the sun griffon",
    "category" : "special",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "arcane engine",
    "category" : "special",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "imperial rangers",
    "category" : "special",
    "imperialAuxiliaries" : 1,
    "imperialArmory" : 0,
  },
  {
    "name" : "reiters",
    "category" : "special",
    "imperialAuxiliaries" : 1,
    "imperialArmory" : 0,
  },
  {
    "name" : "blackpowder artillery",
    "category" : "special",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 1,
  },
  {
    "name" : "flagellants",
    "category" : "sunna's fury",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 0,
  },
  {
    "name" : "steam tank",
    "category" : "sunna's fury",
    "imperialAuxiliaries" : 0,
    "imperialArmory" : 1,
  },
];

// HE
const he = [
  {
    "name" : "high prince",
    "category" : "character",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "commander",
    "category" : "character",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "mage",
    "category" : "character",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "citizen archers",
    "category" : "core",
    "queensBows" : 1,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "citizen spears",
    "category" : "core",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "sea guard",
    "category" : "core",
    "queensBows" : 1,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "highborn lancers",
    "category" : "core",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "erlein reavers",
    "category" : "core",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "sword masters",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "lion guard",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "flame wardens",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "knights of rymâ",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "reaver chariots",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "lion chariot",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "giant eagles",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "initiate of the fiery heart",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 1,
  },
  {
    "name" : "phoenix",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 0,
    "ancientAllies" : 1,
  },
  {
    "name" : "sea guard reaper",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 1,
    "ancientAllies" : 0,
  },
  {
    "name" : "sky sloop",
    "category" : "special",
    "queensBows" : 0,
    "navalOrdnance" : 1,
    "ancientAllies" : 0,
  },
  {
    "name" : "queen's guard",
    "category" : "special",
    "queensBows" : 1,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
  {
    "name" : "grey watchers",
    "category" : "special",
    "queensBows" : 1,
    "navalOrdnance" : 0,
    "ancientAllies" : 0,
  },
];

// ID
const id = [
  {
    "name" : "overlord",
    "category" : "character",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "prophet",
    "category" : "character",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "vizier",
    "category" : "character",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "taurukh commissionary",
    "category" : "character",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "vassal conjurer",
    "category" : "character",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "lamassu scholar",
    "category" : "character",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "infernal warriors",
    "category" : "core",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "citadel guard",
    "category" : "core",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "vassal levies",
    "category" : "core",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "shackled slaves",
    "category" : "core",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "kadim incarnates",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "kadim chariot",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "immortals",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "disciples of lugar",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "taurukh enforcers",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "taurukh anointed",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "vassal cavalry",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "vassal slingshot",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "gunnery team",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "infernal artillery",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "infernal bastion",
    "category" : "special",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "infernal engine",
    "category" : "instruments of destruction",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "kadim titan",
    "category" : "instruments of destruction",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
  {
    "name" : "citizen giant",
    "category" : "instruments of destruction",
    "firesOfIndustry" : 0,
    "blackPowder" : 0,
  },
];

// KoE
const koe = [
  {
    "name" : "damsel",
    "category" : "character",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "duke",
    "category" : "character",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "paladin",
    "category" : "character",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "folk hero",
    "category" : "character",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "knights of the realm",
    "category" : "core",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "hedge knights",
    "category" : "core",
    "gallantry" : 2,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "mounted serjeants",
    "category" : "core",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "lowborn levies",
    "category" : "core",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "lowborn archers",
    "category" : "core",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "men-at-arms",
    "category" : "special",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "sacred reliquary",
    "category" : "special",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "knights of the court",
    "category" : "special",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "knights penitent",
    "category" : "special",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "knights of the quest",
    "category" : "special",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "yeoman outriders",
    "category" : "special",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "enlisted outlaws",
    "category" : "special",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "siege weapon",
    "category" : "special",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 1,
  },
  {
    "name" : "pegasus knights",
    "category" : "special",
    "gallantry" : 2,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "sky heralds",
    "category" : "special",
    "gallantry" : 1,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "naiads",
    "category" : "fey",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "friar's lantern",
    "category" : "fey",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "the lady's courtier",
    "category" : "fey",
    "gallantry" : 0,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
  {
    "name" : "fey knight",
    "category" : "fey",
    "gallantry" : 1,
    "smallArmsFire" : 0,
    "siegeEngines" : 0,
  },
];


// OK
const ok = [
  {
    "name" : "great khan",
    "category" : "character",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "khan",
    "category" : "character",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "shaman",
    "category" : "character",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "mammoth hunter",
    "category" : "character",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "tribesmen",
    "category" : "core",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "bruisers",
    "category" : "core",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "scraplings",
    "category" : "core",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "sabretooth tigers",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "scrapling trappers",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "yetis",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "kin-eater",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "tusker cavalry",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "mercenary veterans",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "mercenary gunners",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "bombardiers",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "thunder cannon",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 1,
  },
  {
    "name" : "scratapult",
    "category" : "special",
    "hiredGuns" : 0,
    "powderKeg" : 1,
  },
  {
    "name" : "rock aurochs",
    "category" : "chained beasts",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "frost mammoth",
    "category" : "chained beasts",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
  {
    "name" : "mercenary giant",
    "category" : "chained beasts",
    "hiredGuns" : 0,
    "powderKeg" : 0,
  },
]
// OnG
const ong = [
  {
    "name" : "orc warlord",
    "category" : "character",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "iron orc loner",
    "category" : "character",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "brood alpha",
    "category" : "character",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "orc shaman",
    "category" : "character",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "goblin demagogue",
    "category" : "character",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "goblin witch",
    "category" : "character",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "gogtuk initiate",
    "category" : "character",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "mad git",
    "category" : "character",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "goblin rabble",
    "category" : "core",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "goblin reavers",
    "category" : "core",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "feral orcs",
    "category" : "core",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "feral orc marauders",
    "category" : "core",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "veteran orcs",
    "category" : "core",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "veteran orc marauders",
    "category" : "core",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "iron orcs",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "iron orc chariots",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "gogtuk neophytes",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "goblin chariots",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "grotlings",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "grotlin scrap wagon",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "gnashers",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "wrecking team",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "trolls",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "goblin artillery",
    "category" : "special",
    "bigAndNasty" : 0,
    "deathFromAbove" : 1,
    "archerBroods" : 0,
  },
  {
    "name" : "giant",
    "category" : "special",
    "bigAndNasty" : 1,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "guardian behemoth",
    "category" : "special",
    "bigAndNasty" : 1,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
  {
    "name" : "great green idol",
    "category" : "special",
    "bigAndNasty" : 1,
    "deathFromAbove" : 0,
    "archerBroods" : 0,
  },
];

// SA
const sa = [
  {
    "name" : "anurarch archmage",
    "category" : "character",
    "saurianShooting" : 0,
  },
  {
    "name" : "caiman mentor",
    "category" : "character",
    "saurianShooting" : 0,
  },
  {
    "name" : "tegu veteran",
    "category" : "character",
    "saurianShooting" : 0,
  },
  {
    "name" : "skink veteran",
    "category" : "character",
    "saurianShooting" : 0,
  },
  {
    "name" : "tegu warriors",
    "category" : "core",
    "saurianShooting" : 0,
  },
  {
    "name" : "skink warriors",
    "category" : "core",
    "saurianShooting" : 0,
  },
  {
    "name" : "skink hunters",
    "category" : "core",
    "saurianShooting" : 1,
  },
  {
    "name" : "caiman warriors",
    "category" : "core",
    "saurianShooting" : 0,
  },
  {
    "name" : "tegu guards",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "tegu mystics",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "raptor pack",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "raptor riders",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "caiman elders",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "thyroscutus herd",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "rhamphodon riders",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "saurian swarms",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "skink guerrillas",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "weapon beasts",
    "category" : "special",
    "saurianShooting" : 2,
  },
  {
    "name" : "pteradon riders",
    "category" : "special",
    "saurianShooting" : 0,
  },
  {
    "name" : "stygiosaur pack",
    "category" : "magna sauria",
    "saurianShooting" : 0,
  },
  {
    "name" : "carnosaur",
    "category" : "magna sauria",
    "saurianShooting" : 0,
  },
  {
    "name" : "taurosaur",
    "category" : "magna sauria",
    "saurianShooting" : 0,
  },
  {
    "name" : "titanopod",
    "category" : "magna sauria",
    "saurianShooting" : 0,
  },
];


// SE
const se = [
  {
    "name" : "forest prince",
    "category" : "characters",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "chieftain",
    "category" : "characters",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "druid",
    "category" : "characters",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "dryad ancient",
    "category" : "characters",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "avatar of nature",
    "category" : "characters",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 2
  },
  {
    "name" : "treefather ancient",
    "category" : "characters",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 1
  },
  {
    "name" : "thicket shepherd",
    "category" : "characters",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "forest guard",
    "category" : "core",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "sylvan archers",
    "category" : "core",
    "sylvanShooting" : 1,
    "sylvanBeasts" : 0
  },
  {
    "name" : "heath riders",
    "category" : "core",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "dryads",
    "category" : "core",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "forest rangers",
    "category" : "special",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "thicket beasts",
    "category" : "special",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "forest eagles",
    "category" : "special",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "blade dancers",
    "category" : "special",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "treefather",
    "category" : "special",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 1
  },
  {
    "name" : "wild huntsmen",
    "category" : "special",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "kestrel knights",
    "category" : "special",
    "sylvanShooting" : 0,
    "sylvanBeasts" : 0
  },
  {
    "name" : "briar maidens",
    "category" : "unseen arrows",
    "sylvanShooting" : 0.5,
    "sylvanBeasts" : 0
  },
  {
    "name" : "sylvan sentinels",
    "category" : "unseen arrows",
    "sylvanShooting" : 2,
    "sylvanBeasts" : 0
  },
  {
    "name" : "pathfinders",
    "category" : "unseen arrows",
    "sylvanShooting" : 2,
    "sylvanBeasts" : 0
  },
];

// UD
const ud = [
  {
    "name" : "pharaoh",
    "category" : "characters",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "nomarch",
    "category" : "characters",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "death cult hierarch",
    "category" : "characters",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "skeleton warriors",
    "category" : "core",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "skeleton archers",
    "category" : "core",
    "aspisArrows" : 1,
    "deathFromAfar" : 0,
  },
  {
    "name" : "skeleton cavalry",
    "category" : "core",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "skeleton scouts",
    "category" : "core",
    "aspisArrows" : 1,
    "deathFromAfar" : 0,
  },
  {
    "name" : "skeleton chariots",
    "category" : "core",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "necropolis guard",
    "category" : "special",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "tomb cataphracts",
    "category" : "special",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "shabtis",
    "category" : "special",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "shabti archers",
    "category" : "special",
    "aspisArrows" : 2,
    "deathFromAfar" : 0,
  },
  {
    "name" : "great vultures",
    "category" : "special",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "scarab swarms",
    "category" : "special",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "sand stalkers",
    "category" : "special",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "casket of phatep",
    "category" : "special",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "charnel catapult",
    "category" : "special",
    "aspisArrows" : 0,
    "deathFromAfar" : 1,
  },
  {
    "name" : "sand scorpion",
    "category" : "entombed",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "battle sphinx",
    "category" : "mason's menagerie",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "dread sphinx",
    "category" : "mason's menagerie",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "tomb reapers",
    "category" : "mason's menagerie",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
  {
    "name" : "colossus",
    "category" : "mason's menagerie",
    "aspisArrows" : 0,
    "deathFromAfar" : 0,
  },
];

// VC
const vc = [
  {
    "name" : "vampire count",
    "category" : "characters",
  },
  {
    "name" : "vampire courtier",
    "category" : "characters",
  },
  {
    "name" : "necromancer",
    "category" : "characters",
  },
  {
    "name" : "barrow king",
    "category" : "characters",
  },
  {
    "name" : "banshee",
    "category" : "characters",
  },
  {
    "name" : "zombies",
    "category" : "core",
  },
  {
    "name" : "skeletons",
    "category" : "core",
  },
  {
    "name" : "ghouls",
    "category" : "core",
  },
  {
    "name" : "bat swarms",
    "category" : "core",
  },
  {
    "name" : "dire wolves",
    "category" : "core",
  },
  {
    "name" : "great bats",
    "category" : "special",
  },
  {
    "name" : "ghasts",
    "category" : "special",
  },
  {
    "name" : "barrow guard",
    "category" : "special",
  },
  {
    "name" : "barrow knights",
    "category" : "special",
  },
  {
    "name" : "cadaver wagon",
    "category" : "special",
  },
  {
    "name" : "dark coach",
    "category" : "special",
  },
  {
    "name" : "court of the damned",
    "category" : "special",
  },
  {
    "name" : "altar of undeath",
    "category" : "special",
  },
  {
    "name" : "phantom hosts",
    "category" : "the suffering",
  },
  {
    "name" : "wraiths",
    "category" : "the suffering",
  },
  {
    "name" : "spectral hunters",
    "category" : "the suffering",
  },
  {
    "name" : "vampire knights",
    "category" : "swift death",
  },
  {
    "name" : "vampire spawn",
    "category" : "swift death",
  },
  {
    "name" : "varkolak",
    "category" : "swift death",
  },
  {
    "name" : "winged reapers",
    "category" : "swift death",
  },
  {
    "name" : "shrieking horror",
    "category" : "swift death",
  },
];

// VS
const vs = [
  {
    "name" : "ruinous dictator",
    "category" : "characters",
    "experimentalWeapon" : 0,
  },
  {
    "name" : "vermin senator",
    "category" : "characters",
    "experimentalWeapon" : 0
  },
  {
    "name" : "bloodfur legate",
    "category" : "characters",
    "experimentalWeapon" : 0
  },
  {
    "name" : "house prefect",
    "category" : "characters",
    "experimentalWeapon" : 0
  },
  {
    "name" : "swarm priest",
    "category" : "characters",
    "experimentalWeapon" : 0
  },
  {
    "name" : "duskblade assassin",
    "category" : "characters",
    "experimentalWeapon" : 0
  },
  {
    "name" : "vermin slingers",
    "category" : "core",
    "experimentalWeapon" : 0
  },
  {
    "name" : "vermin legionaries",
    "category" : "core",
    "experimentalWeapon" : 0
  },
  {
    "name" : "blackfur veterans",
    "category" : "core",
    "experimentalWeapon" : 0
  },
  {
    "name" : "vermin slaves",
    "category" : "core",
    "experimentalWeapon" : 0
  },
  {
    "name" : "plague cultists",
    "category" : "core",
    "experimentalWeapon" : 0
  },
  {
    "name" : "giant rats",
    "category" : "core",
    "experimentalWeapon" : 0
  },
  {
    "name" : "rat swarm",
    "category" : "special",
    "experimentalWeapon" : 0
  },
  {
    "name" : "vermin brutes",
    "category" : "special",
    "experimentalWeapon" : 0,
    "bruteForce" : 1,
  },
  {
    "name" : "gladiator brutes",
    "category" : "special",
    "experimentalWeapon" : 0,
    "bruteForce" : 1,
  },
  {
    "name" : "legionary drill team",
    "category" : "special",
    "experimentalWeapon" : 0
  },
  {
    "name" : "shadowfur stalkers",
    "category" : "special",
    "experimentalWeapon" : 0
  },
  {
    "name" : "doomspark device",
    "category" : "special",
    "experimentalWeapon" : 0
  },
  {
    "name" : "thunder brutes",
    "category" : "special",
    "experimentalWeapon" : 0,
    "bruteForce" : 1,
  },
  {
    "name" : "ignifier grenadiers",
    "category" : "special",
    "experimentalWeapon" : 0
  },
  {
    "name" : "experimental weapon teams",
    "category" : "special",
    "experimentalWeapon" : 1
  },
  {
    "name" : "vermin artillery",
    "category" : "special",
    "experimentalWeapon" : 0
  },
  {
    "name" : "stygian earthbreaker",
    "category" : "bread and games",
    "experimentalWeapon" : 0
  },
  {
    "name" : "dreadmill chariots",
    "category" : "bread and games",
    "experimentalWeapon" : 0
  },
  {
    "name" : "arena beast",
    "category" : "bread and games",
    "experimentalWeapon" : 0
  },

];

// WDG
const wdg = [
  {
    "name" : "exalted herald",
    "category" : "characters",
    "legendaryBeast" : 3,
  },
  {
    "name" : "chosen lord",
    "category" : "characters",
    "legendaryBeast" : 0
  },
  {
    "name" : "doomlord",
    "category" : "characters",
    "legendaryBeast" : 0
  },
  {
    "name" : "sorcerer",
    "category" : "characters",
    "legendaryBeast" : 0
  },
  {
    "name" : "barbarian chief",
    "category" : "characters",
    "legendaryBeast" : 0
  },
  {
    "name" : "feldrak ancestor",
    "category" : "characters",
    "legendaryBeast" : 2
  },
  {
    "name" : "warriors",
    "category" : "core",
    "legendaryBeast" : 0
  },
  {
    "name" : "fallen",
    "category" : "core",
    "legendaryBeast" : 0
  },
  {
    "name" : "barbarians",
    "category" : "core",
    "legendaryBeast" : 0
  },
  {
    "name" : "barbarian horsemen",
    "category" : "core",
    "legendaryBeast" : 0
  },
  {
    "name" : "warhounds",
    "category" : "core",
    "legendaryBeast" : 0
  },
  {
    "name" : "warrior knights",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "warrior chariot",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "chosen",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "chosen knights",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "chosen chariot",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "chimera",
    "category" : "special",
    "legendaryBeast" : 1
  },
  {
    "name" : "wretched ones",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "forsworn",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "feldraks",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "battleshrine",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "flayers",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "hellmaw",
    "category" : "special",
    "legendaryBeast" : 0
  },
  {
    "name" : "forsaken one",
    "category" : "special",
    "legendaryBeast" : 2
  },
  {
    "name" : "marauding giant",
    "category" : "special",
    "legendaryBeast" : 1
  },
  {
    "name" : "feldrak elder",
    "category" : "special",
    "legendaryBeast" : 2
  },

];

// exports
module.exports = {
  "bh" : bh,
  "de" : de,
  "dh" : dh,
  "dl" : dl,
  "eos" : eos,
  "he" : he,
  "id" : id,
  "koe" : koe,
  "ok" : ok,
  "ong" : ong,
  "sa" : sa,
  "se" : se,
  "ud" : ud,
  "vc" : vc,
  "vs" : vs,
  "wdg" : wdg,
};
