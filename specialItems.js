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
// HE
// ID
// Koe
// OK
// OnG
// SA
// SE
// UD
// VC
// VS
// WDG

// exports
module.exports = {
    "arcCompAll" : arcCompAll,
};

