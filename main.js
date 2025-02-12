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

const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// Results
let r = {
  "bh" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "de" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "dh" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "dl" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "eos" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "he" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "id" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "koe" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "ok" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "ong" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "sa" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "se" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "ud" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "vc" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "vs" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
  "wdg" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", },
};

// Games
let g = {
  "bh" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "de" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "dh" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "dl" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "eos" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "he" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "id" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "koe" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "ok" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "ong" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "sa" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "se" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "ud" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "vc" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "vs" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
  "wdg" : { "bh" : "----", "de" : "----", "dh" : "----", "dl" : "----", "eos" : "----", "he" : "----", "id" : "----", "koe" : "----", "ok" : "----", "ong" : "----", "sa" : "----", "se" : "----", "ud" : "----", "vc" : "----", "vs" : "----", "wdg" : "----", "missingLists" : 0, "availableLists": 0 },
};

// Unit Pick Rates
let p = {
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


function calculateArmyResults(armyResults) {
    
  for(let armyId in armyResults) {
    // console.log(`Army ID: ${armyId}`);
    let armyString = getArmyStringForId(armyId, false);
    // console.log(armyResults[armyId]);
    let allGames = Object.values(armyResults[armyId]).flat();
    let allGamesCount = allGames.length;
    let allGamesAvg = (allGames.reduce((a,b) => a+b, 0) / allGamesCount).toFixed(1).padStart(4, " ");
    // console.log(`All games stats for ${armyString}: #${allGamesCount} / Ø${allGamesAvg}`);
    r[armyString].all = allGamesAvg;
    g[armyString].all = `${allGamesCount}`.padStart(4, " ");
    
    for (let oppoArmyId in armyResults[armyId]) {
      let oppoArmyString = getArmyStringForId(oppoArmyId, false);
      let vsArmyGames = Object.values(armyResults[armyId][oppoArmyId]);
      let vsArmyCount = vsArmyGames.length;
      let vsArmyAvg = (vsArmyGames.reduce((a,b) => a+b, 0) / vsArmyCount).toFixed(1).padStart(4, " ");
      // console.log(`Games stats for ${armyString} vs ${oppoArmyString}: #${vsArmyCount} / Ø${vsArmyAvg}`);
      r[armyString][oppoArmyString] = vsArmyAvg;
      g[armyString][oppoArmyString] = `${vsArmyCount}`.padStart(4, " ");
    }
  }

}

function printArmyResults() {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Tournament Type: ${(args.type || 'Single').padEnd(43, " ") }                                                                ┃`);
  console.log(`┣━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┳━━━━━━┫`);
  console.log(`┃POINTS┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃ Total┃`);
  console.log(`┣━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━╋━━━━━━┫`);
  console.log(`┃ BH   ┃ ${r.bh.bh} │ ${r.bh.de} │ ${r.bh.dh} │ ${r.bh.dl} │ ${r.bh.eos} │ ${r.bh.he} │ ${r.bh.id} │ ${r.bh.koe} │ ${r.bh.ok} │ ${r.bh.ong} │ ${r.bh.sa} │ ${r.bh.se} │ ${r.bh.ud} │ ${r.bh.vc} │ ${r.bh.vs} │ ${r.bh.wdg} ┃ ${r.bh.all} ┃`);
  console.log(`┃ DE   ┃ ${r.de.bh} │ ${r.de.de} │ ${r.de.dh} │ ${r.de.dl} │ ${r.de.eos} │ ${r.de.he} │ ${r.de.id} │ ${r.de.koe} │ ${r.de.ok} │ ${r.de.ong} │ ${r.de.sa} │ ${r.de.se} │ ${r.de.ud} │ ${r.de.vc} │ ${r.de.vs} │ ${r.de.wdg} ┃ ${r.de.all} ┃`);
  console.log(`┃ DH   ┃ ${r.dh.bh} │ ${r.dh.de} │ ${r.dh.dh} │ ${r.dh.dl} │ ${r.dh.eos} │ ${r.dh.he} │ ${r.dh.id} │ ${r.dh.koe} │ ${r.dh.ok} │ ${r.dh.ong} │ ${r.dh.sa} │ ${r.dh.se} │ ${r.dh.ud} │ ${r.dh.vc} │ ${r.dh.vs} │ ${r.dh.wdg} ┃ ${r.dh.all} ┃`);
  console.log(`┃ DL   ┃ ${r.dl.bh} │ ${r.dl.de} │ ${r.dl.dh} │ ${r.dl.dl} │ ${r.dl.eos} │ ${r.dl.he} │ ${r.dl.id} │ ${r.dl.koe} │ ${r.dl.ok} │ ${r.dl.ong} │ ${r.dl.sa} │ ${r.dl.se} │ ${r.dl.ud} │ ${r.dl.vc} │ ${r.dl.vs} │ ${r.dl.wdg} ┃ ${r.dl.all} ┃`);
  console.log(`┃ EoS  ┃ ${r.eos.bh} │ ${r.eos.de} │ ${r.eos.dh} │ ${r.eos.dl} │ ${r.eos.eos} │ ${r.eos.he} │ ${r.eos.id} │ ${r.eos.koe} │ ${r.eos.ok} │ ${r.eos.ong} │ ${r.eos.sa} │ ${r.eos.se} │ ${r.eos.ud} │ ${r.eos.vc} │ ${r.eos.vs} │ ${r.eos.wdg} ┃ ${r.eos.all} ┃`);
  console.log(`┃ HE   ┃ ${r.he.bh} │ ${r.he.de} │ ${r.he.dh} │ ${r.he.dl} │ ${r.he.eos} │ ${r.he.he} │ ${r.he.id} │ ${r.he.koe} │ ${r.he.ok} │ ${r.he.ong} │ ${r.he.sa} │ ${r.he.se} │ ${r.he.ud} │ ${r.he.vc} │ ${r.he.vs} │ ${r.he.wdg} ┃ ${r.he.all} ┃`);
  console.log(`┃ ID   ┃ ${r.id.bh} │ ${r.id.de} │ ${r.id.dh} │ ${r.id.dl} │ ${r.id.eos} │ ${r.id.he} │ ${r.id.id} │ ${r.id.koe} │ ${r.id.ok} │ ${r.id.ong} │ ${r.id.sa} │ ${r.id.se} │ ${r.id.ud} │ ${r.id.vc} │ ${r.id.vs} │ ${r.id.wdg} ┃ ${r.id.all} ┃`);
  console.log(`┃ KoE  ┃ ${r.koe.bh} │ ${r.koe.de} │ ${r.koe.dh} │ ${r.koe.dl} │ ${r.koe.eos} │ ${r.koe.he} │ ${r.koe.id} │ ${r.koe.koe} │ ${r.koe.ok} │ ${r.koe.ong} │ ${r.koe.sa} │ ${r.koe.se} │ ${r.koe.ud} │ ${r.koe.vc} │ ${r.koe.vs} │ ${r.koe.wdg} ┃ ${r.koe.all} ┃`);
  console.log(`┃ OK   ┃ ${r.ok.bh} │ ${r.ok.de} │ ${r.ok.dh} │ ${r.ok.dl} │ ${r.ok.eos} │ ${r.ok.he} │ ${r.ok.id} │ ${r.ok.koe} │ ${r.ok.ok} │ ${r.ok.ong} │ ${r.ok.sa} │ ${r.ok.se} │ ${r.ok.ud} │ ${r.ok.vc} │ ${r.ok.vs} │ ${r.ok.wdg} ┃ ${r.ok.all} ┃`);
  console.log(`┃ OnG  ┃ ${r.ong.bh} │ ${r.ong.de} │ ${r.ong.dh} │ ${r.ong.dl} │ ${r.ong.eos} │ ${r.ong.he} │ ${r.ong.id} │ ${r.ong.koe} │ ${r.ong.ok} │ ${r.ong.ong} │ ${r.ong.sa} │ ${r.ong.se} │ ${r.ong.ud} │ ${r.ong.vc} │ ${r.ong.vs} │ ${r.ong.wdg} ┃ ${r.ong.all} ┃`);
  console.log(`┃ SA   ┃ ${r.sa.bh} │ ${r.sa.de} │ ${r.sa.dh} │ ${r.sa.dl} │ ${r.sa.eos} │ ${r.sa.he} │ ${r.sa.id} │ ${r.sa.koe} │ ${r.sa.ok} │ ${r.sa.ong} │ ${r.sa.sa} │ ${r.sa.se} │ ${r.sa.ud} │ ${r.sa.vc} │ ${r.sa.vs} │ ${r.sa.wdg} ┃ ${r.sa.all} ┃`);
  console.log(`┃ SE   ┃ ${r.se.bh} │ ${r.se.de} │ ${r.se.dh} │ ${r.se.dl} │ ${r.se.eos} │ ${r.se.he} │ ${r.se.id} │ ${r.se.koe} │ ${r.se.ok} │ ${r.se.ong} │ ${r.se.sa} │ ${r.se.se} │ ${r.se.ud} │ ${r.se.vc} │ ${r.se.vs} │ ${r.se.wdg} ┃ ${r.se.all} ┃`);
  console.log(`┃ UD   ┃ ${r.ud.bh} │ ${r.ud.de} │ ${r.ud.dh} │ ${r.ud.dl} │ ${r.ud.eos} │ ${r.ud.he} │ ${r.ud.id} │ ${r.ud.koe} │ ${r.ud.ok} │ ${r.ud.ong} │ ${r.ud.sa} │ ${r.ud.se} │ ${r.ud.ud} │ ${r.ud.vc} │ ${r.ud.vs} │ ${r.ud.wdg} ┃ ${r.ud.all} ┃`);
  console.log(`┃ VC   ┃ ${r.vc.bh} │ ${r.vc.de} │ ${r.vc.dh} │ ${r.vc.dl} │ ${r.vc.eos} │ ${r.vc.he} │ ${r.vc.id} │ ${r.vc.koe} │ ${r.vc.ok} │ ${r.vc.ong} │ ${r.vc.sa} │ ${r.vc.se} │ ${r.vc.ud} │ ${r.vc.vc} │ ${r.vc.vs} │ ${r.vc.wdg} ┃ ${r.vc.all} ┃`);
  console.log(`┃ VS   ┃ ${r.vs.bh} │ ${r.vs.de} │ ${r.vs.dh} │ ${r.vs.dl} │ ${r.vs.eos} │ ${r.vs.he} │ ${r.vs.id} │ ${r.vs.koe} │ ${r.vs.ok} │ ${r.vs.ong} │ ${r.vs.sa} │ ${r.vs.se} │ ${r.vs.ud} │ ${r.vs.vc} │ ${r.vs.vs} │ ${r.vs.wdg} ┃ ${r.vs.all} ┃`);
  console.log(`┃ WDG  ┃ ${r.wdg.bh} │ ${r.wdg.de} │ ${r.wdg.dh} │ ${r.wdg.dl} │ ${r.wdg.eos} │ ${r.wdg.he} │ ${r.wdg.id} │ ${r.wdg.koe} │ ${r.wdg.ok} │ ${r.wdg.ong} │ ${r.wdg.sa} │ ${r.wdg.se} │ ${r.wdg.ud} │ ${r.wdg.vc} │ ${r.wdg.vs} │ ${r.wdg.wdg} ┃ ${r.wdg.all} ┃`);
  console.log(`┗━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┻━━━━━━┛`);

  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃ Tournament Type: ${(args.type || 'Single').padEnd(43, " ") }                                                                ┃`);
  console.log(`┣━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┳━━━━━━┫`);
  console.log(`┃GAMES ┃  BH  │  DE  │  DH  │  DL  │  EoS │  HE  │  ID  │  KoE │  OK  │  OnG │  SA  │  SE  │  UD  │  VC  │  VS  │  WDG ┃ Total┃`);
  console.log(`┣━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━╋━━━━━━┫`);
  console.log(`┃ BH   ┃ ${g.bh.bh} │ ${g.bh.de} │ ${g.bh.dh} │ ${g.bh.dl} │ ${g.bh.eos} │ ${g.bh.he} │ ${g.bh.id} │ ${g.bh.koe} │ ${g.bh.ok} │ ${g.bh.ong} │ ${g.bh.sa} │ ${g.bh.se} │ ${g.bh.ud} │ ${g.bh.vc} │ ${g.bh.vs} │ ${g.bh.wdg} ┃ ${g.bh.all} ┃`);
  console.log(`┃ DE   ┃ ${g.de.bh} │ ${g.de.de} │ ${g.de.dh} │ ${g.de.dl} │ ${g.de.eos} │ ${g.de.he} │ ${g.de.id} │ ${g.de.koe} │ ${g.de.ok} │ ${g.de.ong} │ ${g.de.sa} │ ${g.de.se} │ ${g.de.ud} │ ${g.de.vc} │ ${g.de.vs} │ ${g.de.wdg} ┃ ${g.de.all} ┃`);
  console.log(`┃ DH   ┃ ${g.dh.bh} │ ${g.dh.de} │ ${g.dh.dh} │ ${g.dh.dl} │ ${g.dh.eos} │ ${g.dh.he} │ ${g.dh.id} │ ${g.dh.koe} │ ${g.dh.ok} │ ${g.dh.ong} │ ${g.dh.sa} │ ${g.dh.se} │ ${g.dh.ud} │ ${g.dh.vc} │ ${g.dh.vs} │ ${g.dh.wdg} ┃ ${g.dh.all} ┃`);
  console.log(`┃ DL   ┃ ${g.dl.bh} │ ${g.dl.de} │ ${g.dl.dh} │ ${g.dl.dl} │ ${g.dl.eos} │ ${g.dl.he} │ ${g.dl.id} │ ${g.dl.koe} │ ${g.dl.ok} │ ${g.dl.ong} │ ${g.dl.sa} │ ${g.dl.se} │ ${g.dl.ud} │ ${g.dl.vc} │ ${g.dl.vs} │ ${g.dl.wdg} ┃ ${g.dl.all} ┃`);
  console.log(`┃ EoS  ┃ ${g.eos.bh} │ ${g.eos.de} │ ${g.eos.dh} │ ${g.eos.dl} │ ${g.eos.eos} │ ${g.eos.he} │ ${g.eos.id} │ ${g.eos.koe} │ ${g.eos.ok} │ ${g.eos.ong} │ ${g.eos.sa} │ ${g.eos.se} │ ${g.eos.ud} │ ${g.eos.vc} │ ${g.eos.vs} │ ${g.eos.wdg} ┃ ${g.eos.all} ┃`);
  console.log(`┃ HE   ┃ ${g.he.bh} │ ${g.he.de} │ ${g.he.dh} │ ${g.he.dl} │ ${g.he.eos} │ ${g.he.he} │ ${g.he.id} │ ${g.he.koe} │ ${g.he.ok} │ ${g.he.ong} │ ${g.he.sa} │ ${g.he.se} │ ${g.he.ud} │ ${g.he.vc} │ ${g.he.vs} │ ${g.he.wdg} ┃ ${g.he.all} ┃`);
  console.log(`┃ ID   ┃ ${g.id.bh} │ ${g.id.de} │ ${g.id.dh} │ ${g.id.dl} │ ${g.id.eos} │ ${g.id.he} │ ${g.id.id} │ ${g.id.koe} │ ${g.id.ok} │ ${g.id.ong} │ ${g.id.sa} │ ${g.id.se} │ ${g.id.ud} │ ${g.id.vc} │ ${g.id.vs} │ ${g.id.wdg} ┃ ${g.id.all} ┃`);
  console.log(`┃ KoE  ┃ ${g.koe.bh} │ ${g.koe.de} │ ${g.koe.dh} │ ${g.koe.dl} │ ${g.koe.eos} │ ${g.koe.he} │ ${g.koe.id} │ ${g.koe.koe} │ ${g.koe.ok} │ ${g.koe.ong} │ ${g.koe.sa} │ ${g.koe.se} │ ${g.koe.ud} │ ${g.koe.vc} │ ${g.koe.vs} │ ${g.koe.wdg} ┃ ${g.koe.all} ┃`);
  console.log(`┃ OK   ┃ ${g.ok.bh} │ ${g.ok.de} │ ${g.ok.dh} │ ${g.ok.dl} │ ${g.ok.eos} │ ${g.ok.he} │ ${g.ok.id} │ ${g.ok.koe} │ ${g.ok.ok} │ ${g.ok.ong} │ ${g.ok.sa} │ ${g.ok.se} │ ${g.ok.ud} │ ${g.ok.vc} │ ${g.ok.vs} │ ${g.ok.wdg} ┃ ${g.ok.all} ┃`);
  console.log(`┃ OnG  ┃ ${g.ong.bh} │ ${g.ong.de} │ ${g.ong.dh} │ ${g.ong.dl} │ ${g.ong.eos} │ ${g.ong.he} │ ${g.ong.id} │ ${g.ong.koe} │ ${g.ong.ok} │ ${g.ong.ong} │ ${g.ong.sa} │ ${g.ong.se} │ ${g.ong.ud} │ ${g.ong.vc} │ ${g.ong.vs} │ ${g.ong.wdg} ┃ ${g.ong.all} ┃`);
  console.log(`┃ SA   ┃ ${g.sa.bh} │ ${g.sa.de} │ ${g.sa.dh} │ ${g.sa.dl} │ ${g.sa.eos} │ ${g.sa.he} │ ${g.sa.id} │ ${g.sa.koe} │ ${g.sa.ok} │ ${g.sa.ong} │ ${g.sa.sa} │ ${g.sa.se} │ ${g.sa.ud} │ ${g.sa.vc} │ ${g.sa.vs} │ ${g.sa.wdg} ┃ ${g.sa.all} ┃`);
  console.log(`┃ SE   ┃ ${g.se.bh} │ ${g.se.de} │ ${g.se.dh} │ ${g.se.dl} │ ${g.se.eos} │ ${g.se.he} │ ${g.se.id} │ ${g.se.koe} │ ${g.se.ok} │ ${g.se.ong} │ ${g.se.sa} │ ${g.se.se} │ ${g.se.ud} │ ${g.se.vc} │ ${g.se.vs} │ ${g.se.wdg} ┃ ${g.se.all} ┃`);
  console.log(`┃ UD   ┃ ${g.ud.bh} │ ${g.ud.de} │ ${g.ud.dh} │ ${g.ud.dl} │ ${g.ud.eos} │ ${g.ud.he} │ ${g.ud.id} │ ${g.ud.koe} │ ${g.ud.ok} │ ${g.ud.ong} │ ${g.ud.sa} │ ${g.ud.se} │ ${g.ud.ud} │ ${g.ud.vc} │ ${g.ud.vs} │ ${g.ud.wdg} ┃ ${g.ud.all} ┃`);
  console.log(`┃ VC   ┃ ${g.vc.bh} │ ${g.vc.de} │ ${g.vc.dh} │ ${g.vc.dl} │ ${g.vc.eos} │ ${g.vc.he} │ ${g.vc.id} │ ${g.vc.koe} │ ${g.vc.ok} │ ${g.vc.ong} │ ${g.vc.sa} │ ${g.vc.se} │ ${g.vc.ud} │ ${g.vc.vc} │ ${g.vc.vs} │ ${g.vc.wdg} ┃ ${g.vc.all} ┃`);
  console.log(`┃ VS   ┃ ${g.vs.bh} │ ${g.vs.de} │ ${g.vs.dh} │ ${g.vs.dl} │ ${g.vs.eos} │ ${g.vs.he} │ ${g.vs.id} │ ${g.vs.koe} │ ${g.vs.ok} │ ${g.vs.ong} │ ${g.vs.sa} │ ${g.vs.se} │ ${g.vs.ud} │ ${g.vs.vc} │ ${g.vs.vs} │ ${g.vs.wdg} ┃ ${g.vs.all} ┃`);
  console.log(`┃ WDG  ┃ ${g.wdg.bh} │ ${g.wdg.de} │ ${g.wdg.dh} │ ${g.wdg.dl} │ ${g.wdg.eos} │ ${g.wdg.he} │ ${g.wdg.id} │ ${g.wdg.koe} │ ${g.wdg.ok} │ ${g.wdg.ong} │ ${g.wdg.sa} │ ${g.wdg.se} │ ${g.wdg.ud} │ ${g.wdg.vc} │ ${g.wdg.vs} │ ${g.wdg.wdg} ┃ ${g.wdg.all} ┃`);
  console.log(`┗━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┻━━━━━━┛`);

}

