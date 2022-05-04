//@ts-check
const fs = require("fs");
const googleTTS = require("google-tts-api");
const https = require("https");
const shellExec = require("./exec");
const merge = require("./fluent");

const run = async () => {

//clean audio folder and old merged audio
  
  const path = `${__dirname}/audio`;
  fs.readdirSync(path).forEach(f => fs.rmSync(`${path}/${f}`));

 

    try {
    if (fs.existsSync("out.mp3")) {
     fs.unlink('out.mp3', function (err) {
    // if no error, file has been deleted successfully
    console.log('File deleted!');
});
    }
    } catch(err) {
    console.error(err)
    }
  


  const text = `hello lol man and woman has a call and there is no other way to go even if you do you do not know where you are going to add an extra ninety five characters and test again and get to thirty and find u Contestants. The war among frameworks is a hot topic in the JavaScript community. hello lol man and woman has a call and there is no other way to go even if you do you do not know where you are going to add an extra ninety five characters and test again and get to thirty and find u Contestants. The war among frameworks is a hot topic in the JavaScript community.`;
  console.log(text.length);

  // get base64 text`
  const results = googleTTS.getAllAudioUrls(text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const res = await download(result.url, `${i}.mp3`);
    console.log(res);
  }

  const totalfiles =Math.round((text.length) / 200) 

  await merge(totalfiles)
};

/**
 *
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
        resolve("Download Complete");
      });
    });
  });
};

run();
