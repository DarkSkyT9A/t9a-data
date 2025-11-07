"use strict";

// Imports
const superagent = require('superagent');
const fs = require("node:fs");
const { transformArmyList } = require("./transformer.js");
// Secrets
const { user, password } = require("./secrets.json");


// Constants
const DEFAULT_START_DATE = "2025-03-05";


// Class Variables
const date = new Date();
const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
let skippedGames = 0;

// Part 1: Get all tournaments
(async () => {
  try {
    let tournamentsData = [];
    let tournamentsResponse;
    let i = 1;

    // Loop, as the responses are paginated
    do {
      tournamentsResponse = await superagent
        .post('https://www.newrecruit.eu/api/tournaments')
        .send({
          "start": DEFAULT_START_DATE,
          "end": today,
          "status": 3,
          "id_game_system": 6,
          "page": i
        })
        .set("accept", "json")
        .set("user-agent", "t9a-data/0.0.2")
        .set("NR-User", user)
        .set("NR-Password", password);
      // console.log(JSON.stringify(tournamentsResponse, null, 4));
      tournamentsData.push(...tournamentsResponse.body.tournaments);
      // console.log(tournamentsData.length);
      // console.log(tournamentsData);
      i++;
    }
    while (tournamentsResponse.body.tournaments.length > 0);

    // eslint-disable-next-line no-console
    console.log(`Collecting data from ${tournamentsData.length} tournaments`);

    for (let tournament of tournamentsData) {
      // console.log(`Handling tournament ${JSON.stringify(tournament)}`);
      // Strip away time from the start and end times
      tournament.start = tournament.start.split("T")[0];
      tournament.end = tournament.end.split("T")[0];
      // console.log(`After clearing up start/end: ${JSON.stringify(tournament, null, 4)}`);

      /** #### Tournament Details/Metadata #### */
      // Get details to calculate type (team, single) and amount of players
      const tournamentDetailsResponse = await superagent
        .post('https://www.newrecruit.eu/api/tournament')
        .send({
          "id": tournament._id
        })
        .set("accept", "json")
        .set("user-agent", "t9a-data/0.0.2")
        .set("NR-User", user)
        .set("NR-Password", password);
      // console.log(JSON.stringify(tournamentDetailsResponse, null, 4));
      let tournamentDetails = tournamentDetailsResponse.body;
      // console.log(`Tournament details for ${tournament.name}:\n${JSON.stringify(tournamentDetails, null, 4)}`);

      // Type and size
      tournament.type = tournamentDetails.type;
      tournament.size = tournamentDetails.teams.map(t => t.players).flat().length;
      // console.log(`Calculated size ${tournament.size} for tournament ${tournament._id}`);

      // Write folder
      if (!fs.existsSync(`./data/${tournament._id}`)) {
        // console.log(`Try to create folder ${tournament._id}`);
        fs.mkdirSync(`./data/${tournament._id}`, { "recursive": true });
        // console.log(`... created`);
      }

      // Write to disc
      if (!fs.existsSync(`./data/${tournament._id}/metaData.json`)) {
        fs.writeFileSync(`./data/${tournament._id}/metaData.json`, JSON.stringify(tournament, null, 4));
      }

      /** #### Matches/Results #### */
      // Get details to calculate type (team, single) and amount of players
      const reportsResponse = await superagent
        .post('https://www.newrecruit.eu/api/reports')
        .send({
          "id_tournament": tournament._id
        })
        .set("accept", "json")
        .set("user-agent", "t9a-data/0.0.2")
        .set("NR-User", user)
        .set("NR-Password", password);
      // console.log(JSON.stringify(reportsResponse, null, 4));
      let reports = reportsResponse.body;
      // console.log(`# of Tournament reports for ${tournament.name} (${tournament._id}): ${reports.length}`);
      for(let report of reports) {
        // console.log(report.id_match);
        // console.log(JSON.stringify(report, [ "first_turn", "type", "score", "setup", "scoring"], 4));
        // Write to disc
        if (!fs.existsSync(`./data/${tournament._id}/report_${report.id_match}.json`)) {
          report = transformReport(report, tournament._id);
          if(report) {
            fs.writeFileSync(`./data/${tournament._id}/report_${report.id_match}.json`, JSON.stringify(report, null, 4));
          }
        }
      }
    }

    console.log(`°°°°°°°°° Skipped Games: ${skippedGames} °°°°°°°°°°°°°°` );
  } catch (error) {
    console.error("#### ERROR #####");
    console.error(error);
    console.error("#### ERROR #####");

  }
})();


