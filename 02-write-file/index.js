const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit} = require('process');
const TxtFile = path.join(__dirname, 'text.txt');
const out = fs.createWriteStream(TxtFile);

console.log('Please enter the text.');
stdin.on('data',data =>{
   if(data.toString().trim() == 'exit'){
    stdout.write('Goodbye!\n')
    exit();
   }
        out.write(data);
});
process.on('SIGINT', () => {
  stdout.write('Goodbye!\n');
  exit();
});
