/* eslint-disable no-console */
"use strict";

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require('google-auth-library');
const { gmail, gPrivateKey } = require("./secrets.json");
const armies = require("./output/armies.json");
const armiesShort = [ "BH", "DE", "DH", "DL", "EoS", "ID", "HE", "KoE", "OK", "OnG", "SA", "SE", "UD", "VC", "VS", "WDG" ];
// const armiesShort = [ 
//   // "BH", 
//   // "DE", 
//   // "DH", 
//   // "DL", 
//   // "EoS", 
//   // "ID", 
//   // "HE", 
//   // "KoE", 
//   // "OK", 
//   // "OnG", 
//   // "SA", 
//   // "SE", 
//   // "UD", 
//   // "VC", 
//   // "VS", 
//   // "WDG" 
// ];
const castValueCategory = [ "Hereditary", "Hereditary Spell", "Totems", "Battle Runes", "Blessings"];
const prestigeClasses = [ "Honours", "Big Names", "Kindreds", "Aspects of Nature", "Ancestral Blood Powers", "Blood Powers", "Howdah Devices"];
const runicItemsCategory = [ "Runic Weapon Enchantments", "Runic Armour Enchantments", "Runic Banner Enchantments", "Runic Artefacts"];
const manifestationsCategory = [ "Manifestations of Father Chaos", "Manifestations of Envy", "Manifestations of Gluttony", "Manifestations of Greed", "Manifestations of Lust", "Manifestations of Pride", "Manifestations of Sloth", "Manifestations of Wrath"];

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
  email: gmail,
  key: gPrivateKey,
  scopes: SCOPES,
});

// type EntryRow = {
//   Category: string;
//   Entry: string;
//   Points: number;
//   'Min Size': number;
//   'Avg Models': number;
//   pickRate: number;
//   adjRate: number;
//   minSafe: number;
//   listPoints: number;
//   proposal: number;
//   sum: number;
// };

const templateMasterId = "19GkSvYqyZqyCDMvq0bcc9H0Gaj5m-rh63A7i3rm1Jq4";
const doc = new GoogleSpreadsheet(templateMasterId, jwt);

doAsyncStuff();


