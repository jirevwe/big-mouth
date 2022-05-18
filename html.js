const request = require("request");
const cheerio = require("cheerio");

function parseHTMLPage(url) {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        const raw = cheerio.load(html);
        return resolve(raw.text());
      } else {
        return reject(error);
      }
    });
  });
}

exports.parseHTMLPage = parseHTMLPage;
