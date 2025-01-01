#!/bin/bash

echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Create a temporary directory for downloading TeX Live
TEMP_DIR="/tmp/texlive"
mkdir -p $TEMP_DIR
cd $TEMP_DIR || exit 1

# Download TeX Live installer
wget https://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
tar -xzf install-tl-unx.tar.gz
cd install-tl-20* || exit 1  # Use wildcard to match the extracted directory

# Create a configuration file for non-interactive installation
cat > texlive.profile << EOF
selected_scheme scheme-basic
TEXDIR /opt/render/project/texlive
TEXMFCONFIG \$TEXMFSYSCONFIG
TEXMFHOME \$TEXMFLOCAL
TEXMFLOCAL /opt/render/project/texlive/texmf-local
TEXMFSYSCONFIG /opt/render/project/texlive/texmf-config
TEXMFSYSVAR /opt/render/project/texlive/texmf-var
TEXMFVAR \$TEXMFSYSVAR
binary_x86_64-linux 1
instopt_adjustpath 0
instopt_adjustrepo 1
instopt_letter 0
instopt_portable 1
instopt_write18_restricted 1
tlpdbopt_autobackup 0
tlpdbopt_create_formats 1
tlpdbopt_generate_updmap 0
tlpdbopt_install_docfiles 0
tlpdbopt_install_srcfiles 0
EOF

# Run installation
perl ./install-tl --profile=texlive.profile

# Add TeX Live to PATH
export PATH="/opt/render/project/texlive/bin/x86_64-linux:$PATH"

# Go back to the project directory
cd /opt/render/project/src/resume-backend || exit 1

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install || { echo "Failed to install Node.js dependencies"; exit 1; }

# Update the server.js file to use the correct pdflatex path
sed -i "s|pdflatexPath = .*|pdflatexPath = '/opt/render/project/texlive/bin/x86_64-linux/pdflatex';|" server.js

echo "Build script completed successfully"