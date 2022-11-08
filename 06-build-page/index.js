const path = require('path');
const fs = require('fs');
const fsP = fs.promises;

const Path__Dist = path.join(__dirname, 'project-dist');
const Path__Assets = path.join(__dirname, 'assets');
const Path__Styles = path.join(__dirname, 'styles');
const Path_Comp = path.join(__dirname, 'components');

Del_Folder(Path__Dist);
(function Create_Folder(){
  fs.mkdir(Path__Dist, { recursive: true },  error => {
    if (error) throw error;
  })
})();
 Copy__Styles();

const WS = fs.createWriteStream(path.join(Path__Dist, 'style.css'));
async function Copy__Styles(){
fsP.readdir(Path__Styles,{withFileTypes: true}).then((files)=>{
  files.forEach((file) => {
    if(file.isFile() && path.extname(file.name) == '.css'){
      const RS = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');
      RS.on('data', (data)=>{
        WS.write(data);
 })}
})})
}
             
Copy__Assets(Path__Assets, Path__Dist);
async function Copy__Assets(Assets, Dist) {
  try {
    let folderName = Assets.split('\\')[Assets.split('\\').length - 1];
    let destFolder = path.join(Dist, folderName);
    fs.mkdir(destFolder, error => {
      if (error && error.code !== 'EEXIST') throw error;
    });
    const content = await fsP.readdir(Assets, { withFileTypes: true });
    content.forEach(el => {
      if (el.isDirectory()) {
        Copy__Assets(path.join(Assets, el.name), destFolder);
      } else {
        let sourceFilePath = path.join(Assets, el.name);
        let destFilePath = path.join(destFolder, el.name);
        fs.copyFile(sourceFilePath, destFilePath, error => {
          if (error) throw error;
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function Del_Folder(path) {
  try {
    const Folders__Assets = await fs.readdir(path, { withFileTypes: true }, error => {
      if (error) {};
    });
    if (Folders__Assets) {
       Folders__Assets.forEach(Folder__A => {
        let elementPath = path.join(path, Folder__A.name);
            if (Folder__A.isDirectory()) {
          Del_Folder(elementPath);
          fs.rmdir(elementPath, error => {
            if (error) throw error;
          });
        } else {
          fs.unlink(elementPath, error => {
            if (error) throw error;
          });
        }
      });
    }
  } catch (error) {
    throw error;
  }
}
let Templ__Html = '';
const Templ__RS = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
      Templ__RS.on('data', chunk => Templ__Html += chunk);
      Templ__RS.on('end', () => {
 let components = Templ__Html.matchAll(/{{[a-z]*}}/gi);
   for (let el of components) {
    let File__Name = path.join(el[0].slice(2, -2) + '.html');
    fsP.readdir(Path_Comp, { withFileTypes: true }).then(files => {
      files.forEach(file => {
        if (file.isFile() && file.name === File__Name) {
          let filePath = path.join(Path_Comp, file.name);
          let fileData = '';
          let fileReadStream = fs.createReadStream(filePath, 'utf-8');
          fileReadStream.on('data', chunk => fileData += chunk);
          fileReadStream.on('end', () => {
            Templ__Html = Templ__Html.replace(el[0], fileData);
            const writeStream = fs.createWriteStream(path.join(Path__Dist, 'index.html'));
            writeStream.write(Templ__Html);
          });
        }
      });});
  }});