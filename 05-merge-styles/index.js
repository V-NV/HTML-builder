const path = require('path');
const fs = require('fs');
const fsP = fs.promises;

const Path__From = path.join(__dirname, 'styles');
const Path__To = path.join(__dirname, 'project-dist');
const BundleFile = 'bundle.css';
const PathBundleFile = path.join(Path__To, BundleFile);
const WS = fs.createWriteStream(PathBundleFile);

fsP.readdir(Path__From,{withFileTypes: true}).then((files)=>{
  files.forEach((file) => {
    if(file.isFile() && path.extname(file.name) == '.css'){
      const RS = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');
      RS.on('data', (data)=>{
        WS.write(data);
 })}
})})


