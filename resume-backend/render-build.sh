#!/bin/bash

echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Create the installation directory
TEXLIVE_DIR="/opt/texlive"
sudo mkdir -p $TEXLIVE_DIR
sudo chown -R $USER:$USER $TEXLIVE_DIR

echo "Installing TeX Live..."
# Install required packages
sudo apt-get update
sudo apt-get install -y \
    wget \
    perl \
    fontconfig \
    texlive-base \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended

# Verify pdflatex installation and get its path
PDFLATEX_PATH=$(which pdflatex)
echo "pdflatex path: $PDFLATEX_PATH"
$PDFLATEX_PATH --version

# Create a symbolic link to ensure the path is consistent
sudo ln -sf $PDFLATEX_PATH /usr/local/bin/pdflatex

# Update server.js to use the new path
sed -i "s|pdflatexPath = .*|pdflatexPath = '/usr/local/bin/pdflatex';|" server.js

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install || { echo "Failed to install Node.js dependencies"; exit 1; }

echo "Build script completed successfully"