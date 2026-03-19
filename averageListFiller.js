"use strict";

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require('google-auth-library');
const { gmail, gPrivateKey } = require("./secrets.json");

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
  email: gmail,
  key: gPrivateKey,
  scopes: SCOPES,
});

const templateMasterId = "19GkSvYqyZqyCDMvq0bcc9H0Gaj5m-rh63A7i3rm1Jq4";
const doc = new GoogleSpreadsheet(templateMasterId, jwt);

doAsyncStuff();


async function doAsyncStuff() {
  await doc.loadInfo();
  console.log(doc.title);
  const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  console.log(sheet.title);
  console.log(sheet.rowCount);

}



//   

// });

  // await doc.loadInfo(); // loads document properties and worksheets
  
  // await doc.updateProperties({ title: 'renamed doc' });

