#!/bin/bash

echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Create a temporary directory for downloading TeX Live
TEMP_DIR="/tmp/texlive"
mkdir -p $TEMP_DIR
cd $TEMP_DIR

# Download TeX Live installer
wget https://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
tar -xzf install-tl-unx.tar.gz
cd install-tl-*

# Create a configuration file for non-interactive installation
cat > texlive.profile << EOF
selected_scheme scheme-basic
TEXDIR /opt/render/texlive
TEXMFCONFIG ~/.texlive/texmf-config
TEXMFHOME ~/texmf
TEXMFLOCAL /opt/render/texlive/texmf-local
TEXMFSYSCONFIG /opt/render/texlive/texmf-config
TEXMFSYSVAR /opt/render/texlive/texmf-var
TEXMFVAR ~/.texlive/texmf-var
binary_x86_64-linux 1
instopt_adjustpath 1
instopt_adjustrepo 1
instopt_letter 0
instopt_portable 0
instopt_write18_restricted 1
tlpdbopt_autobackup 0
tlpdbopt_create_formats 1
tlpdbopt_generate_updmap 0
tlpdbopt_install_docfiles 0
tlpdbopt_install_srcfiles 0
EOF

# Run installation
./install-tl --profile=texlive.profile

# Add TeX Live to PATH
export PATH="/opt/render/texlive/bin/x86_64-linux:$PATH"

# Install required LaTeX packages
tlmgr install latex-bin latex xetex

# Create symbolic link
mkdir -p /usr/local/bin
ln -sf /opt/render/texlive/bin/x86_64-linux/pdflatex /usr/local/bin/pdflatex

# Verify installation
which pdflatex
pdflatex --version

# Install Node.js dependencies
cd /opt/render/project/src
echo "Installing Node.js dependencies..."
npm install || { echo "Failed to install Node.js dependencies"; exit 1; }

echo "Build script completed successfully"