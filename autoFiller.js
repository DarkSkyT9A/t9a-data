/* eslint-disable no-console */
"use strict";

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require('google-auth-library');
const { gmail, gPrivateKey } = require("./secrets.json");
const armies = require("./output/armies.json");

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
  const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  console.log(sheet.title);
  console.log(sheet.rowCount);

  // Beast Herds
  const bh = doc.sheetsByTitle["BH"];
  const bhRows = await bh.getRows();
  let games = armies.BH.listCount;

  for(let bhRow of bhRows) {
    // Magic Item row
    if(bhRow.get("Category") === "Magic Items" || bhRow.get("Category") === "Shared Items") {
      console.log(`Entry: ${bhRow.get("Entry")}`);
      console.log(`Values: Count: ${armies.BH.specialItems[bhRow.get("Entry")]} / Percent: ${armies.BH.specialItems[bhRow.get("Entry")] / games}`);
      bhRow.set("Ø Pick Rate", (armies.BH.specialItems[bhRow.get("Entry")] / games));
    }

    // Units
    let dataEntry = armies.BH.units.find(a => a.name === bhRow.get("Category"));
    console.log(JSON.stringify(dataEntry));
    let count = dataEntry.count.reduce((a, b) => a + b, 0);
    
    // Base Cost
    if(bhRow.get("Entry") === "Base Cost") {
      bhRow.set("Ø Pick Rate", count / games);
    }
    // All other named options

    
  }

}



//   

// });

  // await doc.loadInfo(); // loads document properties and worksheets
  
  // await doc.updateProperties({ title: 'renamed doc' });

