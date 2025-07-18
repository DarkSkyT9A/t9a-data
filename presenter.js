"use strict";

// Imports
const fs = require("node:fs");
const args = require('yargs').argv;
const { arcCompAll, arcCompCommon, arcCompShared} = require("./old/specialItems");

// Constants
const DEFAULT_START_DATE = "2025-03-05";

// Class Variables
const date = new Date();
const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

// Evaluate Command Line Arguments
// Define data sources
const tournamentType = args.type || 'single';
const minParticipants = args.minParticipants ? args.minParticipants : 0;
const start = args.start || DEFAULT_START_DATE;
const end = args.end || today;

// Define output display
const showExternalBalance = args.e ? true : false;
const showPickRates = args.p ? true : false;
const showRawData = args.r ? true : false;
const showOptionRates = args.o ? true : false;
const showPricingActions = args.z ? true : false;

// External Balance Data Set
let globalStats = {
  "tournamentsWithReports": [],
  "pointsFirstTurn": [],
  "pointsSecondTurn": [],
  "turns": [],
  "games": 0,
  "specialItems": {}
};

let armies = {
  "BH": {
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "core" : [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "DE": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "DH": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "DL": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "EoS": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "HE": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "ID": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "KoE": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "OK": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "OnG": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "SA": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "SE": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "UD": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "VC": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "VS": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
  "WDG": {
    
    "points": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "vs": {
      "BH": {
        "results": []
      },
      "DE": {
        "results": []
      },
      "DH": {
        "results": []
      },
      "DL": {
        "results": []
      },
      "EoS": {
        "results": []
      },
      "HE": {
        "results": []
      },
      "ID": {
        "results": []
      },
      "KoE": {
        "results": []
      },
      "OK": {
        "results": []
      },
      "OnG": {
        "results": []
      },
      "SA": {
        "results": []
      },
      "SE": {
        "results": []
      },
      "UD": {
        "results": []
      },
      "VC": {
        "results": []
      },
      "VS": {
        "results": []
      },
      "WDG": {
        "results": []
      },
    }
  },
};


fs.readdirSync("data").forEach(folder => {
  // Read metadata and decide whether to go on or not with this tournament
  if (fs.existsSync(`./data/${folder}/metaData.json`)) {
    let tournamentMetaData = JSON.parse(fs.readFileSync(`./data/${folder}/metaData.json`));
    let isUsed = evaluateTournamentInclusion(tournamentMetaData);
    if (!isUsed) {
      return;
    }
  } else {
    console.error(`### Expected meta data for tournament to be available at: ./data/${folder}/metaData.json but wasn't. ###`);
    return;
  }

  // Iterate over reports
  fs.readdirSync(`data/${folder}`).filter(file => file.startsWith("report_")).forEach(reportFile => {

    let report = JSON.parse(fs.readFileSync(`./data/${folder}/${reportFile}`));

    // Points overall
    if(typeof report.scoreOne !== "number" || typeof report.scoreTwo !== "number") {
      console.error(`Result is unreadable of ${folder}/${reportFile} !`);
    }

    // General points
    armies[report.armyOne].points.push(report.scoreOne);
    armies[report.armyTwo].points.push(report.scoreTwo);
    // Games player versus specific enemy for each army
    armies[report.armyOne].vs[report.armyTwo].results.push(report.scoreOne);
    armies[report.armyTwo].vs[report.armyOne].results.push(report.scoreTwo);
    // Point with first turn or second turn
    if (report.firstTurn === 0) {
      armies[report.armyOne].pointsFirst.push(report.scoreOne);
      armies[report.armyTwo].pointsSecond.push(report.scoreTwo);
    } else if (report.firstTurn === 1) {
      armies[report.armyOne].pointsSecond.push(report.scoreOne);
      armies[report.armyTwo].pointsFirst.push(report.scoreTwo);
    } else {
      // console.log(`First turn is unknown: ${report.firstTurn}`);
      armies[report.armyOne].pointsUnknown.push(report.scoreOne);
      armies[report.armyTwo].pointsUnknown.push(report.scoreTwo);
    }

    // Global:
    globalStats.tournamentsWithReports.push(folder);
    globalStats.games++;
    // if (report.turns && report.turns > 0 && report.turns < 7) {
    //   globalStats.turns.push(report.turns);
    // }
    if(report.firstTurn !== -1) {
      globalStats.pointsFirstTurn.push(report.firstTurn === 0 ? report.scoreOne : report.scoreTwo);
      globalStats.pointsSecondTurn.push(report.firstTurn === 0 ? report.scoreTwo : report.scoreOne);
    } 
    // else {
    //   console.log(`Not posting this game to first/second turn counts`);
    // }

    // Core per Army
    if(report?.armyListOne?.pointsPerCategory) {
      armies[report.armyOne].pointsPerCategory = armies[report.armyOne].pointsPerCategory || { "Characters": [], "Core": [],};
      armies[report.armyOne].pointsPerCategory.Characters.push(report.armyListOne.pointsPerCategory.Characters);
      armies[report.armyOne].pointsPerCategory.Core.push(report.armyListOne.pointsPerCategory.Core);
    }

    if(report?.armyListTwo?.pointsPerCategory) {
      armies[report.armyTwo].pointsPerCategory = armies[report.armyTwo].pointsPerCategory || { "Characters": [], "Core": [],};
      armies[report.armyTwo].pointsPerCategory.Characters.push(report.armyListTwo.pointsPerCategory.Characters);
      armies[report.armyTwo].pointsPerCategory.Core.push(report.armyListTwo.pointsPerCategory.Core);
    }

    // Count Options
    countOptionsForList(report?.armyListOne?.units);
    countOptionsForList(report?.armyListTwo?.units);
  });
});

// #################################################################################################################
//      Post Processing
// #################################################################################################################
globalStats.tournamentsWithReports = new Set(globalStats.tournamentsWithReports).size;

for (let army in armies) {
  let firstCount = armies[army].pointsFirst.length;
  let secondCount = armies[army].pointsSecond.length;
  let unknownCount = armies[army].pointsUnknown.length;
  let totalCount = armies[army].points.length;
  // console.log(`${army} - 1st: ${firstCount} - 2nd: ${secondCount} - Unk: ${unknownCount} - Total: ${totalCount}`);
  // console.log(JSON.stringify(armies[army].points, null, 4));
  // console.log(armies[army].points.reduce((a, b) => a + b, 0));
  armies[army].avg = (armies[army].points.reduce((a, b) => a + b, 0) / totalCount).toFixed(1).padStart(4, " ");
  armies[army].first = (armies[army].pointsFirst.reduce((a, b) => a + b, 0) / firstCount).toFixed(1).padStart(4, " ");
  armies[army].second = (armies[army].pointsSecond.reduce((a, b) => a + b, 0) / secondCount).toFixed(1).padStart(4, " ");
  armies[army].games = `${totalCount}`.padStart(4, " ");

  for (let opponent in armies[army].vs) {
    // console.log(`${army} - ${opponent} - ${JSON.stringify(armies[army].vs)}`);
    armies[army].vs[opponent].games = `${armies[army].vs[opponent].results.length}`.padStart(4, " ");
    armies[army].vs[opponent].avg = (armies[army].vs[opponent].results.reduce((a, b) => a + b, 0) / armies[army].vs[opponent].games).toFixed(1).padStart(4, " ");
  }

  // Calculate rank
  const allAverages = [
    parseFloat(armies.BH.avg),    parseFloat(armies.DE.avg),    parseFloat(armies.DH.avg),    parseFloat(armies.DL.avg),
    parseFloat(armies.EoS.avg),    parseFloat(armies.HE.avg),    parseFloat(armies.ID.avg),    parseFloat(armies.KoE.avg),
    parseFloat(armies.OK.avg),    parseFloat(armies.OnG.avg),    parseFloat(armies.SA.avg),    parseFloat(armies.SE.avg),
    parseFloat(armies.UD.avg),    parseFloat(armies.VC.avg),    parseFloat(armies.VS.avg),    parseFloat(armies.WDG.avg),
  ];
  for(let armyString in armies) {
    armies[armyString].rank = (allAverages.filter(x => x > parseFloat(armies[armyString].avg)).length + 1).toString().padStart(2, " ");
  }

  // Calculate amount of core
  // console.log(JSON.stringify(armies[army].pointsPerCategory, null, 4));
  armies[army].core = {
    "error": armies[army].pointsPerCategory.Core.filter(c => c < 950).length,
    "minimal": armies[army].pointsPerCategory.Core.filter(c => c>= 950 && c < 1050).length,
    "some": armies[army].pointsPerCategory.Core.filter(c => c>=1050 && c < 1150).length,
    "more": armies[army].pointsPerCategory.Core.filter(c => c >= 1150).length
  };
  // Convert into percentages
  let total =  armies[army].core.minimal +  armies[army].core.some +  armies[army].core.more;
  armies[army].core.minimalPercent =  (armies[army].core.minimal / total * 100).toFixed(0).padStart(3, " ") + " %";
  armies[army].core.somePercent =  (armies[army].core.some / total * 100).toFixed(0).padStart(3, " ") + " %";
  armies[army].core.morePercent =  (armies[army].core.more / total * 100).toFixed(0).padStart(3, " ") + " %";
  // console.log(JSON.stringify(armies[army].core, null, 4));

}

// #################################################################################################################
//      Display
// #################################################################################################################

// Display meta data
displayMetaData();

// Display global stats
displayGlobalStats();

// Display army stats
displayArmyStats();

// Display core percentages
displayCoreShares();

// Display global special item pick rates
displayGlobalItems();




// #################################################################################################################
//      Helper Functions
// #################################################################################################################

function countOptionsForList(list) {
  if(undefined === list) {
    return;
  }

  for(let u of list) {
    // TODO Count this unit once towards its army (make sure to count multiples correctly)
    for(let o of u.options) {
      // TODO Count each open once towards its army
      
      // Count Special Items towards global counters
      if(arcCompAll.includes(o.name)) {
        globalStats.specialItems[o.name] = globalStats.specialItems[o.name] || 0;
        globalStats.specialItems[o.name] = globalStats.specialItems[o.name] + 1;
      }
    }
  }
}

function evaluateTournamentInclusion(metaData) {
  // Too small
  if (metaData.size < minParticipants) {
    return false;
  }
  // Too early
  if (metaData.start < start) {
    return false;
  }
  // Too late
  if (metaData.start > end) {
    return false;
  }
  // Wrong type
  if (tournamentType === "single" && metaData.type === 1 || tournamentType === "teams" && metaData.type === 0) {
    return false;
  }
  // All good
  return true;
}

function displayMetaData() {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ T9A Data Tool Meta Data                                                     ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Tournament type(s): ${tournamentType}                                                     ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Tournaments in Calculation: ${globalStats.tournamentsWithReports}                                              ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Total amount of games: ${globalStats.games}                                                 ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Time frame from ${start} until ${end}                                 ┃`);
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);

}

function displayGlobalStats() {
  // console.log(`First and second turn stats: ${globalStats.pointsFirstTurn.length} == ${globalStats.pointsSecondTurn.length}`);
  let globalWithTurnKnown = globalStats.pointsFirstTurn.length;
  // console.log(`Games total: ${globalStats.games} vs Games with turn known: ${globalWithTurnKnown}`);
  let firstAvg = (globalStats.pointsFirstTurn.reduce((a, b) => a + b, 0) / globalWithTurnKnown).toFixed(1).padStart(4, " ");
  let secondAvg = (globalStats.pointsSecondTurn.reduce((a, b) => a + b, 0) / globalWithTurnKnown).toFixed(1).padStart(4, " ");

  let decisive = globalStats.pointsFirstTurn.filter(a => a >= 18 || a <= 2).length.toString().padStart(5, " ");
  let normal = globalStats.pointsFirstTurn.filter(a => (a > 2 && a < 7) || (a > 13 && a < 18)).length.toString().padStart(5, " ");
  let close = globalStats.pointsFirstTurn.filter(a => a > 6 && a < 14).length.toString().padStart(5, " ");

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Game Wide Data                                                              ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Average points going first:  ${firstAvg}                                           ┃`);
  console.log(`┃ Average points going second: ${secondAvg}                                           ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Decisive Games (18-20): ${decisive} / ${(decisive * 100 / globalStats.games).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┃ 'Normal' Games (14-17): ${normal} / ${(normal * 100 / globalStats.games).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┃ Close    Games (10-13): ${close} / ${(close * 100 / globalStats.games).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
}

function displayArmyStats() {

  const emptyLine = `┃\x1b[0m      ┃       │      ┃      │      │      │      │      │      │      │      │      │      │      │      │      │      │      │      ┃      │      \x1b[0m┃`;

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1m Army Results – Average Points per Match\x1b[0m                                                                                                          ┃`);
  console.log(`┣━━━━━━┳━━━━━━━┯━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┳━━━━━━┯━━━━━━┫`);
  console.log(`┃ ARMY ┃\x1b[1;106m TOTAL \x1b[0m│ RANK ┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃ 1st  │ 2nd  ┃`);
  console.log(`┣━━━━━━╋━━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━┫`);

  for (let a in armies) {
    console.log(`┃ ${a.padEnd(3, " ")}  ┃\x1b[1;106m  ${armies[a].avg} \x1b[0m│  ${armies[a].rank}  ┃ ${armies[a].vs.BH.avg} │ ${armies[a].vs.DE.avg} │ ${armies[a].vs.DH.avg} │ ${armies[a].vs.DL.avg} │ ${armies[a].vs.EoS.avg} │ ${armies[a].vs.HE.avg} │ ${armies[a].vs.ID.avg} │ ${armies[a].vs.KoE.avg} │ ${armies[a].vs.OK.avg} │ ${armies[a].vs.OnG.avg} │ ${armies[a].vs.SA.avg} │ ${armies[a].vs.SE.avg} │ ${armies[a].vs.UD.avg} │ ${armies[a].vs.VC.avg} │ ${armies[a].vs.VS.avg} │ ${armies[a].vs.WDG.avg} ┃ ${armies[a].first} │ ${armies[a].second} ┃`);
    
    if(a === "WDG") {
      console.log(`┗━━━━━━┻━━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┛`);
    }
    else {
      console.log(emptyLine);
    }
  }

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1m Army Results – Number of Games\x1b[0m                                                                                                ┃`);
  console.log(`┣━━━━━━━┳━━━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┫`);
  console.log(`┃ GAMES ┃ TOTAL  ┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃`);
  console.log(`┣━━━━━━━╋━━━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┫`);

  const emptyLineGames = `┃       ┃        ┃      │      │      │      │      │      │      │      │      │      │      │      │      │      │      │      ┃`;
  for(let a in armies) {
    console.log(`┃  ${a.padEnd(3, " ")}  ┃  ${armies[a].games}  ┃ ${armies[a].vs.BH.games} │ ${armies[a].vs.DE.games} │ ${armies[a].vs.DH.games} │ ${armies[a].vs.DL.games} │ ${armies[a].vs.EoS.games} │ ${armies[a].vs.HE.games} │ ${armies[a].vs.ID.games} │ ${armies[a].vs.KoE.games} │ ${armies[a].vs.OK.games} │ ${armies[a].vs.OnG.games} │ ${armies[a].vs.SA.games} │ ${armies[a].vs.SE.games} │ ${armies[a].vs.UD.games} │ ${armies[a].vs.VC.games} │ ${armies[a].vs.VS.games} │ ${armies[a].vs.WDG.games} ┃`);
    if(a !== "WDG") {
      console.log(emptyLineGames);
    }
  }
  console.log(`┗━━━━━━━┻━━━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┛`);
}


function displayCoreShares() {

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Amount of Core by Army                       ┃`);
  console.log(`┣━━━━━━━━━━━━━━┯━━━━━━━┯━━━━━━━┯━━━━━━━┯━━━━━━━┫`);
  console.log(`┃ Army         │ Error │  Min  │ 5-15% │  >15% ┃`);
  console.log(`┣━━━━━━━━━━━━━━┿━━━━━━━┿━━━━━━━┿━━━━━━━┿━━━━━━━┫`);
  
  for(let army in armies) {
    console.log(`┃ ${army.padEnd(3, " ")}          │ ${("" + armies[army].core.error).padStart(5, " ")} │ ${armies[army].core.minimalPercent} │ ${armies[army].core.somePercent} │ ${armies[army].core.morePercent} ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━┷━━━━━━━┷━━━━━━━┷━━━━━━━┷━━━━━━━┛`);
}


function displayGlobalItems() {

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mSpecial Items – Global Pick Counts                                 \x1b[0m  ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━┯━━━━━━━━┫`);
  console.log(`┃ Category            │ Item Name                    │   #    │   %    ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━┿━━━━━━━━┫`);
  
  for(let item of arcCompCommon.weapon) {
    console.log(`┃ Common Weapon       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompShared.weapon) {
    console.log(`┃ Shared Weapon       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.armour) {
    console.log(`┃ Common Armour       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompShared.armour) {
    console.log(`┃ Shared Armour       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.shield) {
    console.log(`┃ Common Shield       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompShared.shield) {
    console.log(`┃ Shared Shield       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.artefact) {
    console.log(`┃ Common Artefact     │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompShared.artefact) {
    console.log(`┃ Shared Artefact     │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.potion) {
    console.log(`┃ Common Potion       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompShared.potion) {
    console.log(`┃ Shared Potion       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.banner) {
    console.log(`┃ Common Banner       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompShared.banner) {
    console.log(`┃ Shared Banner       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0)*50/globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━┷━━━━━━━━┛`);

  // console.log(JSON.stringify(globalStats.specialItems, null, 4));
}