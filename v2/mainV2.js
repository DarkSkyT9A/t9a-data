"use strict";

// Imports
const superagent = require('superagent');
const fs = require("node:fs");
// Secrets
const { user, password } = require("./secrets.json");

// Constants
const DEFAULT_START_DATE = "2025-03-05";


// Class Variables
const date = new Date();
const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

// Part 1: Get all tournaments
(async () => {
  try {
    const tournamentsResponse = await superagent
      .post('https://www.newrecruit.eu/api/tournaments')
      .send({
        "start": DEFAULT_START_DATE,
        "end": today,
        "status": 3,
        "id_game_system": 6
      })
      .set("accept", "json")
      .set("user-agent", "t9a-data/0.0.2")
      .set("NR-User", user)
      .set("NR-Password", password);
    // console.log(JSON.stringify(tournamentsResponse, null, 4));
    let tournamentsData = tournamentsResponse.body.tournaments;
    // console.log(tournamentsData);

    for (let tournament of tournamentsData) {
      // console.log(`Handling tournament ${JSON.stringify(tournament)}`);
      // Strip away time from the start and end times
      tournament.start = tournament.start.split("T")[0];
      tournament.end = tournament.end.split("T")[0];
      // console.log(`After clearing up start/end: ${JSON.stringify(tournament, null, 4)}`);
      
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
        fs.mkdirSync(`./data/${tournament._id}`, { "recursive" : true });
        // console.log(`... created`);
      }

      // Write to disc
      if (!fs.existsSync(`./data/${tournament._id}/metaData.json`)) {
        fs.writeFileSync(`./data/${tournament._id}/metaData.json`, JSON.stringify(tournament, null, 4));
      }
    }
  } catch (error) {
    console.error("#### ERROR #####");
    console.error(error);
    console.error("#### ERROR #####");

  }
})();



// console.log(`Getting individual game reports for tournament: ${tournament.name}`);
// const reportsResponse = superagent
//   .post('https://www.newrecruit.eu/api/reports')
//   .send({
//     "id_tournament": tournament._id
//   })
//   .set("accept", "json")
//   .set("user-agent", "t9a-data/0.0.2")
//   .set("NR-User", user)
//   .set("NR-Password", password);
// let reports = reportsResponse.body;

// reports.forEach(report => {
//   console.log(JSON.stringify(report, null, 4));
//   process.exit();
// });
// console.log(JSON.stringify(tournamentsData, null, 4));


