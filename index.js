const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");
const { optionDefinitions, sections } = require("./command");
const { parseHTMLPage } = require("./html");
const { convertTextToAudio } = require("./convert");

async function run() {
  const usage = commandLineUsage(sections);

  try {
    const options = commandLineArgs(optionDefinitions);

    const requiredArgs = optionDefinitions
      .map((it) => it.name)
      .filter((it) => it !== "help");
    const argKeys = Object.keys(options).filter((it) => it !== "help");

    if (options.help || argKeys.length === 0) {
      console.log(usage);
      process.exit(0);
    }

    const missingArgs = [];
    for (const param of requiredArgs) {
      if (!argKeys.includes(param)) missingArgs.push(param);
    }

    if (missingArgs.length > 0) {
      console.log(`missing required arguments: ${missingArgs.join(", ")}`);
      console.log(usage);

      process.exit(1);
    }

    const text = await parseHTMLPage(options["url"]);
    await convertTextToAudio(text, options["output"]);
  } catch (error) {
    console.log(error.message);
    console.log(usage);

    process.exit(1);
  }
}

run();
