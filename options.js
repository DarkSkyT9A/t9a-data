"use strict";

const paths = [ "alchemy", "cosmology", "divination", "druidism", "evocation", "occultism", "pyromancy", "shamanism", "thaumaturgy", "witchcraft"];
const wizardLevels = [ "wizard apprentice", "wizard adept", "wizard conclave", "wizard master"];
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
const meleeWeapons = [ "great weapon", "great weapon and elven finesse", "halberd", "halberd and shield", "lance", "lance and shield", "light lance", "light lance and shield", "paired weapons", "spear", "spear and shield", 
    "cavalry pick",
    "infernal weapon",
    "bastard sword",
    "iron fist",
    "poisoned spear and shield",
    "tooth and claw",
    "sylvan blades",
    "gladius and weapon master",  ];
const shootingWeapons = [ "bow", "crossbow", "handgun", "longbow", "pistol", "throwing weapons", "breath attack", 
    "repeater crossbow", "repeater handbow", 
    "repeater pistol", "repeater gun", "brace of pistols and fire on impact", "long rifle", 
    "blunderbuss", "flintlock axe", "pistol and spear",
    "ogre crossbow", "hunting spear", "brace of ogre pistols",
    "poisoned javelin", "magnetic short bow", "blowpipe",
    "sylvan bow", 
    "great aspis bow", "giant aspis bow", "aspis arrows and bow", 
    "canister launcher", "deepfire thrower", "rotary gun", "jezail", "jezail and shield",
    "skinning lash",  ];
const artilleryWeapons = [ 
    "volley gun", "cannon", "imperial rocketeer", "mortar",
    "naphtha thrower", "rocket battery", "titan mortar",
    "trebuchet and change its height to 3", "scorpion",
    "splatterer", "git launcher", "skewerer",
    "rakachit mauss rifle", "skorchit ordnance", 
];
const commandGroup = [ "standard bearer", "musician", "knight banneret", ];

const leadership = [ "general", "battle standard bearer", "captain", "captain and attached", "general, orders, and +1 cou", 
    "battle standard bearer and orders", "general and the dead arise", "general, disciplined, and the dead arise", "general, orders, +1 cou", 
    "exclusive", "general, disciplined and wildheart", 
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
    "light troops and hand-and-a-half", "grunter", "grunter chariot", "wyvern", "beastie", "beastie chariot", "pet monster", "gargantula",
    "tusker", "rock aurochs",
    "light troops and closely guarded", "anurarch wardens", "saurian raptor", "mountain pteradon", "pouakai sky tyrant", "taurosaur", "alpha carnosaur",
    "elven horse", "great elk", "sylvan unicorn", "forest eagle", "forest dragon",
    "skeletal horse", "skeleton chariot", "amuut", "ark of ages", "sha guardian", 
    "skeletal steed", "spectral steed", "cadaver wagon", "court of the damned", "shrieking horror", "monstrous revenant", "zombie dragon", "colossal zombie dragon", 
    "senatorial litter", "praetorian brute", "triumphal platform", "sacred platform", 
    "black steed", "shadow chaser", "scythed skywheel", "war dais", "dark chariot", "battleshrine", "karkadan", "chimera", "wasteland behemoth", "wasteland dragon",
];
const specialistSkills = [ "trusted adviser", "glory hunter", "curse of lycanthropy", "battleline hero", "innovative leader", "recruiting officer", ];

// TODO Still to implement
const armour = [ "shield", "spiked shield", "elven cloak", ];


/** Army Specific */

// HE
const honour = [ "master of canreig tower", "high warden of the flame", "fleet officer", "queen's cavalier", "royal huntsman", 
    "grandmaster of the sword", "queen's companion", "asfad scholar", "order of the fiery heart", ];

// KoE
const knightlyPrinciple = [ "valour", "justice", "honour", "generosity", "forbearance", "faith", "excellence", ];
const heroicTraits = [ "quin", "minstrel", "cleric", "castellan", "bannerman", ];
// OK
const bigName = [ "godspeaker", "gut roarer", "hoardmaster", "trolleater", "spinesplitter", "firebrand", "headhunter", "scraplord", "rottenjaw", ];

// OnG
const trollRace = [ "bridge troll", "forest troll", "river troll", ];

// SA
const howdah = [ "monolith of vitalism", "lodestone shield", "magnetic great bow", "venomous fortress", "carved wisdom", "suncatcher crystal", ];
const arcaneMastery = [ "veil mastery", "forbidden mastery", "eternal mastery", "farseeing mastery", ];
const telepathicMastery = [ "mystifying mastery", "maddening mastery", "invasive mastery", "guiding mastery", ];

// SE
const kindred = [ "forest guardian", "blade dancer", "wild hunter", "pathfinder", "shapeshifter", ];
const aspectOfNature = [ "entangling vines", "scarred bark", "toxic spores", "oaken crown", "verdant rebirth", ];

// UD
const lordOfUndeath = [ "lord of the barrow legion", "commander of the terracotta army", ];
const occupation = [ "deathless noble", "tomb architect", "tomb harbinger"];
// VC
const ancestralBloodPower = [ "lahmia", "sangreal", "strigoi", "vetala", ];
const bloodPowers = ["blood magic", "commandment", "eternal duellist", "ghoul lord", "arcane knowledge", "monster hunter", "crimson rage",
    "storm caller", "flying horror", "mesmerising gaze", "unbreakable will", "mysteries of the night", "bestial bulk", ];

// VS
const mortalOrigin = [ "pontifex maximus", "i am the senate", "lord of the legions", ];
const patronDeity = [ "girded by acratos", "fortified by udius", "enlightened by favana", ];
const house = [ "fetthis fleshmaster", "rakachit technocrat", "skorchit alchemist", "stygian overseer", ];


// WDG
const favour = [ "envy", "gluttony", "greed", "lust", "pride", "sloth", "wrath", ];
const darkGodGift = [ "daemonic wings", "dark prelate", "entropic aura", "idol of spite", "luck of the dark gods", ];


// exports
module.exports = {
    paths,
    wizardLevels,
    spells,
  
    meleeWeapons,
    shootingWeapons,
    artilleryWeapons,
  
    commandGroup,
    leadership,
    mounts,
    specialistSkills,
    armour,

    honour, 

    knightlyPrinciple,
    heroicTraits,

    bigName,

    trollRace, 

    howdah,
    arcaneMastery,
    telepathicMastery,

    kindred,
    aspectOfNature,

    lordOfUndeath,
    occupation,
  
    ancestralBloodPower,
    bloodPowers,

    mortalOrigin,
    patronDeity,
    house,
    darkGodGift,
    favour,
  
};
  