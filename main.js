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

const superagent = require('superagent');
const args = require('yargs').argv;
const specialItemNames = require('./specialItems.js').allItems;
const commonItemNames = require('./specialItems.js').arcCompCommon;
const options = require('./options.js');

const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

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

    let allGames = Object.values(armyResults[armyId]).flat();
    let allGamesCount = allGames.length;
    let allGamesAvg = (allGames.reduce((a,b) => a+b, 0) / allGamesCount).toFixed(1).padStart(4, " ");

    resultData[armyString].all.avg = allGamesAvg;
    resultData[armyString].all.count = `${allGamesCount}`.padStart(4, " ");

    // Raw Data stuff
    rawData[armyString].games.playedGames = allGamesCount;

    for (let oppoArmyId in armyResults[armyId]) {
      let oppoArmyString = getArmyStringForId(oppoArmyId, false);

      let vsArmyGames = Object.values(armyResults[armyId][oppoArmyId]);
      let vsArmyCount = vsArmyGames.length;
      let vsArmyAvg = (vsArmyGames.reduce((a,b) => a+b, 0) / vsArmyCount).toFixed(1).padStart(4, " ");

      resultData[armyString][oppoArmyString].avg = vsArmyAvg || "----";
      resultData[armyString][oppoArmyString].count = `${vsArmyCount}`.padStart(4, " ") || "   0";

      // Possibly add the opponent data to rawData here, if needed
    }
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
      rawData[armyString] = rawData[armyString] || {};
      rawData[armyString].games.missingLists++;
    } else {
      let armyString = getArmyStringForId(player.id_book, null);
      // Count the number of lists we have data for
      rawData[armyString].games.availableLists++;

      // Add pick rates of units to overall result object
      for(let entry in player.report_list.units) {
        // Create if missing
        rawData[armyString].picks = rawData[armyString].picks || {};
        rawData[armyString].picks[entry.toLowerCase()] = rawData[armyString].picks[entry.toLowerCase()] || {};
        rawData[armyString].picks[entry.toLowerCase()].base = rawData[armyString].picks[entry.toLowerCase()].base || [];
        rawData[armyString].picks[entry.toLowerCase()].base.push(player.report_list.units[entry].length);
      }

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
            rawData[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()] = rawData[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()] || [];
            rawData[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()].push(optionEntry.amount);
          }
        }
      }
    }
  }
}

