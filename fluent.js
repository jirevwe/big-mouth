const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')

// const firstFile = "aud-0.mp3";
// const secondFile = "aud-1.mp3";
// const thirdFile = "aud-2.mp3";
// const fourthFile = "aud-3.mp3";
// const fifthFile = "aud-4.mp3";
const outPath = "out.mp3";

// const cleanup = () => {
//   const path = `${__dirname}/audio`;
//   fs.readdirSync(path).forEach(f => fs.rmSync(`${path}/${f}`));
// }

function merge(number) {
  // first code
    //  ffmpeg(firstFile)
    // .input(secondFile)
    // .input(thirdFile)
    // .input(fourthFile)
    // .input(fifthFile)
    // // .input(...)

//     .on('end', function() {
//       console.log('files have been merged succesfully');
//     })
//     .on('error', function(err) {
//       console.log('an error happened: ' + err.message);
//     })
//     .mergeToFile(outPath);

  
  
let files = [];
for (let i = 0; i < number; i++) {
    files.push(`audio/${i}.mp3`);
}

  files
    .reduce((prev, curr) => prev.input(curr), ffmpeg())
    .on("error", err => console.log('an error happened: ' + err.message))
    .on("end", () => {
         console.log('files have been merged succesfully');
    })
    .mergeToFile(outPath);
    
} 



module.exports = merge;