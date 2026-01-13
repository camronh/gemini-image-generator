import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

function getApiKey(): string | undefined {
  // Check for .env file in skill directory
  const skillDir = path.dirname(new URL(import.meta.url).pathname);
  const envPath = path.join(skillDir, ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/^GOOGLE_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  }
  // Fall back to environment variable
  return process.env.GOOGLE_API_KEY;
}

function parseArgs(args: string[]) {
  let prompt = "";
  let fileName = "generated-image.png";
  let aspectRatio = "1:1";
  let outputDir = ".";

  const promptParts: string[] = [];

  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--name" || arg === "-n") {
      fileName = args[++i];
      if (!fileName.endsWith(".png")) {
        fileName += ".png";
      }
    } else if (arg === "--aspect" || arg === "-a") {
      aspectRatio = args[++i];
    } else if (arg === "--output" || arg === "-o") {
      outputDir = args[++i];
    } else {
      promptParts.push(arg);
    }
  }

  prompt = promptParts.join(" ");
  const outputPath = path.join(outputDir, fileName);
  return { prompt, outputPath, outputDir, aspectRatio };
}

async function main() {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("Error: GOOGLE_API_KEY not found.");
    console.error("Set it in .env file in the skill directory or as an environment variable.");
    process.exit(1);
  }

  const { prompt, outputPath, outputDir, aspectRatio } = parseArgs(process.argv);

  if (!prompt) {
    console.error("Usage: npx tsx generate-image.ts <prompt> [--name/-n <filename>] [--aspect/-a <ratio>] [--output/-o <dir>]");
    process.exit(1);
  }

  const validAspectRatios = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"];
  if (!validAspectRatios.includes(aspectRatio)) {
    console.error(`Invalid aspect ratio. Must be one of: ${validAspectRatios.join(", ")}`);
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log(`Generating image for: "${prompt}" (${aspectRatio})`);

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: prompt,
    config: {
      responseModalities: ["Image"],
      imageConfig: {
        aspectRatio,
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync(outputPath, new Uint8Array(buffer));
      console.log(`Image saved to ${outputPath}`);
    }
  }
}

main();
