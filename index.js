//@ts-check
const fs = require("fs");
const googleTTS = require("google-tts-api");
const https = require("https");
const shellExec = require("./exec");

const run = async () => {
  const text = `We want Convoy to run without any dependencies. Today when you install loki you don't connect it to a db. Meaning we want to own all the tech even if it's embedded. This might mean we'd switch our main storage from mongodb to something smaller like SQLite and having an robust disk db solution. We'd also want to not depend on Redis or only depend on Redis for both storage and queue. This decision has helped to separate critical parts of code to different packages and we’ve seen increased reliability in our production instance. In the past we used to scale up both server and worker, now we can scale up server and worker workloads independently.`;
  console.log(text.length);

  // get base64 text`
  const results = googleTTS.getAllAudioUrls(text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const res = await download(result.url, `aud-${i}.mp3`);
    console.log(res);
  }

  const cmd = `ffmpeg -i aud-0.mp3 -i aud-1.mp3  -i aud-2.mp3 -i aud-3.mp3 \
  -filter_complex '[0:0][1:0][2:0][3:0]concat=n=4:v=0:a=1[out]' -map '[out]' aud.mp3`;

  const out = await shellExec(cmd);
  console.log(out);
};

/**
 *
 * @param {string} url the url of the resource
 * @param {string} file the file path
 */
const download = (url, file) => {
  return new Promise((resolve) => {
    https.get(url, { timeout: 10000 }, (res) => {
      const writeStream = fs.createWriteStream(file);

      res.pipe(writeStream);
      writeStream.on("finish", () => {
        writeStream.close();
        resolve("Download Complete");
      });
    });
  });
};

run();
