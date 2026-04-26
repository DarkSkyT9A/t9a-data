/* eslint-disable no-console */
"use strict";

// Imports
const fs = require("node:fs");
const args = require('yargs').argv;
const { arcCompAll, arcCompCommon, arcCompShared, allItems } = require("./specialItems");
const units = require("./units.js");

// Constants
const DEFAULT_START_DATE = "2026-04-20";

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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "core": [],
    "units": units.BH,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.DE,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.DH,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.DL,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.EoS,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.HE,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.ID,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.KoE,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.OK,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.OnG,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.SA,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.SE,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.UD,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.VC,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.VS,
    "specialItems": {},
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
    "pointsWithoutMirror": [],
    "pointsFirst": [],
    "pointsSecond": [],
    "pointsUnknown": [],
    "units": units.WDG,
    "specialItems": {},
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

let setup = {
  "map": {},
  "deployment": {},
  "primary": {},
  "secondary": {}
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
    if (typeof report.scoreOne !== "number" || typeof report.scoreTwo !== "number") {
      console.error(`Result is unreadable of ${folder}/${reportFile} !`);
    }

    // General points
    armies[report.armyOne].points.push(report.scoreOne);
    armies[report.armyTwo].points.push(report.scoreTwo);
    // General points without mirrors
    if (report.armyOne !== report.armyTwo) {
      armies[report.armyOne].pointsWithoutMirror.push(report.scoreOne);
      armies[report.armyTwo].pointsWithoutMirror.push(report.scoreTwo);
    }
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

    // Setup and objectives
    if(report.setup) {
      if(report.setup.map) {
        setup.map[report.setup.map] = setup.map[report.setup.map] ? setup.map[report.setup.map] + 1 : 1;
      }

      if(report.setup.deployment) {
        setup.deployment[report.setup.deployment] = setup.deployment[report.setup.deployment] || [];
        setup.deployment[report.setup.deployment].push(report.firstTurn === 0 ? report.scoreOne : report.scoreTwo);
      }

      if(report.setup.primary) {
        setup.primary[report.setup.primary] = setup.primary[report.setup.primary] || { "count" : 0, "attacker": 0, "defender": 0, "none": 0 };
        setup.primary[report.setup.primary].count = setup.primary[report.setup.primary].count + 1;
        if(report.primary === 2) {
          setup.primary[report.setup.primary].none = setup.primary[report.setup.primary].none + 1;
        } else if(report.primary === report.firstTurn) {
          setup.primary[report.setup.primary].attacker = setup.primary[report.setup.primary].attacker + 1;
        } else {
          setup.primary[report.setup.primary].defender = setup.primary[report.setup.primary].defender + 1;
        }
      }

      if(undefined !== report.setup.secondaryPlayerOne && undefined !== report.setup.secondaryPlayerTwo) {
        setup.secondary[report.setup.secondaryPlayerOne] = setup.secondary[report.setup.secondaryPlayerOne] || { "count" : 0, "attackerWon": 0, "defenderWon": 0, "attackerLost": 0, "defenderLost": 0 };
        setup.secondary[report.setup.secondaryPlayerTwo] = setup.secondary[report.setup.secondaryPlayerTwo] || { "count" : 0, "attackerWon": 0, "defenderWon": 0, "attackerLost": 0, "defenderLost": 0 };
        setup.secondary[report.setup.secondaryPlayerOne].count = setup.secondary[report.setup.secondaryPlayerOne].count + 1;
        setup.secondary[report.setup.secondaryPlayerTwo].count = setup.secondary[report.setup.secondaryPlayerTwo].count + 1;
        
        if(report.firstTurn === 0) {
          if(report.secondaryPlayerOne) {
            setup.secondary[report.setup.secondaryPlayerOne].attackerWon = setup.secondary[report.setup.secondaryPlayerOne].attackerWon + 1;
          } else {
            setup.secondary[report.setup.secondaryPlayerOne].attackerLost = setup.secondary[report.setup.secondaryPlayerOne].attackerLost + 1;
          }
          if(report.secondaryPlayerTwo) {
            setup.secondary[report.setup.secondaryPlayerTwo].defenderWon = setup.secondary[report.setup.secondaryPlayerTwo].defenderWon + 1;
          } else {
            setup.secondary[report.setup.secondaryPlayerTwo].defenderLost = setup.secondary[report.setup.secondaryPlayerTwo].defenderLost + 1;
          }
        } else {
          if(report.secondaryPlayerOne) {
            setup.secondary[report.setup.secondaryPlayerOne].defenderWon = setup.secondary[report.setup.secondaryPlayerOne].defenderWon + 1;
          } else {
            setup.secondary[report.setup.secondaryPlayerOne].defenderLost = setup.secondary[report.setup.secondaryPlayerOne].defenderLost + 1;
          }
          if(report.secondaryPlayerTwo) {
            setup.secondary[report.setup.secondaryPlayerTwo].attackerWon = setup.secondary[report.setup.secondaryPlayerTwo].attackerWon + 1;
          } else {
            setup.secondary[report.setup.secondaryPlayerTwo].attackerLost = setup.secondary[report.setup.secondaryPlayerTwo].attackerLost + 1;
          }
        }
      }
    }

    // Magicalness
    // console.log(report?.armyListOne?.magicalness);
    if (typeof report?.armyListOne?.magicalness !== "undefined") {
      armies[report.armyOne].magicalness = armies[report.armyOne].magicalness || [];
      armies[report.armyOne].magicalness.push(report.armyListOne.magicalness);
    }

    if (typeof report?.armyListTwo?.magicalness !== "undefined") {
      armies[report.armyTwo].magicalness = armies[report.armyTwo].magicalness || [];
      armies[report.armyTwo].magicalness.push(report.armyListTwo.magicalness);
    }

    // Sylvan Shooting
    if (typeof report?.armyListOne?.sylvanShooting !== "undefined") {
      armies[report.armyOne].sylvanShooting = armies[report.armyOne].sylvanShooting || [];
      armies[report.armyOne].sylvanShooting.push(report.armyListOne.sylvanShooting);
    }

    if (typeof report?.armyListTwo?.sylvanShooting !== "undefined") {
      armies[report.armyTwo].sylvanShooting = armies[report.armyTwo].sylvanShooting || [];
      armies[report.armyTwo].sylvanShooting.push(report.armyListTwo.sylvanShooting);
    }


    // Model counts
    if (typeof report?.armyListOne?.modelCount !== "undefined") {
      armies[report.armyOne].modelCount0 = armies[report.armyOne].modelCount0 || [];
      armies[report.armyOne].modelCount1 = armies[report.armyOne].modelCount1 || [];
      armies[report.armyOne].modelCount2 = armies[report.armyOne].modelCount2 || [];
      armies[report.armyOne].modelCount3 = armies[report.armyOne].modelCount3 || [];
      armies[report.armyOne].modelCount4 = armies[report.armyOne].modelCount4 || [];
      armies[report.armyOne].modelCount5 = armies[report.armyOne].modelCount5 || [];
      armies[report.armyOne].modelCountTotal = armies[report.armyOne].modelCountTotal || [];
      armies[report.armyOne].modelCount0.push(report.armyListOne.modelCount.height0);
      armies[report.armyOne].modelCount1.push(report.armyListOne.modelCount.height1);
      armies[report.armyOne].modelCount2.push(report.armyListOne.modelCount.height2);
      armies[report.armyOne].modelCount3.push(report.armyListOne.modelCount.height3);
      armies[report.armyOne].modelCount4.push(report.armyListOne.modelCount.height4);
      armies[report.armyOne].modelCount5.push(report.armyListOne.modelCount.height5);
      armies[report.armyOne].modelCountTotal.push(report.armyListOne.modelCount.total);
    }

    if (typeof report?.armyListTwo?.modelCount !== "undefined") {
      armies[report.armyTwo].modelCount0 = armies[report.armyTwo].modelCount0 || [];
      armies[report.armyTwo].modelCount1 = armies[report.armyTwo].modelCount1 || [];
      armies[report.armyTwo].modelCount2 = armies[report.armyTwo].modelCount2 || [];
      armies[report.armyTwo].modelCount3 = armies[report.armyTwo].modelCount3 || [];
      armies[report.armyTwo].modelCount4 = armies[report.armyTwo].modelCount4 || [];
      armies[report.armyTwo].modelCount5 = armies[report.armyTwo].modelCount5 || [];
      armies[report.armyTwo].modelCountTotal = armies[report.armyTwo].modelCountTotal || [];
      armies[report.armyTwo].modelCount0.push(report.armyListTwo.modelCount.height0);
      armies[report.armyTwo].modelCount1.push(report.armyListTwo.modelCount.height1);
      armies[report.armyTwo].modelCount2.push(report.armyListTwo.modelCount.height2);
      armies[report.armyTwo].modelCount3.push(report.armyListTwo.modelCount.height3);
      armies[report.armyTwo].modelCount4.push(report.armyListTwo.modelCount.height4);
      armies[report.armyTwo].modelCount5.push(report.armyListTwo.modelCount.height5);
      armies[report.armyTwo].modelCountTotal.push(report.armyListTwo.modelCount.total);
    }

    // Unit Counts
    if (typeof report?.armyListOne?.unitCount !== "undefined") {
      armies[report.armyOne].unitCountChars = armies[report.armyOne].unitCountChars || [];
      armies[report.armyOne].unitCountSingle = armies[report.armyOne].unitCountSingle || [];
      armies[report.armyOne].unitCountRnf = armies[report.armyOne].unitCountRnf || [];
      armies[report.armyOne].unitCountTotal = armies[report.armyOne].unitCountTotal || [];
      armies[report.armyOne].unitCountChars.push(report.armyListOne.unitCount.characters);
      armies[report.armyOne].unitCountSingle.push(report.armyListOne.unitCount.singleModel);
      armies[report.armyOne].unitCountRnf.push(report.armyListOne.unitCount.rankAndFile);
      armies[report.armyOne].unitCountTotal.push(report.armyListOne.unitCount.total);
    }

    if (typeof report?.armyListTwo?.unitCount !== "undefined") {
      armies[report.armyTwo].unitCountChars = armies[report.armyTwo].unitCountChars || [];
      armies[report.armyTwo].unitCountSingle = armies[report.armyTwo].unitCountSingle || [];
      armies[report.armyTwo].unitCountRnf = armies[report.armyTwo].unitCountRnf || [];
      armies[report.armyTwo].unitCountTotal = armies[report.armyTwo].unitCountTotal || [];
      armies[report.armyTwo].unitCountChars.push(report.armyListTwo.unitCount.characters);
      armies[report.armyTwo].unitCountSingle.push(report.armyListTwo.unitCount.singleModel);
      armies[report.armyTwo].unitCountRnf.push(report.armyListTwo.unitCount.rankAndFile);
      armies[report.armyTwo].unitCountTotal.push(report.armyListTwo.unitCount.total);
    }


    // Global:
    globalStats.tournamentsWithReports.push(folder);
    globalStats.games++;
    // if (report.turns && report.turns > 0 && report.turns < 7) {
    //   globalStats.turns.push(report.turns);
    // }
    if (report.firstTurn !== -1) {
      globalStats.pointsFirstTurn.push(report.firstTurn === 0 ? report.scoreOne : report.scoreTwo);
      globalStats.pointsSecondTurn.push(report.firstTurn === 0 ? report.scoreTwo : report.scoreOne);
    }
    // else {
    //   console.log(`Not posting this game to first/second turn counts`);
    // }

    // Core per Army
    if (report?.armyListOne?.pointsPerCategory) {
      armies[report.armyOne].pointsPerCategory = armies[report.armyOne].pointsPerCategory || { "Characters": [], "Core": [], };
      armies[report.armyOne].pointsPerCategory.Characters.push(report.armyListOne.pointsPerCategory.Characters);
      armies[report.armyOne].pointsPerCategory.Core.push(report.armyListOne.pointsPerCategory.Core);
    }

    if (report?.armyListTwo?.pointsPerCategory) {
      armies[report.armyTwo].pointsPerCategory = armies[report.armyTwo].pointsPerCategory || { "Characters": [], "Core": [], };
      armies[report.armyTwo].pointsPerCategory.Characters.push(report.armyListTwo.pointsPerCategory.Characters);
      armies[report.armyTwo].pointsPerCategory.Core.push(report.armyListTwo.pointsPerCategory.Core);
    }

    // Count Options
    countOptionsForList(report?.armyListOne?.units, report.armyOne);
    countOptionsForList(report?.armyListTwo?.units, report.armyTwo);
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
  armies[army].avgWithoutMirror = (armies[army].pointsWithoutMirror.reduce((a, b) => a + b, 0) / armies[army].pointsWithoutMirror.length).toFixed(1).padStart(4, " ");
  armies[army].first = (armies[army].pointsFirst.reduce((a, b) => a + b, 0) / firstCount).toFixed(1).padStart(4, " ");
  armies[army].second = (armies[army].pointsSecond.reduce((a, b) => a + b, 0) / secondCount).toFixed(1).padStart(4, " ");
  armies[army].games = `${totalCount}`.padStart(4, " ");

  let sum = armies[army].points.reduce((a, b) => a + b, 0);
  let mean = sum / totalCount;
  let sqerrs = armies[army].points.map(function (n) { return (n - mean) * (n - mean); });
  let std = Math.sqrt(sqerrs.reduce((a, b) => a + b, 0) / totalCount);
  let interval = 1.959964 * std / Math.sqrt(totalCount);
  armies[army].interval = interval;
  armies[army].intervalLower = mean - interval;
  armies[army].intervalUpper = mean + interval;

  for (let opponent in armies[army].vs) {
    // console.log(`${army} - ${opponent} - ${JSON.stringify(armies[army].vs)}`);
    armies[army].vs[opponent].games = `${armies[army].vs[opponent].results.length}`.padStart(4, " ");
    armies[army].vs[opponent].avg = (armies[army].vs[opponent].results.reduce((a, b) => a + b, 0) / armies[army].vs[opponent].games).toFixed(1).padStart(4, " ");
  }

  // Calculate rank
  const allAverages = [
    parseFloat(armies.BH.avg), parseFloat(armies.DE.avg), parseFloat(armies.DH.avg), parseFloat(armies.DL.avg),
    parseFloat(armies.EoS.avg), parseFloat(armies.HE.avg), parseFloat(armies.ID.avg), parseFloat(armies.KoE.avg),
    parseFloat(armies.OK.avg), parseFloat(armies.OnG.avg), parseFloat(armies.SA.avg), parseFloat(armies.SE.avg),
    parseFloat(armies.UD.avg), parseFloat(armies.VC.avg), parseFloat(armies.VS.avg), parseFloat(armies.WDG.avg),
  ];
  for (let armyString in armies) {
    armies[armyString].rank = (allAverages.filter(x => x > parseFloat(armies[armyString].avg)).length + 1).toString().padStart(2, " ");
  }

  // Calculate amount of core
  // console.log(JSON.stringify(armies[army].pointsPerCategory, null, 4));
  armies[army].core = {
    "error": armies[army].pointsPerCategory.Core.filter(c => c < 950).length,
    "minimal": armies[army].pointsPerCategory.Core.filter(c => c >= 950 && c < 1050).length,
    "some": armies[army].pointsPerCategory.Core.filter(c => c >= 1050 && c < 1150).length,
    "more": armies[army].pointsPerCategory.Core.filter(c => c >= 1150).length
  };
  // Convert into percentages
  let total = armies[army].core.minimal + armies[army].core.some + armies[army].core.more;
  armies[army].core.minimalPercent = (armies[army].core.minimal / total * 100).toFixed(0).padStart(3, " ") + " %";
  armies[army].core.somePercent = (armies[army].core.some / total * 100).toFixed(0).padStart(3, " ") + " %";
  armies[army].core.morePercent = (armies[army].core.more / total * 100).toFixed(0).padStart(3, " ") + " %";
  // console.log(JSON.stringify(armies[army].core, null, 4));

  // Calculate amount of characters
  // console.log(JSON.stringify(armies[army].pointsPerCategory, null, 4));
  armies[army].chars = {
    "ten": armies[army].pointsPerCategory.Characters.filter(c => c < 400).length,
    "twenty": armies[army].pointsPerCategory.Characters.filter(c => c >= 400 && c < 800).length,
    "thirty": armies[army].pointsPerCategory.Characters.filter(c => c >= 800 && c < 1200).length,
    "fourty": armies[army].pointsPerCategory.Characters.filter(c => c >= 1200).length
  };

  // Convert into percentages
  let totalChar = armies[army].chars.ten + armies[army].chars.twenty + armies[army].chars.thirty + armies[army].chars.fourty;
  armies[army].chars.tenPercent = (armies[army].chars.ten / totalChar * 100).toFixed(0).padStart(3, " ") + " %";
  armies[army].chars.twentyPercent = (armies[army].chars.twenty / totalChar * 100).toFixed(0).padStart(3, " ") + " %";
  armies[army].chars.thirtyPercent = (armies[army].chars.thirty / totalChar * 100).toFixed(0).padStart(3, " ") + " %";
  armies[army].chars.fourtyPercent = (armies[army].chars.fourty / totalChar * 100).toFixed(0).padStart(3, " ") + " %";
  // console.log(JSON.stringify(armies[army].chars, null, 4));

  // Calculate model counts
  let count = armies[army].modelCountTotal.length;
  armies[army].modelCountTotal = (armies[army].modelCountTotal.reduce((a, b) => a + b, 0) / count).toFixed(0).padStart(4, " ");
  armies[army].modelCount0 = (armies[army].modelCount0.reduce((a, b) => a + b, 0) / count).toFixed(1).padStart(3, " ");
  armies[army].modelCount1 = (armies[army].modelCount1.reduce((a, b) => a + b, 0) / count).toFixed(0).padStart(3, " ");
  armies[army].modelCount2 = (armies[army].modelCount2.reduce((a, b) => a + b, 0) / count).toFixed(0).padStart(3, " ");
  armies[army].modelCount3 = (armies[army].modelCount3.reduce((a, b) => a + b, 0) / count).toFixed(0).padStart(3, " ");
  armies[army].modelCount4 = (armies[army].modelCount4.reduce((a, b) => a + b, 0) / count).toFixed(1).padStart(3, " ");
  armies[army].modelCount5 = (armies[army].modelCount5.reduce((a, b) => a + b, 0) / count).toFixed(1).padStart(3, " ");

    // Calculate unit counts
  let unitCountLists = armies[army].unitCountTotal.length;
  armies[army].unitCountTotal = (armies[army].unitCountTotal.reduce((a, b) => a + b, 0) / unitCountLists).toFixed(1).padStart(4, " ");
  armies[army].unitCountChars = (armies[army].unitCountChars.reduce((a, b) => a + b, 0) / unitCountLists).toFixed(1).padStart(3, " ");
  armies[army].unitCountRnf = (armies[army].unitCountRnf.reduce((a, b) => a + b, 0) / unitCountLists).toFixed(1).padStart(3, " ");
  armies[army].unitCountSingle = (armies[army].unitCountSingle.reduce((a, b) => a + b, 0) / unitCountLists).toFixed(1).padStart(3, " ");
}

