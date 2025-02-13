"use strict";

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
    "category" : "breadandgames",
    "experimentalWeapon" : 0
  },
  {
    "name" : "dreadmill chariots",
    "category" : "breadandgames",
    "experimentalWeapon" : 0
  },
  {
    "name" : "arena beast",
    "category" : "breadandgames",
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
  "se" : wdg,
  "ud" : wdg,
  "vc" : wdg,
  "vs" : vs,
  "wdg" : wdg,
};
