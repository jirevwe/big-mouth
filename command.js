const commandLineUsage = require("command-line-usage");
const commandLineArgs = require("command-line-args");

const optionDefinitions = [
  { name: "help", alias: "h", type: Boolean },
  { name: "url", alias: "u", type: String },
  { name: "output", alias: "o", type: String },
];

const sections = [
  {
    header: "Big Mouth👄",
    content: `Usage:
    npm start --args
    
    Examples:
    node index -u=url -o=pathname.mp3 
    node index --url=websiteurl --output=pathname.mp3
    `,
  },
  {
    header: "Options",
    optionList: [
      {
        name: "url",
        alias: "u",
        type: String,
        description:
          "required, Website url of blogPost",
      },
      {
        name: "output",
        alias: "o",
        type: String,
        description:
          "required, the name of the merged audio file ,example (output.mp3)",
      },  
    ],
  },
];

// const usage = commandLineUsage(sections)
// const options = commandLineArgs(optionDefinitions)

module.exports = {
  sections: sections,
  optionDefinitions: optionDefinitions,
};
