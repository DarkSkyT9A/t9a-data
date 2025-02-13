"use strict";

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
  "bh" : wdg,
  "de" : wdg,
  "dh" : wdg,
  "dl" : wdg,
  "eos" : wdg,
  "he" : wdg,
  "id" : wdg,
  "koe" : wdg,
  "ok" : wdg,
  "ong" : wdg,
  "sa" : wdg,
  "se" : se,
  "ud" : ud,
  "vc" : vc,
  "vs" : vs,
  "wdg" : wdg,
};
