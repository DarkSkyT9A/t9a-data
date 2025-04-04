"use strict";
/*
* 1. Connect to tournaments get tournaments
* 2. Filter for T9A tournaments only
* 3. Accept start and end date as parameters
* 4. Get lists and results for a single tournament
* 5. Get lists and results for all tournaments
* 6. Correctly calculate average points for all armies
* 7. Create matrix with avg points against all other armies
* 8. Distinguish between single tournaments, team tournaments or both
* 9. …
*/

const fs = require('node:fs');
const superagent = require('superagent');
const args = require('yargs').argv;
const options = require('./options.js');
const { arcCompAll, allItems, arcCompCommon, arcCompShared, sharedArmour, sharedArtefact, sharedBanner, sharedPotion, sharedShield, sharedWeapon, allArmour, allWeapon, allShield, allArtefact, allPotion, allBanner } = require('./specialItems.js');

const defaultStartDate = "2025-03-05";
const date = new Date();
const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
let debug = false;
const armies = [ "bh", "de", "dh", "dl", "eos", "he", "id", "koe", "ok", "ong", "sa", "se", "ud", "vc", "vs", "wdg" ];

// Results
let resultData = {
  "bh" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "de" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "dh" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "dl" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "eos" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "he" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "id" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "koe" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "ok" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "ong" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "sa" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "se" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "ud" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "vc" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "vs" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
  "wdg" : { "all" : { "count" : "   0", "avg": "----"}, "bh" : { "count" : "   0", "avg": "----"}, "de" : { "count" : "   0", "avg": "----"}, "dh" : { "count" : "   0", "avg": "----"}, "dl" : { "count" : "   0", "avg": "----"}, "eos" : { "count" : "   0", "avg": "----"}, "he" : { "count" : "   0", "avg": "----"}, "id" : { "count" : "   0", "avg": "----"}, "koe" : { "count" : "   0", "avg": "----"}, "ok" : { "count" : "   0", "avg": "----"}, "ong" : { "count" : "   0", "avg": "----"}, "sa" : { "count" : "   0", "avg": "----"}, "se" : { "count" : "   0", "avg": "----"}, "ud" : { "count" : "   0", "avg": "----"}, "vc" : { "count" : "   0", "avg": "----"}, "vs" : { "count" : "   0", "avg": "----"}, "wdg" : { "count" : "   0", "avg": "----"}, },
};

// Raw Data
/*
    {
      "$army" : {
        "games" : {
          "missingLists" : int,
          "availableLists" : int,
          "totalGames" : int
        },
        "picks" : {
          "$entry" : {
            "base" : [ int ],
            "models" : [ int ],    // only for units which are not single model units
            "$option1" : [ int ],
            (…)
            "$optionN" : [ int],
          }
        }
      }
    }

*/


let rawData = {
  "byArmy" : {
    "bh" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "de" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "dh" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "dl" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "eos" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "he" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "id" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "koe" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "ok" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "ong" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "sa" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "se" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "ud" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "vc" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "vs" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
    "wdg" : { "games" : { "missingLists" : 0, "availableLists": 0, "playedGames": 0 } },
  },
  "global" : {
    "amountOfTournaments" : 0,
    "gamesCount" : 0,
    "pointsByTurn" : {
      "first" : [],
      "second" : [],
    },
    "specialItems" : {},
  }
};

// Pick Rates
let pickRates = {
  "bh" : {},
  "de" : {},
  "dh" : {},
  "dl" : {},
  "eos" : {},
  "he" : {},
  "id" : {},
  "koe" : {},
  "ok" : {},
  "ong" : {},
  "sa" : {},
  "se" : {},
  "ud" : {},
  "vc" : {},
  "vs" : {},
  "wdg" : {},
};

/*
id: str = Field(..., alias="_id")  #'61f9392492696257cf835c85'
name: str  #'Prueba 2'
short: Optional[str]  #'Prueba 2'
participants: int  # 32
participants_per_team: Optional[int]  # 8
team_proposals: Optional[int]  # 2
team_point_cap: Optional[int]  # 100
team_point_min: Optional[int]  # 60
teams: Optional[list[team]]
rounds: Optional[list[dict]]
start: str  #'2022-02-01T10:45:49.578Z'
end: str  #'2022-02-01T10:45:49.578Z'
status: int  # 1=OPEN, 2=ONGOING, 3=CLOSED
showlists: bool  # False
discord_notify_reports: Optional[bool]  # False
address: Optional[str]  #'<p></p>'
price: Optional[int]  # 15
currency: str  #'EUR'
description: str  #'<p></p>'
rules: str  #'<p></p>'
tables: int  # 8
group_size: Optional[int]  # 3, this group data is for events that have group stages then finals
group_winners: Optional[int]  # 1
group_win_condition: Optional[int]  # 0
group_letters: Optional[bool]  # False
roundNumber: Optional[int]  # 3
confirmed_participants: Optional[int]  # 0
type: int  # 0=singles, 1=teams
currentRound: Optional[int]  # 1
country: Optional[country_data]
id_game_system: int  # 5 = 9thage 2021, 6 = 9thage 2022
id_owner: list[str]  # ['601d932bf5fdcf2f56534c4c']
visibility: int  # 0
version: int  # 0
mod_date: str  #'2022-02-01T10:46:00.449Z'
scoring_system: int → what does 11 mean?
*/

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

/**
 * Based on the raw data directly from New Recruit fills two data structures. The Army Results based on the outcomes of the games for external balance
 * and amount of games played as well as the rawData structure to use the games played for later pickRate calculations.
 * @param {*} armyResults
 */
function calculateArmyResults(armyResults) {

  for(let armyId in armyResults) {
    let armyString = getArmyStringForId(armyId, false);

    let allGames = Object.values(armyResults[armyId].turn).flat();
    let allGamesCount = allGames.length;
    let allGamesAvg = (allGames.reduce((a,b) => a+b, 0) / allGamesCount).toFixed(1).padStart(4, " ");
    let firstTurnAvg = (armyResults[armyId].turn.first.reduce((a,b) => a+b, 0) / armyResults[armyId].turn.first.length).toFixed(1).padStart(4, " ");
    let secondTurnAvg = (armyResults[armyId].turn.second.reduce((a,b) => a+b, 0) / armyResults[armyId].turn.second.length).toFixed(1).padStart(4, " ");

    resultData[armyString].all.avg = allGamesAvg;
    resultData[armyString].all.first = firstTurnAvg;
    resultData[armyString].all.second = secondTurnAvg;
    resultData[armyString].all.count = `${allGamesCount}`.padStart(4, " ");

    // Raw Data stuff
    rawData.byArmy[armyString].games.playedGames = allGamesCount;

    for (let oppoArmyId in armyResults[armyId]) {
      if(oppoArmyId === "turn") {
        // do nothing
      } else {
        let oppoArmyString = getArmyStringForId(oppoArmyId, false);

        let vsArmyGames = Object.values(armyResults[armyId][oppoArmyId]);
        let vsArmyCount = vsArmyGames.length;
        let vsArmyAvg = (vsArmyGames.reduce((a,b) => a+b, 0) / vsArmyCount).toFixed(1).padStart(4, " ");

        resultData[armyString][oppoArmyString].avg = vsArmyAvg || "----";
        resultData[armyString][oppoArmyString].count = `${vsArmyCount}`.padStart(4, " ") || "   0";
      }

      // Possibly add the opponent data to rawData here, if needed
    }
  }

  // Calculate rank
  const allAverages = [
    parseFloat(resultData.bh.all.avg),    parseFloat(resultData.de.all.avg),    parseFloat(resultData.dh.all.avg),    parseFloat(resultData.dl.all.avg),
    parseFloat(resultData.eos.all.avg),    parseFloat(resultData.he.all.avg),    parseFloat(resultData.id.all.avg),    parseFloat(resultData.koe.all.avg),
    parseFloat(resultData.ok.all.avg),    parseFloat(resultData.ong.all.avg),    parseFloat(resultData.sa.all.avg),    parseFloat(resultData.se.all.avg),
    parseFloat(resultData.ud.all.avg),    parseFloat(resultData.vc.all.avg),    parseFloat(resultData.vs.all.avg),    parseFloat(resultData.wdg.all.avg),
  ]
  for(let armyString in resultData) {
    resultData[armyString].all.rank = (allAverages.filter(x => x > parseFloat(resultData[armyString].all.avg)).length + 1).toString().padStart(2, " ");
  }
}