function calculatePickRates() {
  // Iterate per army
  for(let army in rawData) {
    // Create data structure for special items, if not already there
    pickRates[army].specialItems = pickRates[army].specialItems || {};
    pickRates[army].units = pickRates[army].units || {};
    // Iterate per unit
    for(let unit in rawData[army].picks) {
      // Pick Rate for unit
      // TODO For all pick rates => convert into an object with count and percentage
      let pickSum = rawData[army].picks[unit].base.reduce((a, b) => a + b, 0);
      let pickPercent = `${(pickSum * 100 / rawData[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      let pickRateOnce = 0;
      let pickRateTwice = 0;
      let pickRateThrice = 0;
      let pickRateFourOrMore = 0;
      for(let value of rawData[army].picks[unit].base) {
        if(value === 1) pickRateOnce++;
        if(value === 2) pickRateTwice++;
        if(value === 3) pickRateThrice++;
        if(value > 3) pickRateFourOrMore++;
      }
      pickRateOnce = `${(pickRateOnce * 100 / rawData[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateTwice = `${(pickRateTwice * 100 / rawData[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateThrice = `${(pickRateThrice * 100 / rawData[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateFourOrMore = `${(pickRateFourOrMore * 100 / rawData[army].games.availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRates[army].units[unit] = pickRates[army][unit] || {};
      pickRates[army].units[unit].picks = pickRates[army].units[unit].picks || {};
      pickRates[army].units[unit].options = pickRates[army].units[unit].options || {};
      pickRates[army].units[unit].picks.times = pickSum;
      pickRates[army].units[unit].picks.percent = pickPercent;
      pickRates[army].units[unit].picks.rate1 = pickRateOnce;
      pickRates[army].units[unit].picks.rate2 = pickRateTwice;
      pickRates[army].units[unit].picks.rate3 = pickRateThrice;
      pickRates[army].units[unit].picks.rate4 = pickRateFourOrMore;

      // Pick Rate for Options
      for(let option in rawData[army].picks[unit]) {
        if(option === 'base') {
          continue;
        }
        else if(option === 'models') {
          const armyUnits = require("./units.js")[army];
          pickRates[army].units[unit].options.models = pickRates[army].units[unit].options.models || {};
          pickRates[army].units[unit].options.models.Ø = `${(rawData[army].picks[unit][option].reduce((a,b)=>a+b,0) / pickSum).toFixed(1).padStart(4, " ")}`;
          // console.log(`unit ${unit}`);
          // TODO Remove conditional chaining here, to find all missing or problematic unit entries
          let min = armyUnits.find((e) => e.name === unit)?.min;
          let max = armyUnits.find((e) => e.name === unit)?.max;
          if(min && max) {
            let smallUntil = Math.floor(min + (max-min)/4);
            let mediumUntil = Math.floor(min + (max-min)*2/3);

            pickRates[army].units[unit].options.models.small = `${(rawData[army].picks[unit][option].filter((a)=>a<=smallUntil).length * 100 / pickSum).toFixed(0).padStart(3, " ")}%`;
            pickRates[army].units[unit].options.models.medium = `${(rawData[army].picks[unit][option].filter((a)=>a>smallUntil && a<=mediumUntil).length * 100 / pickSum).toFixed(0).padStart(3, " ")}%`;
            pickRates[army].units[unit].options.models.large = `${(rawData[army].picks[unit][option].filter((a)=>a>mediumUntil).length * 100 / pickSum).toFixed(0).padStart(3, " ")}%`;
          }
        } else {
          // Sort the options into the appropriate category
          if(options.meleeWeapons.includes(option)) {
            pickRates[army].units[unit].options.meleeWeapons = pickRates[army].units[unit].options.meleeWeapons || {};
            pickRates[army].units[unit].options.meleeWeapons[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.shootingWeapons.includes(option)) {
            pickRates[army].units[unit].options.shootingWeapons = pickRates[army].units[unit].options.shootingWeapons || {};
            pickRates[army].units[unit].options.shootingWeapons[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.commandGroup.includes(option)) {
            pickRates[army].units[unit].options.commandGroup = pickRates[army].units[unit].options.commandGroup || {};
            pickRates[army].units[unit].options.commandGroup[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.wizardLevels.includes(option)) {
            pickRates[army].units[unit].options.wizardLevels = pickRates[army].units[unit].options.wizardLevels || {};
            pickRates[army].units[unit].options.wizardLevels[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.paths.includes(option)) {
            pickRates[army].units[unit].options.paths = pickRates[army].units[unit].options.paths || {};
            pickRates[army].units[unit].options.paths[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.spells.includes(option)) {
            // Skip, tracking spells is useless
          } else if(options.leadership.includes(option)) {
            pickRates[army].units[unit].options.leadership = pickRates[army].units[unit].options.leadership || {};
            pickRates[army].units[unit].options.leadership[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.armour.includes(option)) {
            pickRates[army].units[unit].options.armour = pickRates[army].units[unit].options.armour || {};
            pickRates[army].units[unit].options.armour[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.specialistSkills.includes(option)) {
            pickRates[army].units[unit].options.specialistSkills = pickRates[army].units[unit].options.specialistSkills || {};
            pickRates[army].units[unit].options.specialistSkills[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.patronDeity.includes(option)) {
            pickRates[army].units[unit].options.patronDeity = pickRates[army].units[unit].options.patronDeity || {};
            pickRates[army].units[unit].options.patronDeity[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.house.includes(option)) {
            pickRates[army].units[unit].options.house = pickRates[army].units[unit].options.house || {};
            pickRates[army].units[unit].options.house[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.mortalOrigin.includes(option)) {
            pickRates[army].units[unit].options.mortalOrigin = pickRates[army].units[unit].options.mortalOrigin || {};
            pickRates[army].units[unit].options.mortalOrigin[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.favour.includes(option)) {
            pickRates[army].units[unit].options.favour = pickRates[army].units[unit].options.favour || {};
            pickRates[army].units[unit].options.favour[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.darkGodGift.includes(option)) {
            pickRates[army].units[unit].options.darkGodGift = pickRates[army].units[unit].options.darkGodGift || {};
            pickRates[army].units[unit].options.darkGodGift[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(options.mounts.includes(option)) {
            pickRates[army].units[unit].options.mounts = pickRates[army].units[unit].options.mounts || {};
            pickRates[army].units[unit].options.mounts[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          } else if(specialItemNames.includes(option)) {
            pickRates[army].units[unit].options.specialItems = pickRates[army].units[unit].options.specialItems || {};
            pickRates[army].units[unit].options.specialItems[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
          }
          // "other" as a catch all
          else {
            pickRates[army].units[unit].options.other = pickRates[army].units[unit].options.other || {};
            pickRates[army].units[unit].options.other[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;

          }
          // pickRates[army].units[unit].options[option] = `${(rawData[army].picks[unit][option].length * 100 / pickSum).toFixed(0)}%`;
        }

        // Handle Special Items
        if(specialItemNames.includes(option)) {
          pickRates[army].specialItems[option] = pickRates[army].specialItems[option] || { "count" : 0, "pickPercent" : "" };
          pickRates[army].specialItems[option].count = pickRates[army].specialItems[option].count + rawData[army].picks[unit][option].reduce((a,b)=>a+b,0);
          pickRates[army].specialItems[option].pickPercent = `${(pickRates[army].specialItems[option].count * 100 / rawData[army].games.availableLists).toFixed(0)}`;
        }
      }
    }
  }
}



(async () => {
  try {
    // Evaluate Command Line Arguments
    const debug = args.d ? true : false;
    if(debug) console.log(args);
    const tournamentType = args.type || 'single';
    const showExternalBalance = args.e ? true : false;
    const showPickRates = args.p ? true : false;
    const showRawData = args.r ? true : false;
    const showOptionRates = args.o ? true : false;
    const minParticipants = args.minParticipants ? args.minParticipants : 0;
    const start = args.start || '2025-01-22';
    const end = args.end || today;

    const tournamentsResponse = await superagent
    .post('https://www.newrecruit.eu/api/tournaments')
    .send({ "start": start, "end": end })
    .set("accept", "json")
    .set("user-agent", "t9a-data/0.0.1")

    let data;
    let totalAmountOfGames = 0;

    if(tournamentType === 'single') {
      data = tournamentsResponse.body.filter((tournament) => tournament.id_game_system === 6 && tournament.status === 3 && tournament.type === 0 && tournament.scoring_system === 11 && tournament.participants >= minParticipants);
    } else if(tournamentType === 'teams') {
      data = tournamentsResponse.body.filter((tournament) => tournament.id_game_system === 6 && tournament.status === 3 && tournament.type === 1 && tournament.scoring_system === 11 && tournament.participants >= minParticipants);
    } else if(tournamentType === 'all') {
      data = tournamentsResponse.body.filter((tournament) => tournament.id_game_system === 6 && tournament.status === 3 && tournament.scoring_system === 11 && tournament.participants >= minParticipants);
    } else {
      console.log(`Error: Tournament Type of ${tournamentType} is not supported. Use 'single', 'teams', or 'all'`);
      process.exit(1);
    }

    let amountOfTournaments = data.length;
    let armyResults = { };

    for(let t of data) {
      if(debug) console.log(`Assessing tournament: ${t.name}`);
      const reportsResponse = await superagent
      .post('https://www.newrecruit.eu/api/reports')
      .send({ "id_tournament": t._id })
      .set("accept", "json")
      .set("user-agent", "t9a-data/0.0.1");

      const validResults = reportsResponse.body.filter((r) => r.handshake === false && typeof r.players[0].id_book === "number" && typeof r.players[1].id_book === "number");
      if(debug) console.log(`Filtered out ${reportsResponse.body.length - validResults.length} invalid reports`);

      for(let result of validResults) {
        totalAmountOfGames++;
        if(debug) {
          console.log(`Game Result: Army '${result.players[0].id_book}' vs Army '${result.players[1].id_book}' → ${result.score[0].BPObj} : ${result.score[1].BPObj}`);
          console.log(`Game Result: List ${result.players[0].exported_list} vs Army ${result.players[1].exported_list}`);
          console.log(`Game Result: Score ${JSON.stringify(result.score, null, 4)}`);
          // console.log(`Game Result: ${JSON.stringify(result.players[0].report_list, null, 4)}`);
        }

        /** GAME RESULT **/
        // Add new entries, if they do not exist yet
        armyResults[result.players[0].id_book] = armyResults[result.players[0].id_book] || {};
        armyResults[result.players[1].id_book] = armyResults[result.players[1].id_book] || {};
        armyResults[result.players[0].id_book][result.players[1].id_book] = armyResults[result.players[0].id_book][result.players[1].id_book] || [];
        armyResults[result.players[1].id_book][result.players[0].id_book] = armyResults[result.players[1].id_book][result.players[0].id_book] || [];

        // Push actual result
        armyResults[result.players[0].id_book][result.players[1].id_book].push(result.score[0].BPObj);
        armyResults[result.players[1].id_book][result.players[0].id_book].push(result.score[1].BPObj);

        /** LIST ANALYSIS */
        addListsToAnalysis(result);
      }
    }
    printMetaData(`${amountOfTournaments}`, `${totalAmountOfGames}`, start, end);
    calculateArmyResults(armyResults);
    if(showExternalBalance) printArmyResults();
    calculatePickRates();
    if(showPickRates) printUnitPickRates();
    if(showOptionRates) printUnitOptionRates();
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

function printMetaData(tournaments, games, start, end) {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ T9A Data Tool Meta Data                                                     ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Tournaments in Calculation: ${tournaments.padEnd(6, " ")}                                          ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Total amount of games: ${games.padEnd(5, " ")}                                                ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃ Time frame from ${start} until ${end}                                  ┃`);
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);

}

function printArmyResults() {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Tournament Type: ${(args.type || 'Single').padEnd(43, " ") } – Average Points                                               ┃`);
  console.log(`┣━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┳━━━━━━┫`);
  console.log(`┃POINTS┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃ Total┃`);
  console.log(`┣━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━╋━━━━━━┫`);
  console.log(`┃ BH   ┃ ${resultData.bh.bh.avg} │ ${resultData.bh.de.avg} │ ${resultData.bh.dh.avg} │ ${resultData.bh.dl.avg} │ ${resultData.bh.eos.avg} │ ${resultData.bh.he.avg} │ ${resultData.bh.id.avg} │ ${resultData.bh.koe.avg} │ ${resultData.bh.ok.avg} │ ${resultData.bh.ong.avg} │ ${resultData.bh.sa.avg} │ ${resultData.bh.se.avg} │ ${resultData.bh.ud.avg} │ ${resultData.bh.vc.avg} │ ${resultData.bh.vs.avg} │ ${resultData.bh.wdg.avg} ┃ ${resultData.bh.all.avg} ┃`);
  console.log(`┃ DE   ┃ ${resultData.de.bh.avg} │ ${resultData.de.de.avg} │ ${resultData.de.dh.avg} │ ${resultData.de.dl.avg} │ ${resultData.de.eos.avg} │ ${resultData.de.he.avg} │ ${resultData.de.id.avg} │ ${resultData.de.koe.avg} │ ${resultData.de.ok.avg} │ ${resultData.de.ong.avg} │ ${resultData.de.sa.avg} │ ${resultData.de.se.avg} │ ${resultData.de.ud.avg} │ ${resultData.de.vc.avg} │ ${resultData.de.vs.avg} │ ${resultData.de.wdg.avg} ┃ ${resultData.de.all.avg} ┃`);
  console.log(`┃ DH   ┃ ${resultData.dh.bh.avg} │ ${resultData.dh.de.avg} │ ${resultData.dh.dh.avg} │ ${resultData.dh.dl.avg} │ ${resultData.dh.eos.avg} │ ${resultData.dh.he.avg} │ ${resultData.dh.id.avg} │ ${resultData.dh.koe.avg} │ ${resultData.dh.ok.avg} │ ${resultData.dh.ong.avg} │ ${resultData.dh.sa.avg} │ ${resultData.dh.se.avg} │ ${resultData.dh.ud.avg} │ ${resultData.dh.vc.avg} │ ${resultData.dh.vs.avg} │ ${resultData.dh.wdg.avg} ┃ ${resultData.dh.all.avg} ┃`);
  console.log(`┃ DL   ┃ ${resultData.dl.bh.avg} │ ${resultData.dl.de.avg} │ ${resultData.dl.dh.avg} │ ${resultData.dl.dl.avg} │ ${resultData.dl.eos.avg} │ ${resultData.dl.he.avg} │ ${resultData.dl.id.avg} │ ${resultData.dl.koe.avg} │ ${resultData.dl.ok.avg} │ ${resultData.dl.ong.avg} │ ${resultData.dl.sa.avg} │ ${resultData.dl.se.avg} │ ${resultData.dl.ud.avg} │ ${resultData.dl.vc.avg} │ ${resultData.dl.vs.avg} │ ${resultData.dl.wdg.avg} ┃ ${resultData.dl.all.avg} ┃`);
  console.log(`┃ EoS  ┃ ${resultData.eos.bh.avg} │ ${resultData.eos.de.avg} │ ${resultData.eos.dh.avg} │ ${resultData.eos.dl.avg} │ ${resultData.eos.eos.avg} │ ${resultData.eos.he.avg} │ ${resultData.eos.id.avg} │ ${resultData.eos.koe.avg} │ ${resultData.eos.ok.avg} │ ${resultData.eos.ong.avg} │ ${resultData.eos.sa.avg} │ ${resultData.eos.se.avg} │ ${resultData.eos.ud.avg} │ ${resultData.eos.vc.avg} │ ${resultData.eos.vs.avg} │ ${resultData.eos.wdg.avg} ┃ ${resultData.eos.all.avg} ┃`);
  console.log(`┃ HE   ┃ ${resultData.he.bh.avg} │ ${resultData.he.de.avg} │ ${resultData.he.dh.avg} │ ${resultData.he.dl.avg} │ ${resultData.he.eos.avg} │ ${resultData.he.he.avg} │ ${resultData.he.id.avg} │ ${resultData.he.koe.avg} │ ${resultData.he.ok.avg} │ ${resultData.he.ong.avg} │ ${resultData.he.sa.avg} │ ${resultData.he.se.avg} │ ${resultData.he.ud.avg} │ ${resultData.he.vc.avg} │ ${resultData.he.vs.avg} │ ${resultData.he.wdg.avg} ┃ ${resultData.he.all.avg} ┃`);
  console.log(`┃ ID   ┃ ${resultData.id.bh.avg} │ ${resultData.id.de.avg} │ ${resultData.id.dh.avg} │ ${resultData.id.dl.avg} │ ${resultData.id.eos.avg} │ ${resultData.id.he.avg} │ ${resultData.id.id.avg} │ ${resultData.id.koe.avg} │ ${resultData.id.ok.avg} │ ${resultData.id.ong.avg} │ ${resultData.id.sa.avg} │ ${resultData.id.se.avg} │ ${resultData.id.ud.avg} │ ${resultData.id.vc.avg} │ ${resultData.id.vs.avg} │ ${resultData.id.wdg.avg} ┃ ${resultData.id.all.avg} ┃`);
  console.log(`┃ KoE  ┃ ${resultData.koe.bh.avg} │ ${resultData.koe.de.avg} │ ${resultData.koe.dh.avg} │ ${resultData.koe.dl.avg} │ ${resultData.koe.eos.avg} │ ${resultData.koe.he.avg} │ ${resultData.koe.id.avg} │ ${resultData.koe.koe.avg} │ ${resultData.koe.ok.avg} │ ${resultData.koe.ong.avg} │ ${resultData.koe.sa.avg} │ ${resultData.koe.se.avg} │ ${resultData.koe.ud.avg} │ ${resultData.koe.vc.avg} │ ${resultData.koe.vs.avg} │ ${resultData.koe.wdg.avg} ┃ ${resultData.koe.all.avg} ┃`);
  console.log(`┃ OK   ┃ ${resultData.ok.bh.avg} │ ${resultData.ok.de.avg} │ ${resultData.ok.dh.avg} │ ${resultData.ok.dl.avg} │ ${resultData.ok.eos.avg} │ ${resultData.ok.he.avg} │ ${resultData.ok.id.avg} │ ${resultData.ok.koe.avg} │ ${resultData.ok.ok.avg} │ ${resultData.ok.ong.avg} │ ${resultData.ok.sa.avg} │ ${resultData.ok.se.avg} │ ${resultData.ok.ud.avg} │ ${resultData.ok.vc.avg} │ ${resultData.ok.vs.avg} │ ${resultData.ok.wdg.avg} ┃ ${resultData.ok.all.avg} ┃`);
  console.log(`┃ OnG  ┃ ${resultData.ong.bh.avg} │ ${resultData.ong.de.avg} │ ${resultData.ong.dh.avg} │ ${resultData.ong.dl.avg} │ ${resultData.ong.eos.avg} │ ${resultData.ong.he.avg} │ ${resultData.ong.id.avg} │ ${resultData.ong.koe.avg} │ ${resultData.ong.ok.avg} │ ${resultData.ong.ong.avg} │ ${resultData.ong.sa.avg} │ ${resultData.ong.se.avg} │ ${resultData.ong.ud.avg} │ ${resultData.ong.vc.avg} │ ${resultData.ong.vs.avg} │ ${resultData.ong.wdg.avg} ┃ ${resultData.ong.all.avg} ┃`);
  console.log(`┃ SA   ┃ ${resultData.sa.bh.avg} │ ${resultData.sa.de.avg} │ ${resultData.sa.dh.avg} │ ${resultData.sa.dl.avg} │ ${resultData.sa.eos.avg} │ ${resultData.sa.he.avg} │ ${resultData.sa.id.avg} │ ${resultData.sa.koe.avg} │ ${resultData.sa.ok.avg} │ ${resultData.sa.ong.avg} │ ${resultData.sa.sa.avg} │ ${resultData.sa.se.avg} │ ${resultData.sa.ud.avg} │ ${resultData.sa.vc.avg} │ ${resultData.sa.vs.avg} │ ${resultData.sa.wdg.avg} ┃ ${resultData.sa.all.avg} ┃`);
  console.log(`┃ SE   ┃ ${resultData.se.bh.avg} │ ${resultData.se.de.avg} │ ${resultData.se.dh.avg} │ ${resultData.se.dl.avg} │ ${resultData.se.eos.avg} │ ${resultData.se.he.avg} │ ${resultData.se.id.avg} │ ${resultData.se.koe.avg} │ ${resultData.se.ok.avg} │ ${resultData.se.ong.avg} │ ${resultData.se.sa.avg} │ ${resultData.se.se.avg} │ ${resultData.se.ud.avg} │ ${resultData.se.vc.avg} │ ${resultData.se.vs.avg} │ ${resultData.se.wdg.avg} ┃ ${resultData.se.all.avg} ┃`);
  console.log(`┃ UD   ┃ ${resultData.ud.bh.avg} │ ${resultData.ud.de.avg} │ ${resultData.ud.dh.avg} │ ${resultData.ud.dl.avg} │ ${resultData.ud.eos.avg} │ ${resultData.ud.he.avg} │ ${resultData.ud.id.avg} │ ${resultData.ud.koe.avg} │ ${resultData.ud.ok.avg} │ ${resultData.ud.ong.avg} │ ${resultData.ud.sa.avg} │ ${resultData.ud.se.avg} │ ${resultData.ud.ud.avg} │ ${resultData.ud.vc.avg} │ ${resultData.ud.vs.avg} │ ${resultData.ud.wdg.avg} ┃ ${resultData.ud.all.avg} ┃`);
  console.log(`┃ VC   ┃ ${resultData.vc.bh.avg} │ ${resultData.vc.de.avg} │ ${resultData.vc.dh.avg} │ ${resultData.vc.dl.avg} │ ${resultData.vc.eos.avg} │ ${resultData.vc.he.avg} │ ${resultData.vc.id.avg} │ ${resultData.vc.koe.avg} │ ${resultData.vc.ok.avg} │ ${resultData.vc.ong.avg} │ ${resultData.vc.sa.avg} │ ${resultData.vc.se.avg} │ ${resultData.vc.ud.avg} │ ${resultData.vc.vc.avg} │ ${resultData.vc.vs.avg} │ ${resultData.vc.wdg.avg} ┃ ${resultData.vc.all.avg} ┃`);
  console.log(`┃ VS   ┃ ${resultData.vs.bh.avg} │ ${resultData.vs.de.avg} │ ${resultData.vs.dh.avg} │ ${resultData.vs.dl.avg} │ ${resultData.vs.eos.avg} │ ${resultData.vs.he.avg} │ ${resultData.vs.id.avg} │ ${resultData.vs.koe.avg} │ ${resultData.vs.ok.avg} │ ${resultData.vs.ong.avg} │ ${resultData.vs.sa.avg} │ ${resultData.vs.se.avg} │ ${resultData.vs.ud.avg} │ ${resultData.vs.vc.avg} │ ${resultData.vs.vs.avg} │ ${resultData.vs.wdg.avg} ┃ ${resultData.vs.all.avg} ┃`);
  console.log(`┃ WDG  ┃ ${resultData.wdg.bh.avg} │ ${resultData.wdg.de.avg} │ ${resultData.wdg.dh.avg} │ ${resultData.wdg.dl.avg} │ ${resultData.wdg.eos.avg} │ ${resultData.wdg.he.avg} │ ${resultData.wdg.id.avg} │ ${resultData.wdg.koe.avg} │ ${resultData.wdg.ok.avg} │ ${resultData.wdg.ong.avg} │ ${resultData.wdg.sa.avg} │ ${resultData.wdg.se.avg} │ ${resultData.wdg.ud.avg} │ ${resultData.wdg.vc.avg} │ ${resultData.wdg.vs.avg} │ ${resultData.wdg.wdg.avg} ┃ ${resultData.wdg.all.avg} ┃`);
  console.log(`┗━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┻━━━━━━┛`);

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Tournament Type: ${(args.type || 'Single').padEnd(43, " ") } – Number of Games                                              ┃`);
  console.log(`┣━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┳━━━━━━┫`);
  console.log(`┃GAMES ┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃ Total┃`);
  console.log(`┣━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━╋━━━━━━┫`);
  console.log(`┃ BH   ┃ ${resultData.bh.bh.count} │ ${resultData.bh.de.count} │ ${resultData.bh.dh.count} │ ${resultData.bh.dl.count} │ ${resultData.bh.eos.count} │ ${resultData.bh.he.count} │ ${resultData.bh.id.count} │ ${resultData.bh.koe.count} │ ${resultData.bh.ok.count} │ ${resultData.bh.ong.count} │ ${resultData.bh.sa.count} │ ${resultData.bh.se.count} │ ${resultData.bh.ud.count} │ ${resultData.bh.vc.count} │ ${resultData.bh.vs.count} │ ${resultData.bh.wdg.count} ┃ ${resultData.bh.all.count} ┃`);
  console.log(`┃ DE   ┃ ${resultData.de.bh.count} │ ${resultData.de.de.count} │ ${resultData.de.dh.count} │ ${resultData.de.dl.count} │ ${resultData.de.eos.count} │ ${resultData.de.he.count} │ ${resultData.de.id.count} │ ${resultData.de.koe.count} │ ${resultData.de.ok.count} │ ${resultData.de.ong.count} │ ${resultData.de.sa.count} │ ${resultData.de.se.count} │ ${resultData.de.ud.count} │ ${resultData.de.vc.count} │ ${resultData.de.vs.count} │ ${resultData.de.wdg.count} ┃ ${resultData.de.all.count} ┃`);
  console.log(`┃ DH   ┃ ${resultData.dh.bh.count} │ ${resultData.dh.de.count} │ ${resultData.dh.dh.count} │ ${resultData.dh.dl.count} │ ${resultData.dh.eos.count} │ ${resultData.dh.he.count} │ ${resultData.dh.id.count} │ ${resultData.dh.koe.count} │ ${resultData.dh.ok.count} │ ${resultData.dh.ong.count} │ ${resultData.dh.sa.count} │ ${resultData.dh.se.count} │ ${resultData.dh.ud.count} │ ${resultData.dh.vc.count} │ ${resultData.dh.vs.count} │ ${resultData.dh.wdg.count} ┃ ${resultData.dh.all.count} ┃`);
  console.log(`┃ DL   ┃ ${resultData.dl.bh.count} │ ${resultData.dl.de.count} │ ${resultData.dl.dh.count} │ ${resultData.dl.dl.count} │ ${resultData.dl.eos.count} │ ${resultData.dl.he.count} │ ${resultData.dl.id.count} │ ${resultData.dl.koe.count} │ ${resultData.dl.ok.count} │ ${resultData.dl.ong.count} │ ${resultData.dl.sa.count} │ ${resultData.dl.se.count} │ ${resultData.dl.ud.count} │ ${resultData.dl.vc.count} │ ${resultData.dl.vs.count} │ ${resultData.dl.wdg.count} ┃ ${resultData.dl.all.count} ┃`);
  console.log(`┃ EoS  ┃ ${resultData.eos.bh.count} │ ${resultData.eos.de.count} │ ${resultData.eos.dh.count} │ ${resultData.eos.dl.count} │ ${resultData.eos.eos.count} │ ${resultData.eos.he.count} │ ${resultData.eos.id.count} │ ${resultData.eos.koe.count} │ ${resultData.eos.ok.count} │ ${resultData.eos.ong.count} │ ${resultData.eos.sa.count} │ ${resultData.eos.se.count} │ ${resultData.eos.ud.count} │ ${resultData.eos.vc.count} │ ${resultData.eos.vs.count} │ ${resultData.eos.wdg.count} ┃ ${resultData.eos.all.count} ┃`);
  console.log(`┃ HE   ┃ ${resultData.he.bh.count} │ ${resultData.he.de.count} │ ${resultData.he.dh.count} │ ${resultData.he.dl.count} │ ${resultData.he.eos.count} │ ${resultData.he.he.count} │ ${resultData.he.id.count} │ ${resultData.he.koe.count} │ ${resultData.he.ok.count} │ ${resultData.he.ong.count} │ ${resultData.he.sa.count} │ ${resultData.he.se.count} │ ${resultData.he.ud.count} │ ${resultData.he.vc.count} │ ${resultData.he.vs.count} │ ${resultData.he.wdg.count} ┃ ${resultData.he.all.count} ┃`);
  console.log(`┃ ID   ┃ ${resultData.id.bh.count} │ ${resultData.id.de.count} │ ${resultData.id.dh.count} │ ${resultData.id.dl.count} │ ${resultData.id.eos.count} │ ${resultData.id.he.count} │ ${resultData.id.id.count} │ ${resultData.id.koe.count} │ ${resultData.id.ok.count} │ ${resultData.id.ong.count} │ ${resultData.id.sa.count} │ ${resultData.id.se.count} │ ${resultData.id.ud.count} │ ${resultData.id.vc.count} │ ${resultData.id.vs.count} │ ${resultData.id.wdg.count} ┃ ${resultData.id.all.count} ┃`);
  console.log(`┃ KoE  ┃ ${resultData.koe.bh.count} │ ${resultData.koe.de.count} │ ${resultData.koe.dh.count} │ ${resultData.koe.dl.count} │ ${resultData.koe.eos.count} │ ${resultData.koe.he.count} │ ${resultData.koe.id.count} │ ${resultData.koe.koe.count} │ ${resultData.koe.ok.count} │ ${resultData.koe.ong.count} │ ${resultData.koe.sa.count} │ ${resultData.koe.se.count} │ ${resultData.koe.ud.count} │ ${resultData.koe.vc.count} │ ${resultData.koe.vs.count} │ ${resultData.koe.wdg.count} ┃ ${resultData.koe.all.count} ┃`);
  console.log(`┃ OK   ┃ ${resultData.ok.bh.count} │ ${resultData.ok.de.count} │ ${resultData.ok.dh.count} │ ${resultData.ok.dl.count} │ ${resultData.ok.eos.count} │ ${resultData.ok.he.count} │ ${resultData.ok.id.count} │ ${resultData.ok.koe.count} │ ${resultData.ok.ok.count} │ ${resultData.ok.ong.count} │ ${resultData.ok.sa.count} │ ${resultData.ok.se.count} │ ${resultData.ok.ud.count} │ ${resultData.ok.vc.count} │ ${resultData.ok.vs.count} │ ${resultData.ok.wdg.count} ┃ ${resultData.ok.all.count} ┃`);
  console.log(`┃ OnG  ┃ ${resultData.ong.bh.count} │ ${resultData.ong.de.count} │ ${resultData.ong.dh.count} │ ${resultData.ong.dl.count} │ ${resultData.ong.eos.count} │ ${resultData.ong.he.count} │ ${resultData.ong.id.count} │ ${resultData.ong.koe.count} │ ${resultData.ong.ok.count} │ ${resultData.ong.ong.count} │ ${resultData.ong.sa.count} │ ${resultData.ong.se.count} │ ${resultData.ong.ud.count} │ ${resultData.ong.vc.count} │ ${resultData.ong.vs.count} │ ${resultData.ong.wdg.count} ┃ ${resultData.ong.all.count} ┃`);
  console.log(`┃ SA   ┃ ${resultData.sa.bh.count} │ ${resultData.sa.de.count} │ ${resultData.sa.dh.count} │ ${resultData.sa.dl.count} │ ${resultData.sa.eos.count} │ ${resultData.sa.he.count} │ ${resultData.sa.id.count} │ ${resultData.sa.koe.count} │ ${resultData.sa.ok.count} │ ${resultData.sa.ong.count} │ ${resultData.sa.sa.count} │ ${resultData.sa.se.count} │ ${resultData.sa.ud.count} │ ${resultData.sa.vc.count} │ ${resultData.sa.vs.count} │ ${resultData.sa.wdg.count} ┃ ${resultData.sa.all.count} ┃`);
  console.log(`┃ SE   ┃ ${resultData.se.bh.count} │ ${resultData.se.de.count} │ ${resultData.se.dh.count} │ ${resultData.se.dl.count} │ ${resultData.se.eos.count} │ ${resultData.se.he.count} │ ${resultData.se.id.count} │ ${resultData.se.koe.count} │ ${resultData.se.ok.count} │ ${resultData.se.ong.count} │ ${resultData.se.sa.count} │ ${resultData.se.se.count} │ ${resultData.se.ud.count} │ ${resultData.se.vc.count} │ ${resultData.se.vs.count} │ ${resultData.se.wdg.count} ┃ ${resultData.se.all.count} ┃`);
  console.log(`┃ UD   ┃ ${resultData.ud.bh.count} │ ${resultData.ud.de.count} │ ${resultData.ud.dh.count} │ ${resultData.ud.dl.count} │ ${resultData.ud.eos.count} │ ${resultData.ud.he.count} │ ${resultData.ud.id.count} │ ${resultData.ud.koe.count} │ ${resultData.ud.ok.count} │ ${resultData.ud.ong.count} │ ${resultData.ud.sa.count} │ ${resultData.ud.se.count} │ ${resultData.ud.ud.count} │ ${resultData.ud.vc.count} │ ${resultData.ud.vs.count} │ ${resultData.ud.wdg.count} ┃ ${resultData.ud.all.count} ┃`);
  console.log(`┃ VC   ┃ ${resultData.vc.bh.count} │ ${resultData.vc.de.count} │ ${resultData.vc.dh.count} │ ${resultData.vc.dl.count} │ ${resultData.vc.eos.count} │ ${resultData.vc.he.count} │ ${resultData.vc.id.count} │ ${resultData.vc.koe.count} │ ${resultData.vc.ok.count} │ ${resultData.vc.ong.count} │ ${resultData.vc.sa.count} │ ${resultData.vc.se.count} │ ${resultData.vc.ud.count} │ ${resultData.vc.vc.count} │ ${resultData.vc.vs.count} │ ${resultData.vc.wdg.count} ┃ ${resultData.vc.all.count} ┃`);
  console.log(`┃ VS   ┃ ${resultData.vs.bh.count} │ ${resultData.vs.de.count} │ ${resultData.vs.dh.count} │ ${resultData.vs.dl.count} │ ${resultData.vs.eos.count} │ ${resultData.vs.he.count} │ ${resultData.vs.id.count} │ ${resultData.vs.koe.count} │ ${resultData.vs.ok.count} │ ${resultData.vs.ong.count} │ ${resultData.vs.sa.count} │ ${resultData.vs.se.count} │ ${resultData.vs.ud.count} │ ${resultData.vs.vc.count} │ ${resultData.vs.vs.count} │ ${resultData.vs.wdg.count} ┃ ${resultData.vs.all.count} ┃`);
  console.log(`┃ WDG  ┃ ${resultData.wdg.bh.count} │ ${resultData.wdg.de.count} │ ${resultData.wdg.dh.count} │ ${resultData.wdg.dl.count} │ ${resultData.wdg.eos.count} │ ${resultData.wdg.he.count} │ ${resultData.wdg.id.count} │ ${resultData.wdg.koe.count} │ ${resultData.wdg.ok.count} │ ${resultData.wdg.ong.count} │ ${resultData.wdg.sa.count} │ ${resultData.wdg.se.count} │ ${resultData.wdg.ud.count} │ ${resultData.wdg.vc.count} │ ${resultData.wdg.vs.count} │ ${resultData.wdg.wdg.count} ┃ ${resultData.wdg.all.count} ┃`);
  console.log(`┗━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┻━━━━━━┛`);

}


function printUnitPickRates() {

  for(let army in pickRates) {
    const armyUnits = require("./units.js")[army];
    let lastCategory = armyUnits[0].category;
    // console.log(JSON.stringify(armyUnits, null, 4));

    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┓`);
    console.log(`┃ Category                   │ ${army.padEnd(3, " ")} - Units                        ┃    Ø     ┃  1   │  2   │  3   │  4+  ┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┫`);

    for(let unitDefinition of armyUnits) {
      if(unitDefinition.category !== lastCategory) {
        console.log(`┃                            │                                    ┃          ┃      │      │      │      ┃`);
      }
      console.log(`┃ ${unitDefinition.category.padEnd(26, " ")} │ ${unitDefinition.name.padEnd(34, " ")} ┃   ${pickRates[army].units?.[unitDefinition.name]?.picks.percent || "  0%"}   ┃ ${pickRates[army].units?.[unitDefinition.name]?.picks.rate1 || "  0%"} │ ${pickRates[army].units?.[unitDefinition.name]?.picks.rate2 || "  0%"} │ ${pickRates[army].units?.[unitDefinition.name]?.picks.rate3 || "  0%"} │ ${pickRates[army].units?.[unitDefinition.name]?.picks.rate4 || "  0%"} ┃`);
      lastCategory = unitDefinition.category;
    }

    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┛`);
    console.log(`\n`);

    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┳━━━━━━━┓`);
    console.log(`┃ ${army.padEnd(3, " ")} - Special Items                ┃   #   ┃   %   ┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┻━━━━━━━┫`);
    console.log(`┃ Common Items                                       ┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┳━━━━━━━┫`);

    for(let item of commonItemNames) {
      let name = `${item.padEnd(34, " ")}`;
      let count = `${pickRates[army].specialItems?.[item]?.count || 0}`.padStart(3, " ");
      let percent = `${(pickRates[army].specialItems?.[item]?.pickPercent || "0").padStart(4, " ")}%`;
      console.log(`┃ ${name} ┃  ${count}  ┃ ${percent} ┃`);
    }

    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┻━━━━━━━┫`);
    console.log(`┃ Shared Items                                       ┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┳━━━━━━━┫`);

    // TODO Improve: Setup army specific shared items data structures in specialItems and use them
    const armySharedItems = require("./specialItems.js").sharedItems[army];

    for(let item of armySharedItems) {
      let name = `${item.padEnd(34, " ")}`;
      let count = `${pickRates[army].specialItems?.[item]?.count || 0}`.padStart(3, " ");
      let percent = `${(pickRates[army].specialItems?.[item]?.pickPercent || "0").padStart(4, " ")}%`;
      console.log(`┃ ${name} ┃  ${count}  ┃ ${percent} ┃`);
    }

    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┻━━━━━━━┫`);
    console.log(`┃ Army Specific Items                                ┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┳━━━━━━━┫`);

    const armyItems = require("./specialItems.js")[army];
    for(let item of armyItems) {
      let name = `${item.padEnd(34, " ")}`;
      let count = `${pickRates[army].specialItems?.[item]?.count || 0}`.padStart(3, " ");
      let percent = `${(pickRates[army].specialItems?.[item]?.pickPercent || "0").padStart(4, " ")}%`;
      console.log(`┃ ${name} ┃  ${count}  ┃ ${percent} ┃`);
    }

    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━┻━━━━━━━┛`);
    console.log(`\n`);

  }
}

function printUnitOptionRates() {

  for(let army in pickRates) {
    for(let unit in pickRates[army].units) {
      console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
      console.log(`┃ Options: ${unit.padEnd(44, " ")} ┃`);
      console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);

      for(let category in pickRates[army].units[unit].options) {
        console.log(`┃ ${category.padEnd(45, " ")}         ┃`);
        console.log(`┠───────────────────────────────────────────────────────┨`);

        for(let option in pickRates[army].units[unit].options[category]) {
          console.log(`┃ ${option.padEnd(40, " ")} - ${pickRates[army].units[unit].options[category][option].padEnd(10, " ")} ┃`);
        }
        console.log(`┠───────────────────────────────────────────────────────┨`);
      }
      console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    }
  }
}
