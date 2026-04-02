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
    const armySheet = doc.sheetsByTitle(armyShort);
    await armySheet.loadHeaderRow();
    console.log(armySheet.title);
    console.log(JSON.stringify(armySheet.headerValues));

    const rows = await armySheet.getRows();
    let games = armies[armyShort].listCount;
    // Get base file from GDT
    const armyBaseFile = require(`../GDT/books/${armyShort.toLowerCase}/armyBaseFile.json`);

    for(let row of rows) {
      console.log(row.get("Category") + " / " + row.get("Entry"));

      if(row.get("Category" === "Complete List")) {
        continue;
      }

      // Magic Item row
      if(row.get("Category") === "Magic Items" || row.get("Category") === "Shared Items") {
        console.log(`Values: Count: ${armies[armyShort].specialItems[row.get("Entry")]} / Percent: ${armies[armyShort].specialItems[row.get("Entry")] / games}`);
        // Calculate play rate
        row.set("Ø Pick Rate", (armies[armyShort].specialItems[row.get("Entry")] / games * 100).toFixed(0));        
        // Get price from GDT
        row.set("Points", Object.values(armyBaseFile.magicItems).flat().find(item => item.name === row.get("Entry")).cost);
        // Save row
        await row.save();
      }
    }

  }

  // Beast Herds
  const bh = doc.sheetsByTitle["BH"];
  await bh.loadHeaderRow();
  console.log(JSON.stringify(bh.headerValues));

  const bhRows = await bh.getRows();
  let games = armies.BH.listCount;

  for(let bhRow of bhRows) {
    console.log(bhRow.get("Category"));

    if(bhRow.get("Category" === "Complete List")) {
      continue;
    }

    // Units
    let dataEntry = armies.BH.units.find(a => a.name === bhRow.get("Category"));
    if(undefined === dataEntry) {
      continue;
    }
    console.log(JSON.stringify(dataEntry));
    let count = dataEntry.count.reduce((a, b) => a + b, 0);
    
    // Base Cost
    if(bhRow.get("Entry") === "Base Cost") {
      // bhRow.set("Ø Pick Rate", count / games);
    }
    // All other named options

    
  }

}

// await doc.loadInfo(); // loads document properties and worksheets
// await doc.updateProperties({ title: 'renamed doc' });
