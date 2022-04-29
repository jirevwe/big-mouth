const ffmpeg = require('fluent-ffmpeg');

const firstFile = "aud-0.mp3";
const secondFile = "aud-1.mp3";
const thirdFile = "aud-2.mp3";
const fourthFile = "aud-3.mp3";
const fifthFile = "aud-4.mp3";
const outPath = "out.mp3";

function merge(){
     ffmpeg(firstFile)
    .input(secondFile)
    .input(thirdFile)
    .input(fourthFile)
    .input(fifthFile)
    // .input(...)
    .on('end', function() {
      console.log('files have been merged succesfully');
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
    .mergeToFile(outPath);
} 

module.exports = merge;