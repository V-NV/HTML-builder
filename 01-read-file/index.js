const fs = require('fs');
const path = require('path');
const txt = path.join(__dirname, 'text.txt');
const rs = fs.createReadStream(txt, 'utf-8');

rs.on('data', (data) => console.log(data));
