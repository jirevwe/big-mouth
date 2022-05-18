# Big Mouth👄

Big Mouth is a tool that converts large and small Blogpost from raw-text into an audio file.

## Installation

Use the package manager NPM to install Big Mouth.

```bash
npm install
```

## How Does Big Mouth Work

Thr program start by getting the text from the url passed in the cli when the code started, passes the url through a function that converts the blogpost into text.
The text will then be passed to google-tts-api to convert the text into splitted audio files .
With the help of a special package FFMPEG the splitted audio files will then be merged back into on whole file and be stored in filename given to the cli at the start of the program.

## CLI

```bash
Big Mouth

  Usage:
  npm start --args

  Examples:
  node index -u=url -o=pathname.mp3
  node index --url=websiteurl --output=pathname.mp3


Options

  -u, --url string      required, Website url of blogPost
  -o, --output string   required, the name of the merged audio file ,example (output.mp3)
```

## Usage 
How to start Big Mouth 

```bash
node index --url=websiteurl --output=pathname.mp3
```

