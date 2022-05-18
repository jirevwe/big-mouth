const commandLineUsage = require("command-line-usage");
const commandLineArgs = require("command-line-args");

const optionDefinitions = [
  { name: "help", alias: "h", type: Boolean },
  { name: "url", alias: "u", type: String },
  { name: "output", alias: "o", type: String },
];

const sections = [
  {
    header: "Rover Movement Sequence v0.1.0",
    content: `Usage:
    yarn start --args
    
    Examples:
    yarn start -x 0 -y 0 -d NORTH -i LBRF
    yarn start -x 4 -y 2 -d EAST -i FLFFFRFLB
    yarn start --x-position 4 --y-position 2 --direction EAST --input FLFFFRFLB
    `,
  },
  {
    header: "Options",
    optionList: [
      {
        name: "x-position",
        alias: "x",
        type: String,
        description:
          "required, the x coordinate where the rover will be initialised",
      },
      {
        name: "y-position",
        alias: "y",
        type: String,
        description:
          "required, the y coordinate where the rover will be initialised",
      },
      {
        name: "input",
        alias: "i",
        type: String,
        description: `required, the input that the rover is will process.
        One of L, R, F, B

        F: Move the rover forward with the current heading
        B: Move the rover backward with the current heading
        L: Rotate the rover left by 90 degrees
        R: Rotate the rover right by 90 degrees`,
      },
      {
        name: "direction",
        alias: "d",
        description: `required, the direction where the rover will face when initialised.
        One of NORTH, EAST, WEST, SOUTH`,
      },
      {
        name: "help",
        alias: "h",
        type: Boolean,
        description: "Print this usage guide.",
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
