# t9a-data
The Ninth Age Data Project

## Setup

Prerequisites: `git` and Node.js need to be installed. Recommendation is to use `nvm` to manage your node.js versions.

1. git clone this repository
2. cd into the repository
3. run `npm install`
4. run `npm start` for running with default options (Shows both games and pick rates from all tournaments (single and teams) with a minimum of 16 participants)

## Parameters

Instead of npm start you can use `node ./main.js -e -p -o -r --minParticipants=12 --type=all --start=5-5-2024 --end=5-5-2024`

Everything after node ./main.js tells this tool what to show, and you can use this to better filter your results.

As an example: `node ./main.js -e --minParticipants=20 --type=teams` will show only the external balance (-e) of tournaments with at least 20 participants (--minParticipants=20) and only team tournaments (--type=teams)

### --minParticipants=X

Can be used to let out tournaments with less participants than desired.


X here can be any number.

Example: `--minParticipants=12`

That will show only tournaments with at least 12 participants.

**Note:** When filtering team tournaments this will show tournaments with X or more _teams_.


### --type=X

Can be used to filter only singles, teams or all tournaments.


X can be single, teams or all

Example: `--type=teams`

### -e

This tells the tool to show or not external balance. A call including -e shows it, a call without it don't

### -p

This tells the tool to show or not pick rates balance. A call including -p shows it, a call without it don't

### -r

**Note:** This is not recomended as it shows a lot of difficult to read data.
This tells the tool to show or not the raw data. A call including -r shows it, a call without it don't

### -o

This tells the tool to show or not option rates. A call including -o shows it, a call without it don't
