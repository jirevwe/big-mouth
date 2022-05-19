# Big Mouth👄

Big Mouth is a tool that converts blogpost contents into an mp3 audio file.

## Installation

Use the package manager NPM to install Big Mouth.

```bash
npm install
```

## How Does Big Mouth Work

The program start by converting the blogpost from the url into plain text.
The text will then be passed to google-tts-api to convert the text into splitted audio files .
With the help of a special package FFMPEG the splitted audio files will then be merged back into one whole file and be stored in filename given to the CLI at the start of the program.

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