/** #################################################################################################################
 *          Transformation
 * #################################################################################################################
 */ 
function transformReport(report, tournamentId) {
  // console.log(Object.keys(report));
  // console.log(JSON.stringify(report.score, null, 4));
  let r = {};
  // Check for whether or not to drop
  // Handshake game, do not count
  if(report.handshake) {
    // console.error(`${tournamentId}/${report.id_match} - Handshake Game, skipping…`);
    skippedGames++;
    return undefined;
  }

  // Not using T9A default scoring methodology           67eff65103404e864869e224
  // if(report?.scoring.id !== 11 && report?.scoring._id !== "67eff65103404e864869e224")
  // {
  //   skippedGames++;
  //   console.error(`${tournamentId}/${report.id_match} - Using unknown scoring system '${report.scoring.id}', skipping…`);
  //   return undefined;
  // }

  // One of the armies is not identifyable
  if(!report.players[0].id_book || !report.players[1].id_book) {
    // console.error(`${tournamentId}/report_${report.id_match}.json - Report does not contain armies: ${report.players[0].id_book} // ${report.players[1].id_book} `);
    skippedGames++;
    return undefined;
  }

  // No score
  if(typeof report.score[0]?.BPObj !== "number" || typeof report.score[1].BPObj !== "number") {
    // console.error(`${tournamentId}/report_${report.id_match}.json - Report does not contain a result: ${report.score[0]?.BPObj} // ${report.score[1].BPObj} `);
    skippedGames++;
    return undefined;
  }

  // ID
  r.id_match = report.id_match;
  // First turn
  // console.log(`${tournamentId}/report_${report.id_match}.json - First turn: ${report.first_turn}`);
  r.firstTurn = undefined !== report.first_turn ? report.first_turn : -1;
  // Type (what is type?)
  r.type = report.type;
  // ID
  r.id = report.id_match;
  // r.turns = Math.max(report.score[0].Turns, report.score[1].Turns);
  r.scoreOne = report.score[0].BPObj;
  r.scoreTwo = report.score[1].BPObj;

  if(20 !== r.scoreOne+r.scoreTwo) {
    console.error("### Faulty report, VP do not align to 20 ###");
  }

  r.armyOne = getArmyStringForId(report.players[0].id_book, true);
  r.armyTwo = getArmyStringForId(report.players[1].id_book, true);

  // Unidentified army
  if(r.armyOne === "n/a" || r.armyTwo === "n/a") {
    return undefined;
  }

  // console.log(report.players[0].report_list.exported_list);
  if(report.players[0].report_list) {
    r.armyListOne = transformArmyList(report.players[0].report_list, r.armyOne);
  } else {
    // console.log(`${tournamentId}/${report.id_match} - has no report list for player one`);
  }
  // console.log(report.players[1].report_list.exported_list);
  if(report.players[1].report_list) {
    r.armyListTwo = transformArmyList(report.players[1].report_list, r.armyTwo);
  } else {
    // console.log(`${tournamentId}/${report.id_match} - has no report list for player two`);
  }

  return r;
}

function getArmyStringForId(id, uppercase) {
  id = parseInt(id);
  switch(id) {
    case 2:
    return uppercase ? "BH" : "bh";
    case 3:
    return uppercase ? "DE" : "de";
    case 4:
    return uppercase ? "DH" : "dh";
    case 5:
    return uppercase ? "DL" : "dl";
    case 6:
    return uppercase ? "EoS" : "eos";
    case 7:
    return uppercase ? "HE" : "he";
    case 8:
    return uppercase ? "ID" : "id";
    case 9:
    return uppercase ? "KoE" : "koe";
    case 11:
    return uppercase ? "OK" : "ok";
    case 12:
    return uppercase ? "OnG" : "ong";
    case 13:
    return uppercase ? "SA" : "sa";
    case 14:
    return uppercase ? "SE" : "se";
    case 15:
    return uppercase ? "UD" : "ud";
    case 16:
    return uppercase ? "VC" : "vc";
    case 21:
    return uppercase ? "VS" : "vs";
    case 18:
    return uppercase ? "WDG" : "wdg";
    default:
    return "n/a";
  }
}

