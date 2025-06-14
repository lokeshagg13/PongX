const fs = require('fs');

let best = ``;

const bestJSON = JSON.parse(best);
const formattedJSON = JSON.stringify(bestJSON, undefined, 4);
const fileName = 'new.json';
fs.writeFileSync(fileName, formattedJSON, 'utf-8');