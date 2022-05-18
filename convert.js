//@ts-check
const fs = require("fs");
const googleTTS = require("google-tts-api");
const https = require("https");
const { mergeAudioFiles } = require("./fluent");
const { PromisePool } = require("@supercharge/promise-pool");
const Timing = require("./timing");

/**
 * Converts raw text blobs to mp3 audio
 * @param {*} rawText the raw audio content
 * @param {*} pathOfOutputFile the path of the output file
 */
const convertTextToAudio = async (rawText, pathOfOutputFile) => {
  const timing = new Timing();

  // statrt the timer
  timing.start();

  const path = `${__dirname}/audio`;

  // create folder for intermidiate files if it doesn't exist
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  // delete all the files from the `/audio` folder
  fs.readdirSync(path).forEach((f) => fs.rmSync(`${path}/${f}`));

  if (fs.existsSync(pathOfOutputFile)) {
    fs.unlink(pathOfOutputFile, function (err) {
      if (err) throw err;
      console.log("old output file deleted!");
    });
  }

  // the max number of character that can be converted at a time if 200
  const totalfiles = Math.ceil(rawText.length / 200);
  console.log(
    `Attempting to convert text with ${rawText.length} characters.\n${totalfiles} audio files will be converted, downloaded and merged.`
  );

  // convert text to mutilple audio files
  const result = googleTTS.getAllAudioUrls(rawText);

  // download audio files in parallel
  await PromisePool.withConcurrency(50)
    .for(result)
    .process(async (downloads, index) =>
      download(downloads.url, `${index}.mp3`)
    );

  mergeAudioFiles(totalfiles, pathOfOutputFile, timing);
};

/**
 * Downloads the audio file
 * @param {string} url the url of the resource
 * @param {string} file the file path
 */
const download = (url, file) => {
  return new Promise((resolve) => {
    https.get(url, { timeout: 10000 }, (res) => {
      const path = `${__dirname}/audio/${file}`;
      const writeStream = fs.createWriteStream(path);

      res.pipe(writeStream);
      writeStream.on("finish", () => {
        writeStream.close();
        console.log(`Downloading audio file to ${path} complete`);
        resolve(true);
      });
    });
  });
};

exports.convertTextToAudio = convertTextToAudio;
