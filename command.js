const optionDefinitions = [
  { name: "help", alias: "h", type: Boolean },
  { name: "url", alias: "u", type: String },
  { name: "output", alias: "o", type: String },
];

const sections = [
  {
    header: `Big Mouth`,
    content: `Converts blog posts to audio :D
    
    Usage:
    node index --args
    
    Examples:
    node index -u=https://some-site/blog-post -o=pathToFile.mp3
    
    node index --url=https://some-site/blog-post --output=pathToFile.mp3
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
          "required, Website url of blog post, example (https://some-site/blog-post)",
      },
      {
        name: "output",
        alias: "o",
        type: String,
        description:
          "required, the path of the output file, example (./output.mp3)",
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

module.exports = {
  sections: sections,
  optionDefinitions: optionDefinitions,
};