// #################################################################################################################
//      Store as data JSON
// #################################################################################################################
storeJsonData();

// #################################################################################################################
//      Display
// #################################################################################################################

// Display meta data
displayMetaData();

// Display global stats
displayGlobalStats();

// Display objectives
displayObjectives();

// Display army stats
displayArmyStats();

// Display external balance
displayExternalBalance();

// Display core percentages
displayCoreShares();

// Display character percentages
displayCharacterShares();

// Display magicalness
displayMagicalness();

// Display model counts
displayModelCounts();

// Display global special item pick rates
displayGlobalItems();

// Display unit pick rates
displayUnitPickRates();

// Display army pick rates for special items
displayArmySpecialItems();

// Display unit options
displayUnitOptions();

// Display army specific categories
displayArmySpecialCategories();


// #################################################################################################################
//      Helper Functions
// #################################################################################################################

function countOptionsForList(list, army) {
  if (undefined === list) {
    return;
  }

  armies[army].listCount = armies[army].listCount || 0;
  armies[army].listCount++;

  let unitsInList = {};

  for (let unitInList of list) {
    // console.log(`Entry: ${JSON.stringify(u, null, 4)}`);
    unitsInList[unitInList.name] = unitsInList[unitInList.name] || 0;
    unitsInList[unitInList.name] = unitsInList[unitInList.name] + 1;
    let armyUnitEntry = armies[army].units.find(u => u.name === unitInList.name);

    // Count models
    if (unitInList.models) {
      armyUnitEntry.models = armyUnitEntry.models || [];
      armyUnitEntry.models.push(unitInList.models);
    }

    // Count points
    if (unitInList.cost) {
      armyUnitEntry.cost = armyUnitEntry.cost || [];
      armyUnitEntry.cost.push(unitInList.cost);
    }

    for (let o of unitInList.options) {
      // console.log(`Entry: ${JSON.stringify(o, null, 4)}`);
      armyUnitEntry.options = armyUnitEntry.options || {};
      armyUnitEntry.options[o.type] = armyUnitEntry.options[o.type] || {};
      armyUnitEntry.options[o.type][o.name] = (armyUnitEntry.options[o.type][o.name] || 0) + 1;
      // console.log(JSON.stringify(armyUnitEntry));

      // Count Special Items towards global counters
      if (allItems.includes(o.name)) {
        if (arcCompAll.includes(o.name)) {
          globalStats.specialItems[o.name] = globalStats.specialItems[o.name] || 0;
          globalStats.specialItems[o.name] = globalStats.specialItems[o.name] + 1;
        }

        armies[army].specialItems[o.name] = armies[army].specialItems[o.name] || 0;
        armies[army].specialItems[o.name] = armies[army].specialItems[o.name] + 1;
      }
    }
  }

  // console.log(`Counts for units in list: ${JSON.stringify(unitsInList, null, 4)}`);
  for (let unitName in unitsInList) {
    let unitEntry = armies[army].units.find(u => u.name === unitName);
    unitEntry.count = unitEntry.count || [];
    unitEntry.count.push(unitsInList[unitName]);
  }
  // console.log(`BH counts: ${JSON.stringify(armies[army].units, null, 4)}`);

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
  console.log(`┃ Decisive Games (18-20): ${decisive} / ${(decisive * 100 / globalWithTurnKnown).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┃ 'Normal' Games (14-17): ${normal} / ${(normal * 100 / globalWithTurnKnown).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┃ Close    Games (10-13): ${close} / ${(close * 100 / globalWithTurnKnown).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
}

function displayArmyStats() {

  const emptyLine = `┃\x1b[0m      ┃       │      ┃      │      │      │      │      │      │      │      │      │      │      │      │      │      │      │      ┃      │      ┃      │      \x1b[0m┃`;

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1m Army Results – Average Points per Match\x1b[0m                                                                                                          ┃  95% conf   ┃`);
  console.log(`┣━━━━━━┳━━━━━━━┯━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┳━━━━━━┯━━━━━━╋━━━━━━┯━━━━━━┫`);
  console.log(`┃ ARMY ┃\x1b[1;106m TOTAL \x1b[0m│ RANK ┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃ 1st  │ 2nd  ┃ Low  │ High ┃`);
  console.log(`┣━━━━━━╋━━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━┫`);

  for (let a in armies) {
    let lower = (armies[a].intervalLower).toFixed(1).padStart(4, " ");
    let upper = (armies[a].intervalUpper).toFixed(1).padStart(4, " ");
    console.log(`┃ ${a.padEnd(3, " ")}  ┃\x1b[1;106m  ${armies[a].avg} \x1b[0m│  ${armies[a].rank}  ┃ ${armies[a].vs.BH.avg} │ ${armies[a].vs.DE.avg} │ ${armies[a].vs.DH.avg} │ ${armies[a].vs.DL.avg} │ ${armies[a].vs.EoS.avg} │ ${armies[a].vs.HE.avg} │ ${armies[a].vs.ID.avg} │ ${armies[a].vs.KoE.avg} │ ${armies[a].vs.OK.avg} │ ${armies[a].vs.OnG.avg} │ ${armies[a].vs.SA.avg} │ ${armies[a].vs.SE.avg} │ ${armies[a].vs.UD.avg} │ ${armies[a].vs.VC.avg} │ ${armies[a].vs.VS.avg} │ ${armies[a].vs.WDG.avg} ┃ ${armies[a].first} │ ${armies[a].second} ┃ ${lower} │ ${upper} ┃`);

    if (a === "WDG") {
      console.log(`┗━━━━━━┻━━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┛`);
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
  for (let a in armies) {
    console.log(`┃  ${a.padEnd(3, " ")}  ┃  ${armies[a].games}  ┃ ${armies[a].vs.BH.games} │ ${armies[a].vs.DE.games} │ ${armies[a].vs.DH.games} │ ${armies[a].vs.DL.games} │ ${armies[a].vs.EoS.games} │ ${armies[a].vs.HE.games} │ ${armies[a].vs.ID.games} │ ${armies[a].vs.KoE.games} │ ${armies[a].vs.OK.games} │ ${armies[a].vs.OnG.games} │ ${armies[a].vs.SA.games} │ ${armies[a].vs.SE.games} │ ${armies[a].vs.UD.games} │ ${armies[a].vs.VC.games} │ ${armies[a].vs.VS.games} │ ${armies[a].vs.WDG.games} ┃`);
    if (a !== "WDG") {
      console.log(emptyLineGames);
    }
  }
  console.log(`┗━━━━━━━┻━━━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┛`);
}

function displayExternalBalance() {

  const emptyLine = `┃\x1b[0m      ┃         │      ┃      │      ┃      │      \x1b[0m┃`;

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mExternal Balance (without Mirrors)\x1b[0m  ┃  95% conf   ┃`);
  console.log(`┣━━━━━━┳━━━━━━━━━┯━━━━━━┳━━━━━━┯━━━━━━╋━━━━━━┯━━━━━━┫`);
  console.log(`┃ ARMY ┃\x1b[1;106m  TOTAL  \x1b[0m│ RANK ┃ 1st  │ 2nd  ┃ Low  │ High ┃`);
  console.log(`┣━━━━━━╋━━━━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━┫`);

  for (let a in armies) {
    let lower = (armies[a].intervalLower).toFixed(1).padStart(4, " ");
    let upper = (armies[a].intervalUpper).toFixed(1).padStart(4, " ");
    console.log(`┃ ${a.padEnd(3, " ")}  ┃\x1b[1;106m   ${armies[a].avgWithoutMirror}  \x1b[0m│  ${armies[a].rank}  ┃ ${armies[a].first} │ ${armies[a].second} ┃ ${lower} │ ${upper} ┃`);

    if (a === "WDG") {
      console.log(`┗━━━━━━┻━━━━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┛`);
    }
    else {
      console.log(emptyLine);
    }
  }
}


function displayCoreShares() {

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Amount of Core by Army                       ┃`);
  console.log(`┣━━━━━━━━━━━━━━┯━━━━━━━┯━━━━━━━┯━━━━━━━┯━━━━━━━┫`);
  console.log(`┃ Army         │ Error │  Min  │ 5-15% │  >15% ┃`);
  console.log(`┣━━━━━━━━━━━━━━┿━━━━━━━┿━━━━━━━┿━━━━━━━┿━━━━━━━┫`);

  for (let army in armies) {
    console.log(`┃ ${army.padEnd(3, " ")}          │ ${("" + armies[army].core.error).padStart(5, " ")} │ ${armies[army].core.minimalPercent} │ ${armies[army].core.somePercent} │ ${armies[army].core.morePercent} ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━┷━━━━━━━┷━━━━━━━┷━━━━━━━┷━━━━━━━┛`);
}

function displayCharacterShares() {

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Amount of Characters by Army                     ┃`);
  console.log(`┣━━━━━━━━━━━━━━┯━━━━━━━━┯━━━━━━━━┯━━━━━━━━┯━━━━━━━━┫`);
  console.log(`┃ Army         │  0-10% │ 10-20% │ 20-30% │  30%+  ┃`);
  console.log(`┣━━━━━━━━━━━━━━┿━━━━━━━━┿━━━━━━━━┿━━━━━━━━┿━━━━━━━━┫`);

  for (let army in armies) {
    console.log(`┃ ${army.padEnd(3, " ")}          │  ${("" + armies[army].chars.tenPercent).padStart(5, " ")} │  ${armies[army].chars.twentyPercent} │  ${armies[army].chars.thirtyPercent} │  ${armies[army].chars.fourtyPercent} ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━┷━━━━━━━━┷━━━━━━━━┷━━━━━━━━┷━━━━━━━━┛`);
}

function displayMagicalness() {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Amount of Magic by Army                    ┃`);
  console.log(`┣━━━━━━━━━━━━━━┯━━━━━┯━━━━━┯━━━━━┯━━━━━┯━━━━━┫`);
  console.log(`┃ Army         │  0  │ 1-4 │ 5-9 │10-12│ 13+ ┃`);
  console.log(`┣━━━━━━━━━━━━━━┿━━━━━┿━━━━━┿━━━━━┿━━━━━┿━━━━━┫`);

  for (let army in armies) {

    armies[army].magicalness.filter(m => m === 1).length;
    console.log(`┃ ${army.padEnd(3, " ")}          │ ${armies[army].magicalness.filter(m => m === 0).length.toString().padStart(3, " ")} │ ${armies[army].magicalness.filter(m => m >= 1 && m < 5).length.toString().padStart(3, " ")} │ ${armies[army].magicalness.filter(m => m >= 5 && m < 10).length.toString().padStart(3, " ")} │ ${armies[army].magicalness.filter(m => m >= 10 && m < 13).length.toString().padStart(3, " ")} │ ${armies[army].magicalness.filter(m => m >= 13).length.toString().padStart(3, " ")} ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━┷━━━━━┷━━━━━┷━━━━━┷━━━━━┷━━━━━┛`);
}

function displayModelCounts() {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Models and units by Army                                                                  ┃`);
  console.log(`┣━━━━━━━━━━━━━━┯━━━━━━━━┯━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Army         │ Models │ Units ┃      Models by Height             ┃    Units by Type      ┃`);
  console.log(`┃              │        │       ┃  0  │  1  │  2  │  3  │  4  │  5  ┃ Chars │  RnF  │ Solo  ┃`);
  console.log(`┣━━━━━━━━━━━━━━┿━━━━━━━━┿━━━━━━━╋━━━━━┿━━━━━┿━━━━━┿━━━━━┿━━━━━┿━━━━━╋━━━━━━━┿━━━━━━━┿━━━━━━━┫`);

  for (let army in armies) {
    console.log(`┃ ${army.padEnd(3, " ")}          │  ${armies[army].modelCountTotal}  │  ${armies[army].unitCountTotal} ┃ ${armies[army].modelCount0} │ ${armies[army].modelCount1} │ ${armies[army].modelCount2} │ ${armies[army].modelCount3} │ ${armies[army].modelCount4} │ ${armies[army].modelCount5} ┃  ${armies[army].unitCountChars}  │  ${armies[army].unitCountRnf}  │  ${armies[army].unitCountSingle}  ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━┷━━━━━━━━┷━━━━━━━┻━━━━━┷━━━━━┷━━━━━┷━━━━━┷━━━━━┷━━━━━┻━━━━━━━┷━━━━━━━┷━━━━━━━┛`);
}


function displayGlobalItems() {

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mSpecial Items – Global Pick Counts                                 \x1b[0m  ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━┯━━━━━━━━┫`);
  console.log(`┃ Category            │ Item Name                    │   #    │   %    ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━┿━━━━━━━━┫`);

  for (let item of arcCompCommon.Weapon) {
    console.log(`┃ Common Weapon       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompShared.Weapon) {
    console.log(`┃ Shared Weapon       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompCommon.Armour) {
    console.log(`┃ Common Armour       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompShared.Armour) {
    console.log(`┃ Shared Armour       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompCommon.Shield) {
    console.log(`┃ Common Shield       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompShared.Shield) {
    console.log(`┃ Shared Shield       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompCommon.Artefact) {
    console.log(`┃ Common Artefact     │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompShared.Artefact) {
    console.log(`┃ Shared Artefact     │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompCommon.Potion) {
    console.log(`┃ Common Potion       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompShared.Potion) {
    console.log(`┃ Shared Potion       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompCommon.Banner) {
    console.log(`┃ Common Banner       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for (let item of arcCompShared.Banner) {
    console.log(`┃ Shared Banner       │ ${item.padEnd(28, " ")} │  ${(globalStats.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((globalStats.specialItems[item] || 0) * 50 / globalStats.games).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━┷━━━━━━━━┛`);

  // console.log(JSON.stringify(globalStats.specialItems, null, 4));
}

function displayUnitPickRates() {
  for (let army in armies) {
    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┯━━━━━━━┯━━━━━━━┯━━━━━━━┓`);
    console.log(`┃ \x1b[1mCategory                   │ ${army.padEnd(3, " ")} - Units                           ┃     Ø     ┃   1   │   2   │   3   │   4+  │ ØPts \x1b[0m ┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━┿━━━━━━━┿━━━━━━━┿━━━━━━━┿━━━━━━━┫`);

    let lastCategory = "nothing";
    for (let unitEntry of armies[army].units) {
      // console.log(`Unit ${unitEntry.name}: ${JSON.stringify(unitEntry.cost)}`);
      let pointsPerList = unitEntry.cost ? (unitEntry.cost.reduce((a, b) => a + b, 0) / armies[army].listCount).toFixed(0).padStart(3, " ") : "  0";
      unitEntry.count = unitEntry.count || [];
      let pick1 = (unitEntry.count.filter(u => u === 1).length / armies[army].listCount * 100).toFixed(0).padStart(3, " ") + " %";
      let pick2 = (unitEntry.count.filter(u => u === 2).length / armies[army].listCount * 100).toFixed(0).padStart(3, " ") + " %";
      let pick3 = (unitEntry.count.filter(u => u === 3).length / armies[army].listCount * 100).toFixed(0).padStart(3, " ") + " %";
      let pick4 = (unitEntry.count.filter(u => u >= 4).length / armies[army].listCount * 100).toFixed(0).padStart(3, " ") + " %";
      let pickTotal = (unitEntry.count.reduce((a, b) => a + b, 0) / armies[army].listCount * 100).toFixed(0).padStart(3, " ") + " %";
      if (unitEntry.category !== lastCategory) {
        console.log(`┃                            │                                       ┃           ┃       │       │       │       │       ┃`);
      }
      console.log(`┃ ${unitEntry.category.padEnd(26, " ")} │ ${unitEntry.name.padEnd(37, " ")} ┃   ${pickTotal}   ┃ ${pick1} │ ${pick2} │ ${pick3} │ ${pick4} │  ${pointsPerList}  ┃`);
      lastCategory = unitEntry.category;
    }
    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┷━━━━━━━┷━━━━━━━┷━━━━━━━┛`);
    console.log(`\n`);
  }
}


function displayArmySpecialItems() {

  for (let army in armies) {

    console.log(`┏━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┓`);
    console.log(`┃ \x1b[1mCategory │ ${army.padEnd(3, " ")} - Special Items                ┃   #   │   %\x1b[0m   ┃`);
    console.log(`┣━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┫`);
    console.log(`┃ Common Items                                                  ┃`);
    console.log(`┣━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┫`);

    for (let category in arcCompCommon) {
      for (let item of arcCompCommon[category]) {
        let name = `${item.padEnd(34, " ")}`;
        let cat = `${category.padEnd(8, " ")}`;
        let count = `${armies[army].specialItems?.[item] || 0}`.padStart(3, " ");
        let percent = `${((count / armies[army].listCount * 100).toFixed(0) || "0").padStart(4, " ")}%`;
        console.log(`┃ ${cat} │ ${name} ┃  ${count}  │ ${percent} ┃`);
      }
      console.log(`┃          │                                    ┃       │       ┃`);
    }

    console.log(`┣━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┫`);
    console.log(`┃ Shared Items                                                  ┃`);
    console.log(`┣━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┫`);

    const sharedItems = require("./specialItems.js").sharedItems;
    // console.log(JSON.stringify(sharedItems, null, 4));
    for (let category in sharedItems) {
      for (let item in sharedItems[category]) {
        if (sharedItems[category][item].includes(army.toLowerCase())) {
          let name = `${item.padEnd(34, " ")}`;
          let cat = `${category.padEnd(8, " ")}`;
          let count = `${armies[army].specialItems?.[item] || 0}`.padStart(3, " ");
          let percent = `${((count / armies[army].listCount * 100).toFixed(0) || "0").padStart(4, " ")}%`;
          console.log(`┃ ${cat} │ ${name} ┃  ${count}  │ ${percent} ┃`);
        }
      }
      if (category !== "banner") console.log(`┃          │                                    ┃       │       ┃`);
    }

    console.log(`┣━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┫`);
    console.log(`┃ Army Specific Items                                           ┃`);
    console.log(`┣━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┫`);

    const armyItems = require("./specialItems.js")[army.toLowerCase()];
    for (let category in armyItems) {
      for (let item of armyItems[category]) {
        let name = `${item.padEnd(34, " ")}`;
        let cat = `${category.padEnd(8, " ")}`;
        let count = `${armies[army].specialItems?.[item] || 0}`.padStart(3, " ");
        let percent = `${((count / armies[army].listCount * 100).toFixed(0) || "0").padStart(4, " ")}%`;
        console.log(`┃ ${cat} │ ${name} ┃  ${count}  │ ${percent} ┃`);
      }
      if (category !== "banner") console.log(`┃          │                                    ┃       │       ┃`);
    }
    console.log(`┗━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┛`);
    console.log(`\n`);
  }

}

function displayUnitOptions() {

  for (let army in armies) {
    for (let unit of armies[army].units) {
      console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
      console.log(`┃ \x1b[1mOptions: ${unit.name.padEnd(48, " ")}\x1b[0m ┃`);
      console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);

      if (unit.models) {
        // console.log(JSON.stringify(unit.models));
        let average = (unit.models.reduce((a, b) => a + b, 0) / unit.models.length).toFixed(1).padStart(4, " ");
        let min = units[army].find((e) => e.name === unit.name)?.min;
        let max = units[army].find((e) => e.name === unit.name)?.max;
        // console.log(` ${min}   ${max}`);
        let smallUntil = Math.floor(min + (max - min) / 4);
        let mediumUntil = Math.floor(min + (max - min) * 2 / 3);
        let small = (unit.models.filter(m => m <= smallUntil).length / unit.models.length * 100).toFixed(0).padStart(3, " ");
        let medium = (unit.models.filter(m => m > smallUntil && m <= mediumUntil).length / unit.models.length * 100).toFixed(0).padStart(3, " ");
        let large = (unit.models.filter(m => m > mediumUntil).length / unit.models.length * 100).toFixed(0).padStart(3, " ");
        console.log(`┃\x1b[34m Unit Size                                                 \x1b[0m┃`);
        console.log(`┠───────────────────────────────────────────────────────────┨`);
        console.log(`┃ Ø                                            -  ${average}      ┃`);
        console.log(`┃ Small  (${("" + min).padStart(2, " ")} - ${(smallUntil).toFixed(0).padStart(2, " ")})                             -  ${small} %     ┃`);
        console.log(`┃ Medium (${(smallUntil + 1).toFixed(0).padStart(2, " ")} - ${(mediumUntil).toFixed(0).padStart(2, " ")})                             -  ${medium} %     ┃`);
        console.log(`┃ Large  (${(mediumUntil + 1).toFixed(0).padStart(2, " ")} - ${(+max).toFixed(0).padStart(2, " ")})                             -  ${large} %     ┃`);
        console.log(`┠───────────────────────────────────────────────────────────┨`);

      }

      for (let category in unit?.options) {
        console.log(`┃\x1b[34m ${category.padEnd(49, " ")}         \x1b[0m┃`);
        console.log(`┠───────────────────────────────────────────────────────────┨`);

        for (let option in unit.options[category]) {
          let percentValue = `${(unit.options[category][option] / unit.count.reduce((a, b) => a + b, 0) * 100).toFixed(0).padStart(3, " ")} %`;
          console.log(`┃ ${option.padEnd(44, " ")} - ${percentValue.padEnd(10, " ")} ┃`);
        }
        if (category !== "banner") console.log(`┠───────────────────────────────────────────────────────────┨`);
      }
      console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    }
  }
}

function displayObjectives() {

  // console.log(JSON.stringify(setup, null, 4));
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mMap                              ┃  Games played \x1b[0m ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━┫`);

  let keys = Object.keys(setup.map).sort();
  // console.log(JSON.stringify(keys, null, 4));
  
  for (let map of keys) {
    console.log(`┃ ${map.padEnd(32, " ")} ┃ ${setup.map[map].toFixed(0).padStart(14, " ")} ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━┛`);

  let depKeys = Object.keys(setup.deployment);

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mDeployment                       ┃  Games played  │  1st turn ØPts \x1b[0m┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━┫`);

  for(let dep of depKeys) {
    console.log(`┃ ${dep.padEnd(32, " ")} ┃ ${setup.deployment[dep].length.toFixed(0).padStart(14, " ")} │ ${(setup.deployment[dep].reduce((a, b) => a + b, 0) / setup.deployment[dep].length).toFixed(1).padStart(14, " ")} ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┛`);

  let primaryKeys = Object.keys(setup.primary);

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mPrimary                          ┃  Total   │ Attacker │ Defender │   None   \x1b[0m┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━┿━━━━━━━━━━┿━━━━━━━━━━┿━━━━━━━━━━┫`);

  for(let pri of primaryKeys) {
    console.log(`┃ ${pri.padEnd(32, " ")} ┃ ${setup.primary[pri].count.toFixed(0).padStart(8, " ")} │ ${setup.primary[pri].attacker.toFixed(0).padStart(8, " ")} │ ${setup.primary[pri].defender.toFixed(0).padStart(8, " ")} │ ${setup.primary[pri].none.toFixed(0).padStart(8, " ")} ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┛`);

  let secondaryKeys = Object.keys(setup.secondary);
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mSecondary                        ┃  Total   │ Achieved │ Attacker │ Defender \x1b[0m┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━┿━━━━━━━━━━┿━━━━━━━━━━┿━━━━━━━━━━┫`);

  for(let sec of secondaryKeys) {
    let total = setup.secondary[sec].count;
    let achieved = (setup.secondary[sec].attackerWon + setup.secondary[sec].defenderWon)/setup.secondary[sec].count * 100;
    let atkAchieved = setup.secondary[sec].attackerWon / (setup.secondary[sec].attackerWon + setup.secondary[sec].attackerLost) * 100;
    let defAchieved = setup.secondary[sec].defenderWon / (setup.secondary[sec].defenderWon + setup.secondary[sec].defenderLost) * 100;
    console.log(`┃ ${sec.padEnd(32, " ")} ┃ ${total.toFixed(0).padStart(8, " ")} │ ${achieved.toFixed(0).padStart(7, " ")}% │ ${atkAchieved.toFixed(0).padStart(7, " ")}% │ ${defAchieved.toFixed(0).padStart(7, " ")}% ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┛`);
}

function storeJsonData() {
    fs.writeFileSync(`./output/globalStats.json`, JSON.stringify(globalStats, null, 4));
    fs.writeFileSync(`./output/armies.json`, JSON.stringify(armies, null, 4));
}


function displayArmySpecialCategories() {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Sylvan Shooting                            ┃`);
  console.log(`┣━━━━━━━━━━━━━━┯━━━━━┯━━━━━┯━━━━━┯━━━━━┯━━━━━┫`);
  console.log(`┃              │  0  │ 10+ │ 20+ │ 30+ │ 40+ ┃`);
  console.log(`┣━━━━━━━━━━━━━━┿━━━━━┿━━━━━┿━━━━━┿━━━━━┿━━━━━┫`);

  for (let army in armies) {
    if(armies[army].sylvanShooting) {
      armies[army].sylvanShooting.filter(m => m === 1).length;
      console.log(`┃ ${army.padEnd(3, " ")}          │ ${armies[army].sylvanShooting.filter(m => m < 10).length.toString().padStart(3, " ")} │ ${armies[army].sylvanShooting.filter(m => m >= 10 && m < 20).length.toString().padStart(3, " ")} │ ${armies[army].sylvanShooting.filter(m => m >= 20 && m < 30).length.toString().padStart(3, " ")} │ ${armies[army].sylvanShooting.filter(m => m >= 30 && m < 40).length.toString().padStart(3, " ")} │ ${armies[army].sylvanShooting.filter(m => m >= 40).length.toString().padStart(3, " ")} ┃`);
    }
  }
  console.log(`┗━━━━━━━━━━━━━━┷━━━━━┷━━━━━┷━━━━━┷━━━━━┷━━━━━┛`);
}
