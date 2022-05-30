const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");
const axios = require("axios");

async function parseHTMLPage(url) {
  const { data } = await axios.get(url, { timeout: this.timeout });
  const doc = new JSDOM(data);
  let reader = new Readability(doc.window.document);
  let article = reader.parse();
  return article.textContent;
}

exports.parseHTMLPage = parseHTMLPage;
