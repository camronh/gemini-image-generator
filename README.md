# Gemini Image Generator

A Claude skill for generating and editing images using Google's Gemini AI.

## Install

### Claude Code

**Global install** (available in all projects):
```bash
curl -sSL https://raw.githubusercontent.com/YOUR_USERNAME/gemini-image-generator/main/install.sh | bash
```

**Project install** (available only in current project):
```bash
curl -sSL https://raw.githubusercontent.com/YOUR_USERNAME/gemini-image-generator/main/install.sh | bash -s local
```

### Claude.ai / Claude Cowork

1. Download this repo as a zip from GitHub (Code → Download ZIP)
2. Extract and rename the folder from `gemini-image-generator-main` to `gemini-image-generator`
3. Upload the folder to Claude via Settings → Capabilities

## Setup

Add your Google API key:

```bash
# For global install:
echo 'GOOGLE_API_KEY=your-key-here' > ~/.claude/skills/gemini-image-generator/.env

# For project install:
echo 'GOOGLE_API_KEY=your-key-here' > ./.claude/skills/gemini-image-generator/.env
```

Get a key from [Google AI Studio](https://aistudio.google.com/apikey).

## Usage

Ask Claude to generate an image:

> "Generate an image of a robot writing a blog post"

### Options

- **Filename**: "save it as robot.png"
- **Aspect ratio**: "make it 16:9" (options: `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`)
- **Output dir**: "save it to ./images/"
- **Reference images**: "edit this image" or "use this as a style reference"

### Image Editing & References

Edit existing images or use reference images for style transfer:

> "Add a party hat to ./cat.png"

> "Generate a portrait in the style of ./reference.jpg"

> "Create a group photo of the people in person1.jpg and person2.jpg at a beach"

Supports up to 14 reference images.

## Prompting Tips

**Describe the scene**, don't just list keywords. A narrative paragraph produces better results than disconnected words.

### Examples

**Photorealistic:**
> "A photorealistic close-up portrait of an elderly Japanese ceramicist with deep wrinkles and a warm smile, inspecting a freshly glazed tea bowl. Rustic workshop setting, golden hour light through window. 85mm portrait lens, soft bokeh."

**Stylized:**
> "A kawaii-style sticker of a happy red panda wearing a tiny bamboo hat, munching on a bamboo leaf. Bold outlines, simple cel-shading, vibrant colors. White background."

**Text/Logo:**
> "A modern, minimalist logo for a coffee shop called 'The Daily Grind'. Clean, bold sans-serif font. Black and white. Coffee bean integrated cleverly."

### Best Practices

- **Be specific**: Instead of "fantasy armor", describe "ornate elven plate armor, etched with silver leaf patterns, pauldrons shaped like falcon wings"
- **Iterate**: "Make the lighting warmer" or "change the expression to more serious"
- **Control the camera**: Use terms like "wide-angle shot", "macro shot", "low-angle perspective"

## License

MIT
