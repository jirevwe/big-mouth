//@ts-check
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = `${__dirname}/audio`;

/**
 * Merges mp3 audio files
 * @param {*} fileCount the number of files to be merged
 * @param {*} pathOfOutputFile the path of the output file
 */
function mergeAudioFiles(fileCount, pathOfOutputFile, timing) {
  let files = [];
  for (let i = 0; i < fileCount; i++) {
    files.push(`audio/${i}.mp3`);
  }

  files
    .reduce((prev, curr) => prev.input(curr), ffmpeg())
    .on("error", (err) => console.log("an error happened: " + err.message))
    .on("end", () => {
      console.log("files have been merged succesfully");
      fs.readdirSync(path).forEach((f) => fs.rmSync(`${path}/${f}`));

      timing.end();
      console.log(`Finished merging file in ${timing.toHumanReadableTime()}`);
    })
    .mergeToFile(pathOfOutputFile);
}

exports.mergeAudioFiles = mergeAudioFiles;
