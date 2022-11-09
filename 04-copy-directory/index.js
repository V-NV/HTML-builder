const path = require('path');
const fs = require('fs');
const fsP = require('fs').promises;

const Path__From = path.join(__dirname, 'files');
const Path__To = path.join(__dirname, 'files-copy');

async function fc(x){
await fsP.rmdir(x, { recursive: true }, (err) => { 
 if (err) throw err;
}).then(()=>{


fsP.mkdir(Path__To, { recursive: true }, (err) => {
  if (err) {throw err}
});}).then(()=>{

fs.readdir(Path__From, { withFileTypes: true }, (err, files) => {
  if (err) {throw err}
  else{
  files.forEach((file) => {
    if (file.isFile()) {
     fs.copyFile(path.join(Path__From, file.name),path.join(Path__To, file.name),(err)=> {
      if (err) {throw err}
    })
  }
  })}
})})
}
fc(Path__To);