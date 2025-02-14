"use strict";

const paths = [ "alchemy", "cosmology", "divination", "druidism", "evocation", "occultism", "pyromancy", "shamanism", "thaumaturgy", "witchcraft"];
const wizardLevels = [ "wizard apprentice", "wizard adept", "wizard master"];
const spells = [ 
    "living steel", "corruption of tin", "wall of lead", "molten copper", "word of iron", "quicksilver lash",
    "altered sight", "truth of time", "weal and woe", "ice and fire", "cosmic scales", "thunder and lightning",
    "foresight", "chance of redemption", "the stars align", "fate's judgement", "augury of despair", "inescapable doom", 
    "fountain of youth", "entwining roots", "veil of mist", "shower of rocks", "stone skin", "quicksand",
    "whispers of the veil", "danse macabre", "chorus of the damned", "touch of the reaper", "spectral blades", "soul blight",
    "the devouring dark", "hand of glory", "blood curse", "pentagram of pain", "umbral majesty", "the grave calls",
    "fireball", "flaming swords", "dragon's roar", "pyroclastic flow", "pillars of fire", "cage of embers",
    "predator's instinct", "savage fury", "awaken the beast", "swarm of insects", "wild spikes", "totemic summon",
    "smite the unbeliever", "light of faith", "weight of judgement", "holy affliction", "wrath of god", "rain of fire",
    "evil eye", "soured luck", "illusory paths", "cauldron's curse", "clouded sight", "mists of invisibility",
];
const meleeWeapons = [ "great weapon", "great weapon and elven finesse", "halberd", "lance", "light lance", "paired weapons", "spear", "spear and shield" ];
const shootingWeapons = [ "bow", "crossbow", "handgun", "longbow", "pistol", "throwing weapons", "breath attack" ];
const commandGroup = [ "standard bearer", "musician",  ];
const leadership = [ "general", "battle standard bearer", "captain and attached", "general, orders, and +1 cou", "battle standard bearer and orders", 
    "general and the dead arise", "general, disciplined, and the dead arise", 
];
const mounts = [ "light troops", "light troops and ambush",
    "raiding chariot", "razortusk chariot", 
    "elven horse", "raptor", "blackmane pegasus", "raptor chariot", "manticore", "imperious dragon",
    "shield bearers", "war throne",
    "dark pulpit", "hellsteed", "burning wheel", "great beast of prophecy", "throne of overwhelming splendour", "strixian spirit",
    "horse", "pegasus", "young griffon", "great griffon", "commanding dragon", "altar of battle", "arcane engine",
    "elven horse", "giant eagle", "griffon", "sky sloop", "reaver chariot", "lion chariot", "regal dragon", "ancient dragon",
    "seat of authority", "vassal steed", "kadim chariot", "bull of shamut", "great bull of shamut", "infernal bastion",
    "destrier", "heraldic steed", "revered unicorn", "pegasus charger", "hippogriff", "fey steed",
    "grunter", "grunter chariot", "wyvern", "beastie", "beastie chariot", "pet monster", "gargantula",
    "tusker", "rock aurochs",
    "anurarch wardens", "saurian raptor", "mountain pteradon", "pouakai sky tyrant", "taurosaur", "alpha carnosaur",
    "elven horse", "great elk", "sylvan unicorn", "forest eagle", "forest dragon",
    "skeletal horse", "skeleton chariot", "amuut", "ark of ages", "sha guardian", 
    "skeletal steed", "spectral steed", "cadaver wagon", "court of the damned", "shrieking horror", "monstrous revenant", "zombie dragon", "colossal zombie dragon", 
    "senatorial litter", "praetorian brute", "triumphal platform", "sacred platform", 
    "black steed", "shadow chaser", "scythed skywheel", "war dais", "dark chariot", "battleshrine", "karkadan", "chimera", "wasteland behemoth", "wasteland dragon",
];
const specialistSkills = [ "trusted adviser", "glory hunter", "curse of lycanthropy", ];
// TODO Still to implement
const armour = [ "shield", "shields", "spiked shield", ];

// exports
module.exports = {
    paths,
    wizardLevels,
    spells,
    meleeWeapons,
    shootingWeapons,
    commandGroup,
    leadership,
    mounts,
    specialistSkills,
};
  