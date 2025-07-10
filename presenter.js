"use strict";

// Imports
const fs = require("node:fs");
const args = require('yargs').argv;

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

};

let armies = {
  "BH": {
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
    } else {
      console.log(`Not posting this game to first/second turn counts`);
    }
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

  for (let opponent in armies[army].vs) {
    // console.log(`${army} - ${opponent} - ${JSON.stringify(armies[army].vs)}`);
    armies[army].vs[opponent].games = armies[army].vs[opponent].results.length;
    armies[army].vs[opponent].avg = (armies[army].vs[opponent].results.reduce((a, b) => a + b, 0) / armies[army].vs[opponent].games).toFixed(1).padStart(4, " ");
  }
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
  console.log(`First and second turn stats: ${globalStats.pointsFirstTurn.length} == ${globalStats.pointsSecondTurn.length}`);
  let globalWithTurnKnown = globalStats.pointsFirstTurn.length;
  console.log(`Games total: ${globalStats.games} vs Games with turn known: ${globalWithTurnKnown}`);
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
    console.log(`┃ ${a.padEnd(3, " ")}  ┃\x1b[1;106m  ${armies[a].avg} \x1b[0m│  TBD ┃ ${armies[a].vs.BH.avg} │ ${armies[a].vs.DE.avg} │ ${armies[a].vs.DH.avg} │ ${armies[a].vs.DL.avg} │ ${armies[a].vs.EoS.avg} │ ${armies[a].vs.HE.avg} │ ${armies[a].vs.ID.avg} │ ${armies[a].vs.KoE.avg} │ ${armies[a].vs.OK.avg} │ ${armies[a].vs.OnG.avg} │ ${armies[a].vs.SA.avg} │ ${armies[a].vs.SE.avg} │ ${armies[a].vs.UD.avg} │ ${armies[a].vs.VC.avg} │ ${armies[a].vs.VS.avg} │ ${armies[a].vs.WDG.avg} ┃ ${armies[a].first} │ ${armies[a].second} ┃`);
    console.log(emptyLine);
  }


  // console.log(`┗━━━━━━┻━━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┛`);

  // console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  // console.log(`┃ \x1b[1mTournament Type: ${(args.type || 'Single').padEnd(43, " ") } – Number of Games\x1b[0m                                              ┃`);
  // console.log(`┣━━━━━━┳━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┫`);
  // console.log(`┃GAMES ┃ Total┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃`);
  // console.log(`┣━━━━━━╋━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┫`);

  // const emptyLineGames = `┃      ┃      ┃      │      │      │      │      │      │      │      │      │      │      │      │      │      │      │      ┃`;
  // for(let a in armies) {
  //   console.log(`┃  ${army.toUpperCase().padEnd(3, " ")} ┃ ${resultData[army].all.count} ┃ ${resultData[army][army].count} │ ${resultData[army].de.count} │ ${resultData[army].dh.count} │ ${resultData[army].dl.count} │ ${resultData[army].eos.count} │ ${resultData[army].he.count} │ ${resultData[army].id.count} │ ${resultData[army].koe.count} │ ${resultData[army].ok.count} │ ${resultData[army].ong.count} │ ${resultData[army].sa.count} │ ${resultData[army].se.count} │ ${resultData[army].ud.count} │ ${resultData[army].vc.count} │ ${resultData[army].vs.count} │ ${resultData[army].wdg.count} ┃`);
  //   if(army !== "wdg") {
  //     console.log(emptyLineGames);
  //   }
  // }
  // console.log(`┗━━━━━━┻━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┛`);
}