async function doAsyncStuff() {
  await doc.loadInfo();
  console.log(doc.title);
  // const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  // console.log(sheet.title);
  // console.log(sheet.rowCount);

  // Iterate over Army Sheets
  for(let armyShort of armiesShort) {

    const armySheet = doc.sheetsByTitle[armyShort];
    await armySheet.loadHeaderRow();
    console.log(armySheet.title);
    // console.log(JSON.stringify(armySheet.headerValues));

    const rows = await armySheet.getRows();
    await armySheet.loadCells();
    let games = armies[armyShort].listCount;
    // Get base file from GDT

    const armyBaseFile = require(`../GDT/books/armies/${armyShort.toLowerCase()}/armyBaseFile.json`);

    let previousCategory = null;
    let unitFile;
    let options;

    for(let row of rows) {
      // console.log(`New loop iteration for row: ${previousCategory}`);
      let category = row.get("Category");
      let entry = row.get("Entry");
      let rowNumber = row.rowNumber - 1;

      // Neue Einheit nur einlesen, wenn sie wirklich neu ist
      let newEntry = category == previousCategory ? false : true;
      previousCategory = category;

      // Skip empty lines
      if(!category) {
        continue;
      }

      // console.log(`${category} - ${entry}`);

      if(category === "Complete List") {
        continue;
      }
      // Other generic army wide stuff
      else if(castValueCategory.includes(category)) {
        console.log(`Spells and stuff, do nothing for ${category} for now`);
      }
      // Prestige Classes
      else if(prestigeClasses.includes(category)) {
        // console.log(`Prestige class ${category}`);
        let categoryId = toCamelCase(category);
        if(undefined === armyBaseFile.special[categoryId]) {
          // console.log(`Prestige Class: Could not find ${categoryId}`);
        }
        // console.log(`Find out what's wrong with ${categoryId} and ${entry}`);
        let points = Object.values(armyBaseFile.special[categoryId].elements).flat().find(item => item.name === entry).cost;
        // console.log(`Points from GDT file: ${points}`);
        armySheet.getCell(rowNumber, 2).numberValue = points;
      }
      // Magic Item row
      else if(category === "Magic Items") {
        // console.log(JSON.stringify(armies[armyShort].specialItems, null, 4));

        // Play Rates
        if(undefined === armies[armyShort].specialItems[entry]) {
          console.log(`Magic Items: Could not find ${entry}`);
        }
        let count = armies[armyShort].specialItems[entry] || 0;
        // console.log(`Values: Count: ${count} / Percent: ${count / games}`);
        // Calculate play rate
        // console.log(`Pick Rate for ${category}/${entry}: ${(count / games * 100).toFixed(0)}`);
        // row.set("Ø Pick Rate", (count / games * 100).toFixed(0));
        armySheet.getCell(rowNumber, 5).numberValue = Math.round(count / games * 100);
        
        // Get price from GDT
        let id = toCamelCase(entry);
        // console.log(id);
        if(id === "blackSteel") {
          id = "blacksteel";
        }
        // console.log(JSON.stringify(Object.values(armyBaseFile.magicItems).flat().find(item => item.id === id), null, 4));
        let points = Object.values(armyBaseFile.magicItems).flat().find(item => item.id === id).cost;
        // console.log(`Points from GDT file: ${points}`);
        armySheet.getCell(rowNumber, 2).numberValue = points;
      }
      // Dwarven Runic Items
      else if(runicItemsCategory.includes(category)) {
        // Added toLowerCase because of errors in capitalization in source repo
        let points = Object.values(armyBaseFile.special.runicSpecialItems.elements).flat().find(item => item.name.toLowerCase() === entry.toLowerCase()).cost;
        // console.log(`Points for Runic Item ${entry} from GDT file: ${points}`);
        armySheet.getCell(rowNumber, 2).numberValue = points;
      }
      // Daemonic Manifestations
      else if(manifestationsCategory.includes(category)) {
        // TODO Consider switching to ID matching
        // Special case bug handling for Whipcrack Tail
        let points = Object.values(armyBaseFile.special.daemonicManifestations.elements).flat().find(item => item.id === toCamelCase(entry)).cost;
        // End of special bug handling Whipcrack Tail
        // console.log(`Points for Daemonic Manifestation ${entry} from GDT file: ${points}`);
        armySheet.getCell(rowNumber, 2).numberValue = points;
      }
      else if(category === "Shared Items") {
        // console.log(JSON.stringify(armies[armyShort].specialItems, null, 4));
        if(undefined === armies[armyShort].specialItems[entry]) {
          console.log(`Shared Items: Could not find ${entry}`);
        }
        let count = armies[armyShort].specialItems[entry] || 0;
        console.log(`Values: Count: ${count} / Percent: ${count / games}`);
        // Calculate play rate
        console.log(`Pick Rate for ${category}/${entry}: ${(count / games * 100).toFixed(0)}`);
        // row.set("Ø Pick Rate", (count / games * 100).toFixed(0));        
        armySheet.getCell(rowNumber, 5).numberValue = Math.round(count / games * 100);
        // Get price from GDT
        let id = toCamelCase(entry);
        // console.log(id);
        // console.log(JSON.stringify(Object.values(armyBaseFile.sharedMagicItems).flat().find(item => item.id === id), null, 4));
        let points = Object.values(armyBaseFile.sharedMagicItems).flat().find(item => item.id === id).cost;
        // console.log(`Points from GDT file: ${points}`);
        // row.set("Points", points);
        armySheet.getCell(rowNumber, 2).numberValue = points;
      }
      else if(category) {
        // Make sure to not repeatedly read the same entry over and over
        if(newEntry) {
          // console.log(`Reading new unit entry: ${category}`);
          let unitId = toCamelCase(category);
          unitFile = require(`../GDT/books/armies/${armyShort.toLowerCase()}/units/${unitId}.json`);
          options = pluckOptionsRecursive(unitFile.options, null);
          if(unitFile.special) {
            let specialOptions = pluckOptionsRecursive(unitFile.special, null);
            if(specialOptions) {
              // console.log(specialOptions);
              options = { ...options, ...specialOptions };
            }
          }
          // console.log(`options are: ${JSON.stringify(options, null, 4)}`);
        }
        // console.log(JSON.stringify(unitFile, null, 4));
        // Deal with the fucking stupid â from Knights of Rymâ
        let unitEntry = armies[armyShort].units.find(u => u.name.replaceAll("â", "a") == category);
        // TODO There are some options, that only differ in what is at the end inside a parenthesis. Write some new functionality which makes this possible
        let optionId = toCamelCase(entry);
        // console.log(`Option as camel case/ID is: ${optionId}`);

        if(entry === "Base Cost") {
          armySheet.getCell(rowNumber, 2).numberValue = unitFile.costBase;
          armySheet.getCell(rowNumber, 3).numberValue = unitFile.size.min;
          let avgModels = unitEntry.models ? Math.round(unitEntry.models.reduce((a, b) => a + b, 0) / unitEntry.models.length * 10) / 10 : 1;
          armySheet.getCell(rowNumber, 4).numberValue = avgModels;
          let count = unitEntry.cost.length;
          armySheet.getCell(rowNumber, 5).numberValue = Math.round(count / games * 100);
          // console.log(`Entering: ${category}: ${unitFile.costBase}, ${unitFile.size.min}, ${Math.round(count/games*100)}`);
        } else if(entry === "Extra Models") {
          armySheet.getCell(rowNumber, 2).numberValue = unitFile.costExtraModels;
        } else if(options[optionId] !== undefined) {
          // console.log(`Found ${optionId} and setting cost to ${options[optionId]}`);
          armySheet.getCell(rowNumber, 2).numberValue = options[optionId];
        }
        else {
          // console.log(`Did not find ${entry} as ${optionId}`);
          // Try to find an option that fits this one with some extensions
          let alternateOption = fitsAnotherOption(options, optionId, category, entry);
          if(alternateOption) {
            console.log(`Found alternate option ${alternateOption} for ${optionId} and setting cost to ${options[alternateOption]}`);
            armySheet.getCell(rowNumber, 2).numberValue = options[alternateOption];
          }
        }
      }
    }
    /******** Write everything **********/ // Comment out to prevent getting rate limited
    await armySheet.saveUpdatedCells();

  }

  // // Beast Herds
  // const bh = doc.sheetsByTitle["BH"];
  // await bh.loadHeaderRow();
  // console.log(JSON.stringify(bh.headerValues));

  // const bhRows = await bh.getRows();
  // let games = armies.BH.listCount;

  // for(let bhRow of bhRows) {
  //   console.log(bhRow.get("Category"));

  //   if(bhRow.get("Category" === "Complete List")) {
  //     continue;
  //   }

  //   // Units
  //   let dataEntry = armies.BH.units.find(a => a.name === bhRow.get("Category"));
  //   if(undefined === dataEntry) {
  //     continue;
  //   }
  //   console.log(JSON.stringify(dataEntry));
  //   let count = dataEntry.count.reduce((a, b) => a + b, 0);
    
  //   // Base Cost
  //   if(bhRow.get("Entry") === "Base Cost") {
  //     // bhRow.set("Ø Pick Rate", count / games);
  //   }
  //   // All other named options
  // }

}

