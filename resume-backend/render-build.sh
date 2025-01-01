#!/bin/bash

echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Create a local bin directory
mkdir -p $HOME/.local/bin
export PATH="$HOME/.local/bin:$PATH"

# Download and install TeXLive installer
echo "Downloading TeXLive installer..."
wget https://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
tar -xzf install-tl-unx.tar.gz

# Find the extracted directory and cd into it
INSTALL_DIR=$(find . -maxdepth 1 -type d -name "install-tl-*" | head -n 1)
cd "$INSTALL_DIR" || exit 1

# Create a texlive.profile file
cat > texlive.profile << EOF
selected_scheme scheme-basic
TEXDIR $HOME/.texlive
TEXMFCONFIG $HOME/.texlive/texmf-config
TEXMFHOME $HOME/.texlive/texmf
TEXMFLOCAL $HOME/.texlive/texmf-local
TEXMFSYSCONFIG $HOME/.texlive/texmf-config
TEXMFSYSVAR $HOME/.texlive/texmf-var
TEXMFVAR $HOME/.texlive/texmf-var
option_doc 0
option_src 0
EOF

# Install TeXLive with the profile
perl ./install-tl --profile=texlive.profile

# Add TeXLive to PATH
export PATH="$HOME/.texlive/bin/x86_64-linux:$PATH"

# Verify pdflatex installation
which pdflatex || { echo "pdflatex not found in PATH"; exit 1; }
pdflatex --version || { echo "pdflatex version check failed"; exit 1; }

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
cd ..
npm install || { echo "Failed to install Node.js dependencies"; exit 1; }

echo "Build script completed successfully"