function addListsToAnalysis(result) {
  // console.log(`Processing the following result and add lists to list analysis: ${JSON.stringify(result)}`);

  for(let player of result.players) {
    if(!player.report_list) {
      // TODO Implement parsing of the exported list and try to ingest the data this way
      // console.log(`Missing 'report_list' property. Implement exported list parsing to still be able to add this list for analysis.`)
      // Add a missing list for one game to this army, to prevent wrong pick rate calculation.
      let armyString = getArmyStringForId(player.id_book, false);
      rawData.byArmy[armyString] = rawData.byArmy[armyString] || {};
      rawData.byArmy[armyString].games.missingLists++;
      
    } else {
      // console.log(JSON.stringify(player.report_list, null, 4));
      let armyString = getArmyStringForId(player.id_book, null);
      const armyUnits = require("./units.js")[armyString];
      // Count the number of lists we have data for
      rawData.byArmy[armyString].games.availableLists++;

      // Prepare counting core points
      rawData.byArmy[armyString].core = rawData.byArmy[armyString].core || [];
      let thisListCorePoints = 0;
      let coreFactor = 1.00;

      // Add pick rates of units to overall result object
      for(let entry in player.report_list.units) {
        // Create if missing
        rawData.byArmy[armyString].picks = rawData.byArmy[armyString].picks || {};
        rawData.byArmy[armyString].picks[entry.toLowerCase()] = rawData.byArmy[armyString].picks[entry.toLowerCase()] || {};
        rawData.byArmy[armyString].picks[entry.toLowerCase()].base = rawData.byArmy[armyString].picks[entry.toLowerCase()].base || [];

        /**
         * Calculating Core
         */
        // console.log(`${entry} ${entry.toLowerCase()}`);
        // console.log(`Models for ${entry} are: ${JSON.stringify(player.report_list.options[entry])}`);
        let unitEntry = armyUnits.find(u => u.name === entry.toLowerCase());

        // Wildheart
        if(entry.toLowerCase() === `mammoth hunter`) {
          if(player.report_list.options["General, Disciplined and Wildheart"].find(a => a.amount > 0)) {
            coreFactor = 1.25;
          }
        }
        // Shadow Riders
        else if(entry.toLowerCase() === `shadow riders`) {
          for(let i = 0; i < player.report_list.units[entry].length; i++) {
            if(player.report_list.options["Light Lance and Repeater Crossbow"][i].amount === 0) {
                thisListCorePoints += player.report_list.units[entry][i].totalCost;
              }
          }
        }
        // Dancers of Yema
        else if(entry.toLowerCase() === `temple militants`) {
          for(let i = 0; i < player.report_list.units[entry].length; i++) {
            if(player.report_list.options["Dancers of Yema"][i].amount === 0) {
                thisListCorePoints += player.report_list.units[entry][i].totalCost;
              }
          }
        }
        // Raptor Pack
        else if(entry.toLowerCase() === `raptor pack`) {
          for(let i = 0; i < player.report_list.units[entry].length; i++) {
            if(player.report_list.options["Corrosive Spitter"][i].amount === 0 &&
              player.report_list.options["Ambush"].filter(a => a.parentUnit.toLowerCase() === entry.toLowerCase())[i].amount === 0) {
                thisListCorePoints += player.report_list.units[entry][i].totalCost;
              }
          }
        }
        // Headbashers
        else if(["feral orcs", "feral orc marauders", "veteran orcs", "veteran orc marauders"].includes(entry.toLowerCase())) {
          for(let i = 0; i < player.report_list.units[entry].length; i++) {
            if(player.report_list.options["Headbashers"].filter(a => a.parentUnit.toLowerCase() === entry.toLowerCase())[i].amount === 0) {
                thisListCorePoints += player.report_list.units[entry][i].totalCost;
            }
          }
        }

        // Generic stuff only after special cases have been handled
        else if(unitEntry?.category === "core") {
          // console.log(`Unit ${entry} of army ${armyString} identified as a core unit`);
          thisListCorePoints += player.report_list.units[entry].reduce((a,b)=>a+b.totalCost,0);
          // console.log(`This lists core points are now: ${thisListCorePoints}`);
        } else if(unitEntry?.conditionalCore) {
          let condition = unitEntry.conditionalCore;
          // console.log(`${entry} - Found condition for core as ${condition} of type ${typeof condition}`);
          for(let i = 0; i < player.report_list.units[entry].length; i++) {
            if(typeof condition === "number" && player.report_list.options[entry][i]?.amount >= condition) {
              if(debug) console.log(`Counting ${entry} with ${player.report_list.options[entry][i]?.amount} models as core`);
              // console.log(`Adding ${player.report_list.units[entry][i].totalCost} points.`);
              thisListCorePoints += player.report_list.units[entry][i].totalCost;
            } else if(typeof condition === "string") {
              // TODO Implement this
              console.log(`TODO Conditional core based on other options than model numbers not implemented yet.`);
            }
          }
        }
        // Instead of pushing amount and counting, push the point values
        // console.log(`${armyString} - ${entry} : ${JSON.stringify(player.report_list.units[entry], null, 4)}`);
        rawData.byArmy[armyString].picks[entry.toLowerCase()].base.push(player.report_list.units[entry].map(e => e.totalCost));
      }
      if(debug) console.log(player.exported_list);
      thisListCorePoints = thisListCorePoints * coreFactor;
      if(debug) console.log(`This list's core points are: ${thisListCorePoints}`);

      // Print out potentially wrong lists
      // if(thisListCorePoints > 920 && player.id_book === 18) {
      //   console.log(`\n\n\nERROR LIST (${thisListCorePoints})\n\n\n`);
      //   console.log(player.exported_list);
      //   // console.log(JSON.stringify(player.report_list, null, 4));
      //   console.log(`\n\n\nERROR LIST\n\n\n`);
      // }

      // Flatten the core array and add it
      rawData.byArmy[armyString].core.push(thisListCorePoints);

      // Parse Options
      for(let option in player.report_list.options) {
        // console.log(`Parsing option ${JSON.stringify(option)}`);
        for(let optionEntry of player.report_list.options[option]) {
          if(optionEntry.amount > 0) {
            // console.log(`Option taken: ${option} - ${JSON.stringify(optionEntry)}`);
            // This indicates how many models
            if(optionEntry.parentUnit.toLowerCase() === option.toLowerCase()) {
              option = `models`;
            }
            rawData.byArmy[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()] = rawData.byArmy[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()] || [];
            rawData.byArmy[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()].push(optionEntry.amount);
          }
        }
      }
    }
  }
}