function addListsToAnalysis(result) {
  // console.log(`Processing the following result and add lists to list analysis: ${JSON.stringify(result)}`);

  for(let player of result.players) {
    if(!player.report_list) {
      // TODO Implement parsing of the exported list and try to ingest the data this way
      // console.log(`Missing 'report_list' property. Implement exported list parsing to still be able to add this list for analysis.`)
      // Add a missing list for one game to this army, to prevent wrong pick rate calculation.
      g[getArmyStringForId(player.id_book, false)].missingLists++;
    } else {
      let armyString = getArmyStringForId(player.id_book, null);
      // Count the number of lists we have data for
      g[armyString].availableLists++;
      
      // Add pick rates of units to overall result object
      for(let entry in player.report_list.units) {
        // Create if missing
        g[armyString].picks = g[armyString].picks || {};
        g[armyString].picks[entry.toLowerCase()] = g[armyString].picks[entry.toLowerCase()] || {};
        g[armyString].picks[entry.toLowerCase()].base = g[armyString].picks[entry.toLowerCase()].base || [];
        g[armyString].picks[entry.toLowerCase()].base.push(player.report_list.units[entry].length);
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
            g[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()] = g[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()] || [];
            g[armyString].picks[optionEntry.parentUnit.toLowerCase()][option.toLowerCase()].push(optionEntry.amount);
          }
        }
      }
    }
  }
}

