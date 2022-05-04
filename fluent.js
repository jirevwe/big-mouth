const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
const outPath = "out.mp3";
const path = `${__dirname}/audio`;

function merge(number) {
  
let files = [];
for (let i = 0; i < number; i++) {
    files.push(`audio/${i}.mp3`);
}

  files
    .reduce((prev, curr) => prev.input(curr), ffmpeg())
    .on("error", err => console.log('an error happened: ' + err.message))
    .on("end", () => {
      console.log('files have been merged succesfully');
       fs.readdirSync(path).forEach(f => fs.rmSync(`${path}/${f}`)); 
    })
    .mergeToFile(outPath);   
} 

module.exports = merge;