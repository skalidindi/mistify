#!/usr/bin/env node

import { Command } from "commander";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

// Function to style text using ANSI escape codes
const styleText = (text: string, style: string) => {
  const styles = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",
  };
  return `${styles[style] || styles.reset}${text}${styles.reset}`;
};

const program = new Command();

program
  .version("1.0.0")
  .description(
    "A command-line utility to blur images and get their base64 representation"
  )
  .requiredOption("-f, --file <path>", "Path to the image file")
  .requiredOption(
    "-s, --size <number>",
    "Size to resize the image to",
    parseInt
  )
  .action(async (options: { file: string; size: number }) => {
    try {
      const { file, size } = options;
      const filePath = path.resolve(file);

      if (!fs.existsSync(filePath)) {
        console.error(styleText("Error: File does not exist.", "fgRed"));
        process.exit(1);
      }

      const { info, data } = await sharp(filePath)
        .resize(size)
        .blur()
        .toBuffer({ resolveWithObject: true });

      const base64Image = `data:image/${info.format};base64,${data.toString(
        "base64"
      )}`;
      console.log(styleText("Base64 Image:", "fgGreen"));
      console.log(base64Image);
    } catch (error) {
      console.error(
        styleText("Error processing the image:", "fgRed"),
        error.message
      );
    }
  });

program.parse(process.argv);