function calculatePickRates() {
  // Iterate per army
  for(let army in g) {
    // Iterate per unit
    for(let unit in g[army].picks) {
      // Pick Rate for unit
      let sum = g[army].picks[unit].base.reduce((a, b) => a + b, 0);
      let pickRate = `${(sum * 100 / g[army].availableLists).toFixed(0)}%`.padStart(4, " ");
      let pickRateOnce = 0;
      let pickRateTwice = 0;
      let pickRateThrice = 0;
      let pickRateFourOrMore = 0;
      for(let value of g[army].picks[unit].base) {
        if(value === 1) pickRateOnce++;
        if(value === 2) pickRateTwice++;
        if(value === 3) pickRateThrice++;
        if(value > 3) pickRateFourOrMore++;
      }
      pickRateOnce = `${(pickRateOnce * 100 / g[army].availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateTwice = `${(pickRateTwice * 100 / g[army].availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateThrice = `${(pickRateThrice * 100 / g[army].availableLists).toFixed(0)}%`.padStart(4, " ");
      pickRateFourOrMore = `${(pickRateFourOrMore * 100 / g[army].availableLists).toFixed(0)}%`.padStart(4, " ");
      p[army][unit] = p[army][unit] || {};
      p[army][unit].pickTimes = sum;
      p[army][unit].pickRate = pickRate;
      p[army][unit].pickRate1 = pickRateOnce;
      p[army][unit].pickRate2 = pickRateTwice;
      p[army][unit].pickRate3 = pickRateThrice;
      p[army][unit].pickRate4 = pickRateFourOrMore;

      // Pick Rate for Options
      for(let option in g[army].picks[unit]) {
        if(option === 'base') {
          continue;
        }
        else if(option === 'models') {
          p[army][unit][option] = `Ø ${(g[army].picks[unit][option].reduce((a,b)=>a+b,0) / sum).toFixed(1)}`;
        } else {
          p[army][unit][option] = `${(g[army].picks[unit][option].length * 100 / sum).toFixed(0)}%`;
        }
        
        
      }
    }
  }
}

function printUnitPickRates() {

  for(let army in p) {

    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┓`);
    console.log(`┃ ${army.padEnd(3, " ")} - Units                        ┃    Ø     ┃  1   │  2   │  3   │  4+  ┃`);
    console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━┿━━━━━━┿━━━━━━┿━━━━━━┫`);

    for(let unit in p[army]) {
      console.log(`┃ ${unit.padEnd(34, " ")} ┃   ${p[army][unit].pickRate}   ┃ ${p[army][unit].pickRate1} │ ${p[army][unit].pickRate2} │ ${p[army][unit].pickRate3} │ ${p[army][unit].pickRate4} ┃`);
    }
 
    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━┻━━━━━━┷━━━━━━┷━━━━━━┷━━━━━━┛`);
    console.log(`\n`);
  }
}


(async () => {
  try {
    // Evaluate Command Line Arguments
    // console.log(args);
    const tournamentType = args.type || 'single';
    const showExternalBalance = args.e ? true : false;
    const showPickRates = args.p ? true : false;
    const rawData = args.r ? true : false;
    const minParticipants = args.minParticipants ? args.minParticipants : 0;
    
    const tournamentsResponse = await superagent
    .post('https://www.newrecruit.eu/api/tournaments')
    .send({ "start": "2025-01-01", "end": today })
    .set("accept", "json")
    .set("user-agent", "t9a-data/0.0.1")
    
    let data;

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

    console.log(`Tournaments in Calculation: ${data.length}`);
    let armyResults = { };
    
    for(let t of data) {
      const reportsResponse = await superagent
      .post('https://www.newrecruit.eu/api/reports')
      .send({ "id_tournament": t._id })
      .set("accept", "json")
      .set("user-agent", "t9a-data/0.0.1");
      
      const validResults = reportsResponse.body.filter((r) => r.handshake === false && typeof r.players[0].id_book === "number" && typeof r.players[1].id_book === "number");
      // console.log(`Filtered out ${reportsResponse.body.length - validResults.length} invalid reports`);
      
      for(let result of validResults) {
        // console.log(`Game Result: Army '${result.players[0].id_book}' vs Army '${result.players[1].id_book}' → ${result.score[0].BPObj} : ${result.score[1].BPObj}`);
        // console.log(`Game Result: List ${result.players[0].exported_list} vs Army ${result.players[1].exported_list}`);
        // console.log(`Game Result: Score ${JSON.stringify(result.score, null, 4)}`);
        // console.log(`Game Result: ${JSON.stringify(result.players[0].report_list, null, 4)}`);
        
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
    calculateArmyResults(armyResults);
    if(showExternalBalance) printArmyResults();
    calculatePickRates();
    if(showPickRates) printUnitPickRates();
    if(rawData) {
      console.log(JSON.stringify(g, null, 4));
      console.log(JSON.stringify(p, null, 4));
    }
    // console.log(JSON.stringify(armyResults));
    // console.log(response.body);
  } catch (error) {
    console.log(error);
  }
})();
