#!/bin/bash

# Add environment check
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Create a temporary directory with write permissions
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

# Update package list and install required packages
echo "Installing LaTeX packages..."
apt-get update -y || { echo "Failed to update package list"; exit 1; }

DEBIAN_FRONTEND=noninteractive apt-get install -y \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-latex-extra

# Verify pdflatex installation
which pdflatex || { echo "pdflatex not found in PATH"; exit 1; }
pdflatex --version || { echo "pdflatex version check failed"; exit 1; }

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install || { echo "Failed to install Node.js dependencies"; exit 1; }

echo "Build script completed successfully"