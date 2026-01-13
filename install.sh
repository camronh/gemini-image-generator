#!/bin/bash
# Gemini Image Generator - Install Script
# Usage: curl -sSL https://raw.githubusercontent.com/YOUR_USERNAME/gemini-image-generator/main/install.sh | bash
#        curl -sSL ... | bash -s local  # Install to current project instead of global

set -e

if [ "$1" = "local" ]; then
  SKILL_DIR="./.claude/skills/gemini-image-generator"
  echo "Installing to project: $SKILL_DIR"
else
  SKILL_DIR="$HOME/.claude/skills/gemini-image-generator"
  echo "Installing globally: $SKILL_DIR"
fi

# Backup existing .env if present
if [ -f "$SKILL_DIR/.env" ]; then
  cp "$SKILL_DIR/.env" "$SKILL_DIR/.env.backup"
  echo "Backed up existing .env file"
fi

mkdir -p "$SKILL_DIR"

echo "Downloading..."
curl -sSL https://github.com/YOUR_USERNAME/gemini-image-generator/archive/main.tar.gz | \
  tar -xz --strip-components=1 -C "$SKILL_DIR"

# Restore .env if it was backed up
if [ -f "$SKILL_DIR/.env.backup" ]; then
  mv "$SKILL_DIR/.env.backup" "$SKILL_DIR/.env"
  echo "Restored .env file"
fi

echo "Installing dependencies..."
cd "$SKILL_DIR" && npm install --silent

echo ""
echo "Done! Skill installed to: $SKILL_DIR"
echo ""
echo "Next: Add your Google API key"
echo "  echo 'GOOGLE_API_KEY=your-key-here' > $SKILL_DIR/.env"
