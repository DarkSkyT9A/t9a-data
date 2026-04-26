/* eslint-disable no-console */
"use strict";

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require('google-auth-library');
const { gmail, gPrivateKey } = require("./secrets.json");
const armies = require("./output/armies.json");
const armiesShort = [ "BH", "DE", "DH", "DL", "EoS", "ID", "HE", "KoE", "OK", "OnG", "SA", "SE", "UD", "VC", "VS", "WDG" ];
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
    console.log(JSON.stringify(armySheet.headerValues));

    const rows = await armySheet.getRows();
    await armySheet.loadCells();
    let games = armies[armyShort].listCount;
    // Get base file from GDT

    const armyBaseFile = require(`../GDT/books/armies/${armyShort.toLowerCase()}/armyBaseFile.json`);

    for(let row of rows) {
      let category = row.get("Category");
      let entry = row.get("Entry");
      let rowNumber = row.rowNumber - 1;

      console.log(`${category} - ${entry}`);

      if(category === "Complete List") {
        continue;
      }
      // Other generic army wide stuff
      else if(category === "Hereditary Spell" || category === "Totems") {
        console.log(`Spells and stuff, do nothing for ${category} for now`);
      } 
      // Magic Item row
      else if(category === "Magic Items") {
        // console.log(JSON.stringify(armies[armyShort].specialItems, null, 4));
        if(undefined === armies[armyShort].specialItems[entry]) {
          console.log(`Magic Items: Could not find ${entry}`);
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
        // console.log(JSON.stringify(Object.values(armyBaseFile.magicItems).flat().find(item => item.id === id), null, 4));
        let points = Object.values(armyBaseFile.magicItems).flat().find(item => item.id === id).cost;
        console.log(`Points from GDT file: ${points}`);
        // row.set("Points", points);
        armySheet.getCell(rowNumber, 2).numberValue = points;
        // Save row
        // await row.save();
        // await armySheet.saveUpdatedCells();

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
        console.log(`Points from GDT file: ${points}`);
        // row.set("Points", points);
        armySheet.getCell(rowNumber, 2).numberValue = points;
        // Save row
        // await row.save();
        // await armySheet.saveUpdatedCells();

      } 
      else if(category) {
        console.log(`Dealing with unit entry ${category}`);
        let unitId = toCamelCase(category);
        const unitFile = require(`../GDT/books/armies/${armyShort.toLowerCase()}/units/${unitId}.json`);
        // console.log(JSON.stringify(unitFile, null, 4));
        let unitEntry = armies[armyShort].units.find(u => u.name == category);

        if(entry === "Base Cost") {
          armySheet.getCell(rowNumber, 2).numberValue = unitFile.costBase;
          armySheet.getCell(rowNumber, 3).numberValue = unitFile.size.min;
          let avgModels = unitEntry.models ? Math.round(unitEntry.models.reduce((a, b) => a + b, 0) / unitEntry.models.length * 10) / 10 : 1;
          armySheet.getCell(rowNumber, 4).numberValue = avgModels;
          let count = unitEntry.cost.length;
          armySheet.getCell(rowNumber, 5).numberValue = Math.round(count / games * 100);
          console.log(`Entering: ${category}: ${unitFile.costBase}, ${unitFile.size.min}, ${unitFile.size.max}, ${Math.round(count/games*100)}`);
        } else if(entry === "Extra Models") {
          armySheet.getCell(rowNumber, 2).numberValue = unitFile.costExtraModels;
          
        }

      }
    }
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
    .split(/[\s-_]+|(?=[A-Z])|[^A-Za-z0-9]+/) // split on spaces, dashes, underscores, non-alnum, or between camel parts
    .filter(Boolean)
    .map((word, i) => {
      const lower = word.toLowerCase();
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}
