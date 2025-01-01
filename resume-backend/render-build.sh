#!/usr/bin/env bash
# Install LaTeX
apt-get update
apt-get install -y texlive-latex-base texlive-fonts-recommended texlive-fonts-extra texlive-latex-extra

# Install dependencies
npm install