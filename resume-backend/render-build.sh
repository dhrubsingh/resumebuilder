#!/bin/bash

# Add environment check
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Update package list and install required packages
echo "Updating package list..."
apt-get update || { echo "Failed to update package list"; exit 1; }

echo "Installing LaTeX packages..."
apt-get install -y \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-latex-extra || { echo "Failed to install LaTeX packages"; exit 1; }

# Verify pdflatex installation and location
echo "Verifying pdflatex installation..."
which pdflatex || { echo "pdflatex not found in PATH"; exit 1; }
pdflatex --version || { echo "pdflatex version check failed"; exit 1; }

# Set executable permission for pdflatex
chmod +x $(which pdflatex) || { echo "Failed to set pdflatex permissions"; exit 1; }

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install || { echo "Failed to install Node.js dependencies"; exit 1; }

echo "Build script completed successfully"