// await doc.loadInfo(); // loads document properties and worksheets
// await doc.updateProperties({ title: 'renamed doc' });

function toCamelCase(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replaceAll("'", "")
    .replaceAll(/\([A-Za-z0-9\s]+\+?\)/g, "")
    .split(/[\s-_]+|(?=[A-Z])|[^A-Za-z0-9]+/) // split on spaces, dashes, underscores, non-alnum, or between camel parts
    .filter(Boolean)
    .map((word, i) => {
      const lower = word.toLowerCase();
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function pluckOptionsRecursive(input, collect = {}) {
  // console.log(`Trying to extract options from ${JSON.stringify(input)} now.`);
  collect = collect || {};

  if (!input) return collect;

  if (Array.isArray(input)) {
      input.forEach(function (value) {
          pluckOptionsRecursive(value, collect);
      });
  } else if (typeof input === 'object') {
    // Add option with cost if present  
    if(input.id && input.cost != undefined) {
      // console.log(`Adding an entry for ${input.id} and ${input.cost} now`);
      collect[input.id] = input.cost;
    }

    // Continue for everything else
    for (const [_key, value] of Object.entries(input)) {
      pluckOptionsRecursive(value, collect);
    }
  }
  return collect;
};


function fitsAnotherOption(options, optionId, category, entry) {
  // console.log(`Trying to fit ${optionId}`);
  for(let key of Object.keys(options)) {
    // console.log(`Checking ${key} on string ${key.slice(0, optionId.length -1)}`);
    if(key.slice(0, optionId.length) === optionId) {
      console.log(`Found partial match on ${key}`);
      return key;
    }
  }

  // Special case for Great Weapon and Elven Finesse
  if(optionId === "greatWeaponAndElvenFinesse") {
    return "gwAndElvenFinesse";
  }
  console.error(`\x1b[31mDid not find a match for: ${optionId} of ${category}-${entry}\x1b[0m`);
  return null;
}