function calculatePickRates() {
  // Iterate per army
  for(let army in rawData.byArmy) {
    // Create data structure for special items, if not already there
    pickRates[army].specialItems = pickRates[army].specialItems || {};
    pickRates[army].units = pickRates[army].units || {};
    // Iterate per unit
    for(let unit in rawData.byArmy[army].picks) {
      // Pick Rate for unit
      // TODO For all pick rates => convert into an object with count and percentage
      // console.log(`Checking .base for ${unit}: ${JSON.stringify(rawData.byArmy[army].picks[unit].base, null, 4)}`);
      let pickRateOnce = 0;
      let pickRateTwice = 0;
      let pickRateThrice = 0;
      let pickRateFourOrMore = 0;
      for(let value of rawData.byArmy[army].picks[unit].base) {
        if(value.length === 1) pickRateOnce++;
        if(value.length === 2) pickRateTwice++;
        if(value.length === 3) pickRateThrice++;
        if(value.length > 3) pickRateFourOrMore++;
      }
      pickRateOnce = `${(pickRateOnce * 100 / rawData.byArmy[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateTwice = `${(pickRateTwice * 100 / rawData.byArmy[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateThrice = `${(pickRateThrice * 100 / rawData.byArmy[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateFourOrMore = `${(pickRateFourOrMore * 100 / rawData.byArmy[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      
      let flatArray = rawData.byArmy[army].picks[unit].base.flat();
      let pickSum = flatArray.length;
      let pickPercent = `${(pickSum * 100 / rawData.byArmy[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      let pickPointsSum = flatArray.reduce((a, b) => a + b, 0);
      let pickPointsAverage = (pickPointsSum / rawData.byArmy[army].games.availableLists).toFixed(0).padStart(4, " ");
     
      pickRates[army].units[unit] = pickRates[army][unit] || {};
      pickRates[army].units[unit].picks = pickRates[army].units[unit].picks || {};
      pickRates[army].units[unit].options = pickRates[army].units[unit].options || {};
      pickRates[army].units[unit].picks.times = pickSum;
      pickRates[army].units[unit].picks.percent = pickPercent;
      pickRates[army].units[unit].picks.rate1 = pickRateOnce;
      pickRates[army].units[unit].picks.rate2 = pickRateTwice;
      pickRates[army].units[unit].picks.rate3 = pickRateThrice;
      pickRates[army].units[unit].picks.rate4 = pickRateFourOrMore;
      pickRates[army].units[unit].picks.points = pickPointsAverage;

      // Pick Rate for Options
      for(let option in rawData.byArmy[army].picks[unit]) {
        if(option === 'base') {
          continue;
        }
        else if(option === 'models') {
          const armyUnits = require("./units.js")[army];
          // TODO Array with unit size (models) may be smaller than the picked units. Make sure to calculate avg unit size correctly on the real amount
          //      of units with a model count. Same for percentages of small, medium, large
          pickRates[army].units[unit].options.models = pickRates[army].units[unit].options.models || {};
          pickRates[army].units[unit].options.models.Ø = `${(rawData.byArmy[army].picks[unit][option].reduce((a,b)=>a+b,0) / pickSum).toFixed(1).padStart(4, " ")}`;
          // console.log(`unit ${unit}`);
          // TODO Remove conditional chaining here, to find all missing or problematic unit entries
          let min = armyUnits.find((e) => e.name === unit)?.min;
          let max = armyUnits.find((e) => e.name === unit)?.max;
          if(min && max) {
            let smallUntil = Math.floor(min + (max-min)/4);
            let mediumUntil = Math.floor(min + (max-min)*2/3);

            pickRates[army].units[unit].options.models[`small  (${min}-${smallUntil})`] = `${(rawData.byArmy[army].picks[unit][option].filter((a)=>a<=smallUntil).length * 100 / pickSum).toFixed(0).padStart(3, " ")}%`;
            pickRates[army].units[unit].options.models[`medium (${smallUntil+1}-${mediumUntil})`] = `${(rawData.byArmy[army].picks[unit][option].filter((a)=>a>smallUntil && a<=mediumUntil).length * 100 / pickSum).toFixed(0).padStart(3, " ")}%`;
            pickRates[army].units[unit].options.models[`large  (${mediumUntil+1}-${max})`] = `${(rawData.byArmy[army].picks[unit][option].filter((a)=>a>mediumUntil).length * 100 / pickSum).toFixed(0).padStart(3, " ")}%`;
          }
        } else {
          // If it is a special items from Arcane Compendium, then add it to global counters as well
          if(arcCompAll.includes(option)) {
            if(debug) console.log(`Option '${option}' identified as a Arc Comp Special Item`);
            rawData.global.specialItems[option] = rawData.global.specialItems[option] || 0;
            rawData.global.specialItems[option] += rawData.byArmy[army].picks[unit][option].reduce((a,b)=>a+b,0);
          }

          // Sort the options into the appropriate category
          if(options.meleeWeapons.includes(option)) {
            pickRates[army].units[unit].options.meleeWeapons = pickRates[army].units[unit].options.meleeWeapons || {};
            pickRates[army].units[unit].options.meleeWeapons[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.shootingWeapons.includes(option)) {
            pickRates[army].units[unit].options.shootingWeapons = pickRates[army].units[unit].options.shootingWeapons || {};
            pickRates[army].units[unit].options.shootingWeapons[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.artilleryWeapons.includes(option)) {
            pickRates[army].units[unit].options.artilleryWeapons = pickRates[army].units[unit].options.artilleryWeapons || {};
            pickRates[army].units[unit].options.artilleryWeapons[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.commandGroup.includes(option)) {
            pickRates[army].units[unit].options.commandGroup = pickRates[army].units[unit].options.commandGroup || {};
            pickRates[army].units[unit].options.commandGroup[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.wizardLevels.includes(option)) {
            pickRates[army].units[unit].options.wizardLevels = pickRates[army].units[unit].options.wizardLevels || {};
            pickRates[army].units[unit].options.wizardLevels[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.paths.includes(option)) {
            pickRates[army].units[unit].options.paths = pickRates[army].units[unit].options.paths || {};
            pickRates[army].units[unit].options.paths[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.spells.includes(option)) {
            // Skip, tracking spells is useless
          } else if(options.leadership.includes(option)) {
            pickRates[army].units[unit].options.leadership = pickRates[army].units[unit].options.leadership || {};
            pickRates[army].units[unit].options.leadership[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.armour.includes(option)) {
            pickRates[army].units[unit].options.armour = pickRates[army].units[unit].options.armour || {};
            pickRates[army].units[unit].options.armour[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.specialistSkills.includes(option)) {
            pickRates[army].units[unit].options.specialistSkills = pickRates[army].units[unit].options.specialistSkills || {};
            pickRates[army].units[unit].options.specialistSkills[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.totem.includes(option)) {
            pickRates[army].units[unit].options.totem = pickRates[army].units[unit].options.totem || {};
            pickRates[army].units[unit].options.totem[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.battleRunes.includes(option)) {
            pickRates[army].units[unit].options.battleRunes = pickRates[army].units[unit].options.battleRunes || {};
            pickRates[army].units[unit].options.battleRunes[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.manifestations.includes(option)) {
            pickRates[army].units[unit].options.manifestations = pickRates[army].units[unit].options.manifestations || {};
            pickRates[army].units[unit].options.manifestations[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.honour.includes(option)) {
            pickRates[army].units[unit].options.honour = pickRates[army].units[unit].options.honour || {};
            pickRates[army].units[unit].options.honour[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.knightlyPrinciple.includes(option)) {
            pickRates[army].units[unit].options.knightlyPrinciple = pickRates[army].units[unit].options.knightlyPrinciple || {};
            pickRates[army].units[unit].options.knightlyPrinciple[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.heroicTraits.includes(option)) {
            pickRates[army].units[unit].options.heroicTraits = pickRates[army].units[unit].options.heroicTraits || {};
            pickRates[army].units[unit].options.heroicTraits[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.bigName.includes(option)) {
            pickRates[army].units[unit].options.bigName = pickRates[army].units[unit].options.bigName || {};
            pickRates[army].units[unit].options.bigName[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.trollRace.includes(option)) {
            pickRates[army].units[unit].options.trollRace = pickRates[army].units[unit].options.trollRace || {};
            pickRates[army].units[unit].options.trollRace[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.howdah.includes(option)) {
            pickRates[army].units[unit].options.howdah = pickRates[army].units[unit].options.howdah || {};
            pickRates[army].units[unit].options.howdah[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.arcaneMastery.includes(option)) {
            pickRates[army].units[unit].options.arcaneMastery = pickRates[army].units[unit].options.arcaneMastery || {};
            pickRates[army].units[unit].options.arcaneMastery[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.telepathicMastery.includes(option)) {
            pickRates[army].units[unit].options.telepathicMastery = pickRates[army].units[unit].options.telepathicMastery || {};
            pickRates[army].units[unit].options.telepathicMastery[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.kindred.includes(option)) {
            pickRates[army].units[unit].options.kindred = pickRates[army].units[unit].options.kindred || {};
            pickRates[army].units[unit].options.kindred[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.aspectOfNature.includes(option)) {
            pickRates[army].units[unit].options.aspectOfNature = pickRates[army].units[unit].options.aspectOfNature || {};
            pickRates[army].units[unit].options.aspectOfNature[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.lordOfUndeath.includes(option)) {
            pickRates[army].units[unit].options.lordOfUndeath = pickRates[army].units[unit].options.lordOfUndeath || {};
            pickRates[army].units[unit].options.lordOfUndeath[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.occupation.includes(option)) {
            pickRates[army].units[unit].options.occupation = pickRates[army].units[unit].options.occupation || {};
            pickRates[army].units[unit].options.occupation[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.ancestralBloodPower.includes(option)) {
            pickRates[army].units[unit].options.ancestralBloodPower = pickRates[army].units[unit].options.ancestralBloodPower || {};
            pickRates[army].units[unit].options.ancestralBloodPower[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.bloodPowers.includes(option)) {
            pickRates[army].units[unit].options.bloodPowers = pickRates[army].units[unit].options.bloodPowers || {};
            pickRates[army].units[unit].options.bloodPowers[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.patronDeity.includes(option)) {
            pickRates[army].units[unit].options.patronDeity = pickRates[army].units[unit].options.patronDeity || {};
            pickRates[army].units[unit].options.patronDeity[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.house.includes(option)) {
            pickRates[army].units[unit].options.house = pickRates[army].units[unit].options.house || {};
            pickRates[army].units[unit].options.house[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.mortalOrigin.includes(option)) {
            pickRates[army].units[unit].options.mortalOrigin = pickRates[army].units[unit].options.mortalOrigin || {};
            pickRates[army].units[unit].options.mortalOrigin[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.favour.includes(option)) {
            pickRates[army].units[unit].options.favour = pickRates[army].units[unit].options.favour || {};
            pickRates[army].units[unit].options.favour[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.darkGodGift.includes(option)) {
            pickRates[army].units[unit].options.darkGodGift = pickRates[army].units[unit].options.darkGodGift || {};
            pickRates[army].units[unit].options.darkGodGift[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.mounts.includes(option)) {
            pickRates[army].units[unit].options.mounts = pickRates[army].units[unit].options.mounts || {};
            pickRates[army].units[unit].options.mounts[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(allItems.includes(option)) {
            pickRates[army].units[unit].options.specialItems = pickRates[army].units[unit].options.specialItems || {};
            pickRates[army].units[unit].options.specialItems[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          }
          // "other" as a catch all
          else {
            pickRates[army].units[unit].options.other = pickRates[army].units[unit].options.other || {};
            pickRates[army].units[unit].options.other[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;

          }
          // pickRates[army].units[unit].options[option] = `${(rawData.byArmy[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
        }

        // Handle Special Items
        if(allItems.includes(option)) {
          pickRates[army].specialItems[option] = pickRates[army].specialItems[option] || { "name" : option, "count" : 0, "pickPercent" : "", "type" : "", "source" : "" };
          pickRates[army].specialItems[option].count = pickRates[army].specialItems[option].count + rawData.byArmy[army].picks[unit][option].reduce((a,b)=>a+b,0);
          pickRates[army].specialItems[option].pickPercent = `${(pickRates[army].specialItems[option].count * 100 / rawData.byArmy[army].games.availableLists).toFixed(0)}`;
          if(Object.values(arcCompCommon).flat().includes(option)) {
            pickRates[army].specialItems[option].source = "common";
          } else if(arcCompShared.includes(option)) {
            pickRates[army].specialItems[option].source = "shared";
          } else {
            pickRates[army].specialItems[option].source = "army";
          }

          if(allWeapon.includes(option)) {
            pickRates[army].specialItems[option].type = "weapon";
          } else if(allArmour.includes(option)) {
            pickRates[army].specialItems[option].type = "armour";
          } else if(allShield.includes(option)) {
            pickRates[army].specialItems[option].type = "shield";
          } else if(allArtefact.includes(option)) {
            pickRates[army].specialItems[option].type = "artefact";
          } else if(allPotion.includes(option)) {
            pickRates[army].specialItems[option].type = "potion";
          } else if(allBanner.includes(option)) {
            pickRates[army].specialItems[option].type = "banner";
          } 
        }
      }

      // Calculate Pricing Relevant Global Metrics
      let values = Object.values(pickRates[army].specialItems);
      const armyItems = require("./specialItems.js")[army];
      pickRates[army].pricing =  pickRates[army].pricing || {};
      pickRates[army].pricing.items = pickRates[army].pricing.items || {};
      pickRates[army].pricing.items.count = pickRates[army].pricing.items.count || {};
      pickRates[army].pricing.items.count.army = values.filter(option => option.source === "army").reduce((a,b)=>a+b.count,0);
      pickRates[army].pricing.items.count.global = values.filter(option => option.source !== "army").reduce((a,b)=>a+b.count,0);
      pickRates[army].pricing.items.count.factor = (pickRates[army].pricing.items.count.army / Object.values(armyItems).flat().length)/ (pickRates[army].pricing.items.count.global / (Object.values(arcCompCommon).flat().length + arcCompShared.length));
      let highestArmyWeaponCount = values.filter(o => o.source === "army" && o.type === "weapon").reduce((a, b) => Math.max(a, b.count), -Infinity);
      let highestArmyArmourShieldCount = values.filter(o => o.source === "army" && (o.type === "armour" || o.type === "shield")).reduce((a, b) => Math.max(a, b.count), -Infinity);
      let highestArmyArtefactCount = values.filter(o => o.source === "army" && o.type === "artefact").reduce((a, b) => Math.max(a, b.count), -Infinity);
      let highestArmyPotionCount = values.filter(o => o.source === "army" && o.type === "potion").reduce((a, b) => Math.max(a, b.count), -Infinity);
      let highestArmyBannerCount = values.filter(o => o.source === "army" && o.type === "banner").reduce((a, b) => Math.max(a, b.count), -Infinity);

      pickRates[army].pricing.items.problems = pickRates[army].pricing.items.problems || {};
      pickRates[army].pricing.items.problems.weapon = values.filter(o => o.source !== "army" && o.type === "weapon" && o.count > highestArmyWeaponCount);
      pickRates[army].pricing.items.problems.armourShield = values.filter(o => o.source !== "army" && (o.type === "armour" || o.type === "shield") && o.count > highestArmyArmourShieldCount);
      pickRates[army].pricing.items.problems.artefact = values.filter(o => o.source !== "army" && o.type === "artefact" && o.count > highestArmyArtefactCount);
      pickRates[army].pricing.items.problems.potion = values.filter(o => o.source !== "army" && o.type === "potion" && o.count > highestArmyPotionCount);
      pickRates[army].pricing.items.problems.banner = values.filter(o => o.source !== "army" && o.type === "banner" && o.count > highestArmyBannerCount);
    }
  }
}



(async () => {
  try {
    // Evaluate Command Line Arguments
    debug = args.d ? true : false;
    if(debug) console.log(args);
    const tournamentType = args.type || 'single';
    const showExternalBalance = args.e ? true : false;
    const showPickRates = args.p ? true : false;
    const showRawData = args.r ? true : false;
    const showOptionRates = args.o ? true : false;
    const showPricingActions = args.z ? true : false;
    const minParticipants = args.minParticipants ? args.minParticipants : 0;
    const start = args.start || defaultStartDate;
    const end = args.end || today;
    const tournamentsFileName = `${start}-${end}-tournaments-data.json`;
    let tournamentsData;

    if(fs.existsSync(tournamentsFileName)) {
      if(debug) console.log(`DEBUG: Reading file from disc. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
      tournamentsData = JSON.parse(JSON.parse(fs.readFileSync(tournamentsFileName)).text);
    } else {
      if(debug) console.log(`DEBUG: Reading data from New Recruit. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
      const tournamentsResponse = await superagent
      .post('https://www.newrecruit.eu/api/tournaments')
      .send({
        "start": start,
        "end": end,
        "status" : 3,
        "id_game_system" : 6 })
      .set("accept", "json")
      .set("user-agent", "t9a-data/0.0.1");
      tournamentsData = tournamentsResponse.body;

      if(debug) console.log(`DEBUG: Writing data to disc. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
      fs.writeFileSync(tournamentsFileName, JSON.stringify(tournamentsResponse, null, 4));
    }

    let data;
    if(tournamentType === 'single') {
      data = tournamentsData.filter((tournament) => tournament.type === 0 && tournament.scoring_system === 11 && tournament.participants >= minParticipants);
    } else if(tournamentType === 'teams') {
      data = tournamentsData.filter((tournament) => tournament.type === 1 && tournament.scoring_system === 11 && (tournament.participants * tournament.participants_per_team) >= minParticipants);
    } else if(tournamentType === 'all') {
      data = tournamentsData.filter((tournament) => {
        let players = tournament.type === 0 ? tournament.participants : tournament.participants * tournament.participants_per_team;
        return tournament.scoring_system === 11 && players >= minParticipants;
      });
    } else {
      console.log(`Error: Tournament Type of ${tournamentType} is not supported. Use 'single', 'teams', or 'all'`);
      process.exit(1);
    }

    rawData.global.amountOfTournaments = data.length;
    let armyResults = { };

    for(let t of data) {
      if(debug) console.log(`Assessing tournament: ${t.name}`);
      const singleTournamentFileName = `./data/${t._id}.json`;
      let singleTournamentData;
      if(fs.existsSync(singleTournamentFileName)) {
        singleTournamentData = JSON.parse(JSON.parse(fs.readFileSync(singleTournamentFileName)).text);
      } else {
        const reportsResponse = await superagent
        .post('https://www.newrecruit.eu/api/reports')
        .send({ "id_tournament": t._id })
        .set("accept", "json")
        .set("user-agent", "t9a-data/0.0.1");
        singleTournamentData = reportsResponse.body;
        fs.writeFileSync(singleTournamentFileName, JSON.stringify(reportsResponse, null, 4));
      }

      const validResults = singleTournamentData.filter((r) => r.handshake === false && typeof r.players[0].id_book === "number" && typeof r.players[1].id_book === "number");
      if(debug) console.log(`Filtered out ${singleTournamentData.length - validResults.length} invalid reports`);

      for(let result of validResults) {
        if(typeof result.score[0].BPObj !== "number" || typeof result.score[1].BPObj !== "number") {
          if(debug) console.log(`Filtering out game result due to missing score.`);
          continue;
        }
        rawData.global.gamesCount++
        
        if(debug) {
          console.log(`Game Result: Army '${result.players[0].id_book}' vs Army '${result.players[1].id_book}' → ${result.score[0].BPObj} : ${result.score[1].BPObj}`);
          console.log(`Game Result: List ${result.players[0].exported_list} vs Army ${result.players[1].exported_list}`);
          console.log(`Game Result: Score ${JSON.stringify(result.score, null, 4)}`);
          console.log(`Game Result: First Turn ${result.first_turn}`);
          // console.log(`Game Result: ${JSON.stringify(result, null, 4)}`);
        }

        /** GAME RESULT **/
        // Add new entries, if they do not exist yet
        armyResults[result.players[0].id_book] = armyResults[result.players[0].id_book] || {};
        armyResults[result.players[1].id_book] = armyResults[result.players[1].id_book] || {};
        armyResults[result.players[0].id_book].turn = armyResults[result.players[0].id_book].turn || { "first" : [], "second" : [] };
        armyResults[result.players[1].id_book].turn = armyResults[result.players[1].id_book].turn || { "first" : [], "second" : [] };
        armyResults[result.players[0].id_book][result.players[1].id_book] = armyResults[result.players[0].id_book][result.players[1].id_book] || [];
        armyResults[result.players[1].id_book][result.players[0].id_book] = armyResults[result.players[1].id_book][result.players[0].id_book] || [];

        // Push results to going first or second
        if(result.first_turn === 0) {
          armyResults[result.players[0].id_book].turn.first.push(result.score[0].BPObj);
          armyResults[result.players[1].id_book].turn.second.push(result.score[1].BPObj);
        } else if(result.first_turn === 1) {
          armyResults[result.players[0].id_book].turn.second.push(result.score[0].BPObj);
          armyResults[result.players[1].id_book].turn.first.push(result.score[1].BPObj);
        }
        // Push result to army vs army grid
        armyResults[result.players[0].id_book][result.players[1].id_book].push(result.score[0].BPObj);
        armyResults[result.players[1].id_book][result.players[0].id_book].push(result.score[1].BPObj);

        // Push result to global counters
        if(result.first_turn === 0) {
          rawData.global.pointsByTurn.first.push(result.score[0].BPObj);
          rawData.global.pointsByTurn.second.push(result.score[1].BPObj);
        } else if(result.first_turn === 1) {
          rawData.global.pointsByTurn.first.push(result.score[1].BPObj);
          rawData.global.pointsByTurn.second.push(result.score[0].BPObj);
        } else {
          console.log(`\nERROR: First turn is neither 0 nor 1.\n`);
        }

        /** LIST ANALYSIS */
        addListsToAnalysis(result);
      }
    }
    printMetaData(start, end);
    printGlobalData();
    calculateArmyResults(armyResults);
    if(showExternalBalance) printArmyResults();
    calculatePickRates();
    if(showPickRates) printUnitPickRates();
    if(showOptionRates) printUnitOptionRates();
    if(showPricingActions) printPricingActions();
    if(showRawData) {
      console.log(JSON.stringify(rawData, null, 4));
      console.log(JSON.stringify(pickRates, null, 4));
    }
    // console.log(JSON.stringify(armyResults));
    // console.log(response.body);
  } catch (error) {
    console.log(error);
  }
})();

function printMetaData(start, end) {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mT9A Data Tool Meta Data\x1b[0m                                                     ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Tournaments in Calculation: ${rawData.global.amountOfTournaments.toString().padEnd(6, " ")}                                          ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Total amount of games: ${rawData.global.gamesCount.toString().padEnd(5, " ")}                                                ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Time frame from ${start} until ${end}                                 ┃`);
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);

}

function printGlobalData() {
  let firstCount = rawData.global.pointsByTurn.first.length;
  let secondCount = rawData.global.pointsByTurn.second.length;
  if(firstCount !== secondCount) {
    console.log(`\n~~~~ ERROR - Inconsistent data, first turns and second turns are not counting equal.\n~~~~~~~~~~~~~~~~~~~~~~\n\n\n`);
  }
  let firstAvg = (rawData.global.pointsByTurn.first.reduce((a,b)=>a+b, 0) / firstCount).toFixed(1).padStart(4, " ");
  let secondAvg = (rawData.global.pointsByTurn.second.reduce((a,b)=>a+b, 0) / secondCount).toFixed(1).padStart(4, " ");

  let decisive = rawData.global.pointsByTurn.first.filter(a => a>=18 || a<=2).length.toString().padStart(5, " ");
  let normal = rawData.global.pointsByTurn.first.filter(a => (a>2 && a<7) || (a>13 && a<18)).length.toString().padStart(5, " ");
  let close = rawData.global.pointsByTurn.first.filter(a => a>6 && a<14).length.toString().padStart(5, " ");

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mGame Wide Data\x1b[0m                                                              ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Average points going first:  ${firstAvg}                                           ┃`);
  console.log(`┃ Average points going second: ${secondAvg}                                           ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Decisive Games (18-20): ${decisive} / ${(decisive*100/firstCount).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┃ 'Normal' Games (14-17): ${normal} / ${(normal*100/firstCount).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┃ Close    Games (10-13): ${close} / ${(close*100/firstCount).toFixed(0).padStart(3, " ")}%                                        ┃`);
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);

}

function printArmyResults() {

  const emptyLine = `┃\x1b[0m      ┃       │      ┃      │      │      │      │      │      │      │      │      │      │      │      │      │      │      │      ┃      │      \x1b[0m┃`;

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1m Tournament Type: ${(args.type || 'Single').padEnd(43, " ") } – Average Points \x1b[0m                                                                   ┃`);
  console.log(`┣━━━━━━┳━━━━━━━┯━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┳━━━━━━┯━━━━━━┫`);
  console.log(`┃POINTS┃\x1b[1;106m TOTAL \x1b[0m│ RANK ┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃ 1st  │ 2nd  ┃`);
  console.log(`┣━━━━━━╋━━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━╋━━━━━━┿━━━━━━┫`);
  console.log(`┃ BH   ┃\x1b[1;106m  ${resultData.bh.all.avg} \x1b[0m│  ${resultData.bh.all.rank}  ┃ \x1b[47m${resultData.bh.bh.avg}\x1b[0m │ ${resultData.bh.de.avg} │ ${resultData.bh.dh.avg} │ ${resultData.bh.dl.avg} │ ${resultData.bh.eos.avg} │ ${resultData.bh.he.avg} │ ${resultData.bh.id.avg} │ ${resultData.bh.koe.avg} │ ${resultData.bh.ok.avg} │ ${resultData.bh.ong.avg} │ ${resultData.bh.sa.avg} │ ${resultData.bh.se.avg} │ ${resultData.bh.ud.avg} │ ${resultData.bh.vc.avg} │ ${resultData.bh.vs.avg} │ ${resultData.bh.wdg.avg} ┃ ${resultData.bh.all.first} │ ${resultData.bh.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ DE   ┃\x1b[1;106m  ${resultData.de.all.avg} \x1b[0m│  ${resultData.de.all.rank}  ┃ ${resultData.de.bh.avg} │ \x1b[47m${resultData.de.de.avg}\x1b[0m │ ${resultData.de.dh.avg} │ ${resultData.de.dl.avg} │ ${resultData.de.eos.avg} │ ${resultData.de.he.avg} │ ${resultData.de.id.avg} │ ${resultData.de.koe.avg} │ ${resultData.de.ok.avg} │ ${resultData.de.ong.avg} │ ${resultData.de.sa.avg} │ ${resultData.de.se.avg} │ ${resultData.de.ud.avg} │ ${resultData.de.vc.avg} │ ${resultData.de.vs.avg} │ ${resultData.de.wdg.avg} ┃ ${resultData.de.all.first} │ ${resultData.de.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ DH   ┃\x1b[1;106m  ${resultData.dh.all.avg} \x1b[0m│  ${resultData.dh.all.rank}  ┃ ${resultData.dh.bh.avg} │ ${resultData.dh.de.avg} │ \x1b[47m${resultData.dh.dh.avg}\x1b[0m │ ${resultData.dh.dl.avg} │ ${resultData.dh.eos.avg} │ ${resultData.dh.he.avg} │ ${resultData.dh.id.avg} │ ${resultData.dh.koe.avg} │ ${resultData.dh.ok.avg} │ ${resultData.dh.ong.avg} │ ${resultData.dh.sa.avg} │ ${resultData.dh.se.avg} │ ${resultData.dh.ud.avg} │ ${resultData.dh.vc.avg} │ ${resultData.dh.vs.avg} │ ${resultData.dh.wdg.avg} ┃ ${resultData.dh.all.first} │ ${resultData.dh.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ DL   ┃\x1b[1;106m  ${resultData.dl.all.avg} \x1b[0m│  ${resultData.dl.all.rank}  ┃ ${resultData.dl.bh.avg} │ ${resultData.dl.de.avg} │ ${resultData.dl.dh.avg} │ \x1b[47m${resultData.dl.dl.avg}\x1b[0m │ ${resultData.dl.eos.avg} │ ${resultData.dl.he.avg} │ ${resultData.dl.id.avg} │ ${resultData.dl.koe.avg} │ ${resultData.dl.ok.avg} │ ${resultData.dl.ong.avg} │ ${resultData.dl.sa.avg} │ ${resultData.dl.se.avg} │ ${resultData.dl.ud.avg} │ ${resultData.dl.vc.avg} │ ${resultData.dl.vs.avg} │ ${resultData.dl.wdg.avg} ┃ ${resultData.dl.all.first} │ ${resultData.dl.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ EoS  ┃\x1b[1;106m  ${resultData.eos.all.avg} \x1b[0m│  ${resultData.eos.all.rank}  ┃ ${resultData.eos.bh.avg} │ ${resultData.eos.de.avg} │ ${resultData.eos.dh.avg} │ ${resultData.eos.dl.avg} │ \x1b[47m${resultData.eos.eos.avg}\x1b[0m │ ${resultData.eos.he.avg} │ ${resultData.eos.id.avg} │ ${resultData.eos.koe.avg} │ ${resultData.eos.ok.avg} │ ${resultData.eos.ong.avg} │ ${resultData.eos.sa.avg} │ ${resultData.eos.se.avg} │ ${resultData.eos.ud.avg} │ ${resultData.eos.vc.avg} │ ${resultData.eos.vs.avg} │ ${resultData.eos.wdg.avg} ┃ ${resultData.eos.all.first} │ ${resultData.eos.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ HE   ┃\x1b[1;106m  ${resultData.he.all.avg} \x1b[0m│  ${resultData.he.all.rank}  ┃ ${resultData.he.bh.avg} │ ${resultData.he.de.avg} │ ${resultData.he.dh.avg} │ ${resultData.he.dl.avg} │ ${resultData.he.eos.avg} │ \x1b[47m${resultData.he.he.avg}\x1b[0m │ ${resultData.he.id.avg} │ ${resultData.he.koe.avg} │ ${resultData.he.ok.avg} │ ${resultData.he.ong.avg} │ ${resultData.he.sa.avg} │ ${resultData.he.se.avg} │ ${resultData.he.ud.avg} │ ${resultData.he.vc.avg} │ ${resultData.he.vs.avg} │ ${resultData.he.wdg.avg} ┃ ${resultData.he.all.first} │ ${resultData.he.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ ID   ┃\x1b[1;106m  ${resultData.id.all.avg} \x1b[0m│  ${resultData.id.all.rank}  ┃ ${resultData.id.bh.avg} │ ${resultData.id.de.avg} │ ${resultData.id.dh.avg} │ ${resultData.id.dl.avg} │ ${resultData.id.eos.avg} │ ${resultData.id.he.avg} │ \x1b[47m${resultData.id.id.avg}\x1b[0m │ ${resultData.id.koe.avg} │ ${resultData.id.ok.avg} │ ${resultData.id.ong.avg} │ ${resultData.id.sa.avg} │ ${resultData.id.se.avg} │ ${resultData.id.ud.avg} │ ${resultData.id.vc.avg} │ ${resultData.id.vs.avg} │ ${resultData.id.wdg.avg} ┃ ${resultData.id.all.first} │ ${resultData.id.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ KoE  ┃\x1b[1;106m  ${resultData.koe.all.avg} \x1b[0m│  ${resultData.koe.all.rank}  ┃ ${resultData.koe.bh.avg} │ ${resultData.koe.de.avg} │ ${resultData.koe.dh.avg} │ ${resultData.koe.dl.avg} │ ${resultData.koe.eos.avg} │ ${resultData.koe.he.avg} │ ${resultData.koe.id.avg} │ \x1b[47m${resultData.koe.koe.avg}\x1b[0m │ ${resultData.koe.ok.avg} │ ${resultData.koe.ong.avg} │ ${resultData.koe.sa.avg} │ ${resultData.koe.se.avg} │ ${resultData.koe.ud.avg} │ ${resultData.koe.vc.avg} │ ${resultData.koe.vs.avg} │ ${resultData.koe.wdg.avg} ┃ ${resultData.koe.all.first} │ ${resultData.koe.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ OK   ┃\x1b[1;106m  ${resultData.ok.all.avg} \x1b[0m│  ${resultData.ok.all.rank}  ┃ ${resultData.ok.bh.avg} │ ${resultData.ok.de.avg} │ ${resultData.ok.dh.avg} │ ${resultData.ok.dl.avg} │ ${resultData.ok.eos.avg} │ ${resultData.ok.he.avg} │ ${resultData.ok.id.avg} │ ${resultData.ok.koe.avg} │ \x1b[47m${resultData.ok.ok.avg}\x1b[0m │ ${resultData.ok.ong.avg} │ ${resultData.ok.sa.avg} │ ${resultData.ok.se.avg} │ ${resultData.ok.ud.avg} │ ${resultData.ok.vc.avg} │ ${resultData.ok.vs.avg} │ ${resultData.ok.wdg.avg} ┃ ${resultData.ok.all.first} │ ${resultData.ok.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ OnG  ┃\x1b[1;106m  ${resultData.ong.all.avg} \x1b[0m│  ${resultData.ong.all.rank}  ┃ ${resultData.ong.bh.avg} │ ${resultData.ong.de.avg} │ ${resultData.ong.dh.avg} │ ${resultData.ong.dl.avg} │ ${resultData.ong.eos.avg} │ ${resultData.ong.he.avg} │ ${resultData.ong.id.avg} │ ${resultData.ong.koe.avg} │ ${resultData.ong.ok.avg} │ \x1b[47m${resultData.ong.ong.avg}\x1b[0m │ ${resultData.ong.sa.avg} │ ${resultData.ong.se.avg} │ ${resultData.ong.ud.avg} │ ${resultData.ong.vc.avg} │ ${resultData.ong.vs.avg} │ ${resultData.ong.wdg.avg} ┃ ${resultData.ong.all.first} │ ${resultData.ong.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ SA   ┃\x1b[1;106m  ${resultData.sa.all.avg} \x1b[0m│  ${resultData.sa.all.rank}  ┃ ${resultData.sa.bh.avg} │ ${resultData.sa.de.avg} │ ${resultData.sa.dh.avg} │ ${resultData.sa.dl.avg} │ ${resultData.sa.eos.avg} │ ${resultData.sa.he.avg} │ ${resultData.sa.id.avg} │ ${resultData.sa.koe.avg} │ ${resultData.sa.ok.avg} │ ${resultData.sa.ong.avg} │ \x1b[47m${resultData.sa.sa.avg}\x1b[0m │ ${resultData.sa.se.avg} │ ${resultData.sa.ud.avg} │ ${resultData.sa.vc.avg} │ ${resultData.sa.vs.avg} │ ${resultData.sa.wdg.avg} ┃ ${resultData.sa.all.first} │ ${resultData.sa.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ SE   ┃\x1b[1;106m  ${resultData.se.all.avg} \x1b[0m│  ${resultData.se.all.rank}  ┃ ${resultData.se.bh.avg} │ ${resultData.se.de.avg} │ ${resultData.se.dh.avg} │ ${resultData.se.dl.avg} │ ${resultData.se.eos.avg} │ ${resultData.se.he.avg} │ ${resultData.se.id.avg} │ ${resultData.se.koe.avg} │ ${resultData.se.ok.avg} │ ${resultData.se.ong.avg} │ ${resultData.se.sa.avg} │ \x1b[47m${resultData.se.se.avg}\x1b[0m │ ${resultData.se.ud.avg} │ ${resultData.se.vc.avg} │ ${resultData.se.vs.avg} │ ${resultData.se.wdg.avg} ┃ ${resultData.se.all.first} │ ${resultData.se.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ UD   ┃\x1b[1;106m  ${resultData.ud.all.avg} \x1b[0m│  ${resultData.ud.all.rank}  ┃ ${resultData.ud.bh.avg} │ ${resultData.ud.de.avg} │ ${resultData.ud.dh.avg} │ ${resultData.ud.dl.avg} │ ${resultData.ud.eos.avg} │ ${resultData.ud.he.avg} │ ${resultData.ud.id.avg} │ ${resultData.ud.koe.avg} │ ${resultData.ud.ok.avg} │ ${resultData.ud.ong.avg} │ ${resultData.ud.sa.avg} │ ${resultData.ud.se.avg} │ \x1b[47m${resultData.ud.ud.avg}\x1b[0m │ ${resultData.ud.vc.avg} │ ${resultData.ud.vs.avg} │ ${resultData.ud.wdg.avg} ┃ ${resultData.ud.all.first} │ ${resultData.ud.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ VC   ┃\x1b[1;106m  ${resultData.vc.all.avg} \x1b[0m│  ${resultData.vc.all.rank}  ┃ ${resultData.vc.bh.avg} │ ${resultData.vc.de.avg} │ ${resultData.vc.dh.avg} │ ${resultData.vc.dl.avg} │ ${resultData.vc.eos.avg} │ ${resultData.vc.he.avg} │ ${resultData.vc.id.avg} │ ${resultData.vc.koe.avg} │ ${resultData.vc.ok.avg} │ ${resultData.vc.ong.avg} │ ${resultData.vc.sa.avg} │ ${resultData.vc.se.avg} │ ${resultData.vc.ud.avg} │ \x1b[47m${resultData.vc.vc.avg}\x1b[0m │ ${resultData.vc.vs.avg} │ ${resultData.vc.wdg.avg} ┃ ${resultData.vc.all.first} │ ${resultData.vc.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ VS   ┃\x1b[1;106m  ${resultData.vs.all.avg} \x1b[0m│  ${resultData.vs.all.rank}  ┃ ${resultData.vs.bh.avg} │ ${resultData.vs.de.avg} │ ${resultData.vs.dh.avg} │ ${resultData.vs.dl.avg} │ ${resultData.vs.eos.avg} │ ${resultData.vs.he.avg} │ ${resultData.vs.id.avg} │ ${resultData.vs.koe.avg} │ ${resultData.vs.ok.avg} │ ${resultData.vs.ong.avg} │ ${resultData.vs.sa.avg} │ ${resultData.vs.se.avg} │ ${resultData.vs.ud.avg} │ ${resultData.vs.vc.avg} │ \x1b[47m${resultData.vs.vs.avg}\x1b[0m │ ${resultData.vs.wdg.avg} ┃ ${resultData.vs.all.first} │ ${resultData.vs.all.second} ┃`);
  console.log(emptyLine);
  console.log(`┃ WDG  ┃\x1b[1;106m  ${resultData.wdg.all.avg} \x1b[0m│  ${resultData.wdg.all.rank}  ┃ ${resultData.wdg.bh.avg} │ ${resultData.wdg.de.avg} │ ${resultData.wdg.dh.avg} │ ${resultData.wdg.dl.avg} │ ${resultData.wdg.eos.avg} │ ${resultData.wdg.he.avg} │ ${resultData.wdg.id.avg} │ ${resultData.wdg.koe.avg} │ ${resultData.wdg.ok.avg} │ ${resultData.wdg.ong.avg} │ ${resultData.wdg.sa.avg} │ ${resultData.wdg.se.avg} │ ${resultData.wdg.ud.avg} │ ${resultData.wdg.vc.avg} │ ${resultData.wdg.vs.avg} │ \x1b[47m${resultData.wdg.wdg.avg}\x1b[0m ┃ ${resultData.wdg.all.first} │ ${resultData.wdg.all.second} ┃`);
  console.log(`┗━━━━━━┻━━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━┛`);

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mTournament Type: ${(args.type || 'Single').padEnd(43, " ") } – Number of Games\x1b[0m                                              ┃`);
  console.log(`┣━━━━━━┳━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┫`);
  console.log(`┃GAMES ┃ Total┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃`);
  console.log(`┣━━━━━━╋━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┫`);

  const emptyLineGames = `┃      ┃      ┃      │      │      │      │      │      │      │      │      │      │      │      │      │      │      │      ┃`;
  for(let army in resultData) {
    console.log(`┃  ${army.toUpperCase().padEnd(3, " ")} ┃ ${resultData[army].all.count} ┃ ${resultData[army][army].count} │ ${resultData[army].de.count} │ ${resultData[army].dh.count} │ ${resultData[army].dl.count} │ ${resultData[army].eos.count} │ ${resultData[army].he.count} │ ${resultData[army].id.count} │ ${resultData[army].koe.count} │ ${resultData[army].ok.count} │ ${resultData[army].ong.count} │ ${resultData[army].sa.count} │ ${resultData[army].se.count} │ ${resultData[army].ud.count} │ ${resultData[army].vc.count} │ ${resultData[army].vs.count} │ ${resultData[army].wdg.count} ┃`);
    if(army !== "wdg") {
      console.log(emptyLineGames);
    }
  }
  console.log(`┗━━━━━━┻━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┛`);
}


function printUnitPickRates() {

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mAmount of Core by Army                       \x1b[0m┃`);
  console.log(`┣━━━━━━━━━━━━━━┯━━━━━━━┯━━━━━━━┯━━━━━━━┯━━━━━━━┫`);
  console.log(`┃ Army         │ Error │  Min  │ 5-15% │  >15% ┃`);
  console.log(`┣━━━━━━━━━━━━━━┿━━━━━━━┿━━━━━━━┿━━━━━━━┿━━━━━━━┫`);
  
  for(let army in rawData.byArmy) {
    let minCore = army === "bh" || army === "wdg" ? 800 : 1000;
    let erroneous = rawData.byArmy[army].core.filter(c => c < minCore).length.toString().padStart(5, " ");
    let minimum = rawData.byArmy[army].core.filter(c => c >= minCore && c < minCore*1.05).length.toString().padStart(5, " ");
    let more = rawData.byArmy[army].core.filter(c => c >= minCore*1.05 && c < minCore*1.15).length.toString().padStart(5, " ");
    let muchMore = rawData.byArmy[army].core.filter(c => c >= minCore*1.15).length.toString().padStart(5, " ");
    // console.log(`${army} - ${JSON.stringify(rawData.byArmy[army].core, null, 4)}`);
    console.log(`┃ ${army.toUpperCase().padEnd(3, " ")}          │ ${erroneous} │ ${minimum} │ ${more} │ ${muchMore} ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━┷━━━━━━━┷━━━━━━━┷━━━━━━━┷━━━━━━━┛`);

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ \x1b[1mSpecial Items – Global Pick Counts                                 \x1b[0m  ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━┯━━━━━━━━┫`);
  console.log(`┃ Category            │ Item Name                    │   #    │   %    ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━┿━━━━━━━━┫`);
  
  for(let item of arcCompCommon.weapon) {
    console.log(`┃ Common Weapon       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of sharedWeapon) {
    console.log(`┃ Shared Weapon       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.armour) {
    console.log(`┃ Common Armour       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of sharedArmour) {
    console.log(`┃ Shared Armour       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.shield) {
    console.log(`┃ Common Shield       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of sharedShield) {
    console.log(`┃ Shared Shield       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.artefact) {
    console.log(`┃ Common Artefact     │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of sharedArtefact) {
    console.log(`┃ Shared Artefact     │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.potion) {
    console.log(`┃ Common Potion       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of sharedPotion) {
    console.log(`┃ Shared Potion       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of arcCompCommon.banner) {
    console.log(`┃ Common Banner       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┃                     │                              │        │        ┃`);

  for(let item of sharedBanner) {
    console.log(`┃ Shared Banner       │ ${item.padEnd(28, " ")} │  ${(rawData.global.specialItems[item] || 0).toString().padStart(4, " ")}  │  ${((rawData.global.specialItems[item] || 0)*50/rawData.global.gamesCount).toFixed(0).padStart(3, " ")}%  ┃`);
  }
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━┷━━━━━━━━┛`);


  for(let army in pickRates) {
    const armyUnits = require("./units.js")[army];
    let lastCategory = armyUnits[0].category;
    // console.log(JSON.stringify(armyUnits, null, 4));

    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┓`);
    console.log(`┃ \x1b[1mCategory                   │ ${army.padEnd(3, " ")} - Units                        ┃    Ø     ┃  1   │  2   │  3   │  4+  │ ØPts \x1b[0m┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┫`);

    for(let unitDefinition of armyUnits) {
      if(unitDefinition.category !== lastCategory) {
        console.log(`┃                            │                                    ┃          ┃      │      │      │      │      ┃`);
      }
      console.log(`┃ ${unitDefinition.category.padEnd(26, " ")} │ ${unitDefinition.name.padEnd(34, " ")} ┃   ${pickRates[army].units?.[unitDefinition.name]?.picks.percent || "  0%"}   ┃ ${pickRates[army].units?.[unitDefinition.name]?.picks.rate1 || "  0%"} │ ${pickRates[army].units?.[unitDefinition.name]?.picks.rate2 || "  0%"} │ ${pickRates[army].units?.[unitDefinition.name]?.picks.rate3 || "  0%"} │ ${pickRates[army].units?.[unitDefinition.name]?.picks.rate4 || "  0%"} │ ${pickRates[army].units?.[unitDefinition.name]?.picks.points || "   0"} ┃`);
      lastCategory = unitDefinition.category;
    }

    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┛`);
    console.log(`\n`);

    console.log(`┏━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┓`);
    console.log(`┃ \x1b[1mCategory │ ${army.padEnd(3, " ")} - Special Items                ┃   #   │   %\x1b[0m   ┃`);
    console.log(`┣━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┫`);
    console.log(`┃ Common Items                                                  ┃`);
    console.log(`┣━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┫`);

    for(let category in arcCompCommon) {
      for(let item of arcCompCommon[category]) {
        let name = `${item.padEnd(34, " ")}`;
        let cat = `${category.padEnd(8, " ")}`;
        let count = `${pickRates[army].specialItems?.[item]?.count || 0}`.padStart(3, " ");
        let percent = `${(pickRates[army].specialItems?.[item]?.pickPercent || "0").padStart(4, " ")}%`;
        console.log(`┃ ${cat} │ ${name} ┃  ${count}  │ ${percent} ┃`);
      }
      console.log(`┃          │                                    ┃       │       ┃`)
    }

    console.log(`┣━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┫`);
    console.log(`┃ Shared Items                                                  ┃`);
    console.log(`┣━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┫`);

    const sharedItems = require("./specialItems.js").sharedItems;
    // console.log(JSON.stringify(sharedItems, null, 4));
    for(let category in sharedItems) {
      for(let item in sharedItems[category]) {
        if(sharedItems[category][item].includes(army)) {
          let name = `${item.padEnd(34, " ")}`;
          let cat = `${category.padEnd(8, " ")}`;
          let count = `${pickRates[army].specialItems?.[item]?.count || 0}`.padStart(3, " ");
          let percent = `${(pickRates[army].specialItems?.[item]?.pickPercent || "0").padStart(4, " ")}%`;
          console.log(`┃ ${cat} │ ${name} ┃  ${count}  │ ${percent} ┃`);
        }
      }
      if(category !== "banner" ) console.log(`┃          │                                    ┃       │       ┃`)
    }

    console.log(`┣━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┫`);
    console.log(`┃ Army Specific Items                                           ┃`);
    console.log(`┣━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┯━━━━━━━┫`);

    const armyItems = require("./specialItems.js")[army];
    for(let category in armyItems) {
      for(let item of armyItems[category]) {
        let name = `${item.padEnd(34, " ")}`;
        let cat = `${category.padEnd(8, " ")}`;
        let count = `${pickRates[army].specialItems?.[item]?.count || 0}`.padStart(3, " ");
        let percent = `${(pickRates[army].specialItems?.[item]?.pickPercent || "0").padStart(4, " ")}%`;
        console.log(`┃ ${cat} │ ${name} ┃  ${count}  │ ${percent} ┃`);
      }
      if(category !== "banner" ) console.log(`┃          │                                    ┃       │       ┃`)
    }
    console.log(`┗━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┷━━━━━━━┛`);
    console.log(`\n`);

  }
}

function printUnitOptionRates() {

  for(let army in pickRates) {
    for(let unit in pickRates[army].units) {
      console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
      console.log(`┃ \x1b[1mOptions: ${unit.padEnd(48, " ")}\x1b[0m ┃`);
      console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);

      for(let category in pickRates[army].units[unit].options) {
        console.log(`┃\x1b[34m ${category.padEnd(49, " ")}         \x1b[0m┃`);
        console.log(`┠───────────────────────────────────────────────────────────┨`);

        for(let option in pickRates[army].units[unit].options[category]) {
          console.log(`┃ ${option.padEnd(44, " ")} - ${pickRates[army].units[unit].options[category][option].padEnd(10, " ")} ┃`);
        }
        if(category !== "banner" ) console.log(`┠───────────────────────────────────────────────────────────┨`);
      }
      console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    }
  }
}

function printPricingActions() {
  for(let army of armies) {
    // console.log(JSON.stringify(pickRates[army].pricing, null, 4));

    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
    console.log(`┃\x1b[101m Pricing Relevant Metrics: ${army.padEnd(3, " ")} - Items                             \x1b[0m┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
    console.log(`┃ Army wide counts                                                  ┃`);
    console.log(`┠───────────────────────────────────────────────────────────────────┨`);
    console.log(`┃ Army specific items ${pickRates[army].pricing.items.count.army.toString().padStart(40, " ")}      ┃`);
    console.log(`┃ Arcane compendium items ${pickRates[army].pricing.items.count.global.toString().padStart(36, " ")}      ┃`);
    console.log(`┃ Absolute army:global factor ${(pickRates[army].pricing.items.count.army / pickRates[army].pricing.items.count.global).toFixed(1).padStart(34, " ")}    ┃`);
    console.log(`┃ Adjusted army:global factor ${pickRates[army].pricing.items.count.factor.toFixed(1).padStart(34, " ")}    ┃`);

    let problems = Object.values(pickRates[army].pricing.items.problems).flat();

    if(problems.length > 0) {
      console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
      console.log(`┃ Problematic items (overshadowing army items)                      ┃`);
      console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━┯━━━━━━━┫`);
      console.log(`┃ Name                        │ Source │   Type   │    #    │   %   ┃`); 
      console.log(`┠─────────────────────────────┼────────┼──────────┼─────────┼───────┨`);
      for(let problem of problems) {
        console.log(`┃ ${problem.name.padEnd(27, " ")} │ ${problem.source.padEnd(6, " ")} │ ${problem.type.padEnd(8, " ")} │ ${problem.count.toString().padStart(5, " ")}   │  ${problem.pickPercent.toString().padStart(3, " ")}% ┃`);
        
      }
      console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━┷━━━━━━━┛`);
    } else {
      console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    }
    


  }

}
