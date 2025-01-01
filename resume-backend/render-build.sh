#!/usr/bin/env bash

# Update package list and install required packages
apt-get update
apt-get install -y \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-latex-extra

# Verify pdflatex installation
which pdflatex
pdflatex --version

# Install Node.js dependencies
npm install