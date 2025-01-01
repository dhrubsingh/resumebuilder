#!/bin/bash

echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Set up directories
TEXLIVE_DIR="/opt/render/project/texlive"
TEXMF_HOME="/opt/render/project/texmf"
mkdir -p $TEXLIVE_DIR
mkdir -p "$TEXMF_HOME/tex/latex/local"

# Download and extract TeXLive installer
cd /tmp
wget https://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
tar -xzf install-tl-unx.tar.gz
cd install-tl-20* || exit 1

# Create minimal profile
cat > texlive.profile << EOF
selected_scheme scheme-basic
TEXDIR $TEXLIVE_DIR
TEXMFCONFIG $TEXMF_HOME
TEXMFHOME $TEXMF_HOME
TEXMFLOCAL $TEXMF_HOME
TEXMFSYSCONFIG $TEXMF_HOME
TEXMFSYSVAR $TEXMF_HOME
TEXMFVAR $TEXMF_HOME
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
export PATH="$TEXLIVE_DIR/bin/x86_64-linux:$PATH"

# Write fullpage.sty directly
echo "Creating fullpage.sty..."
cat > "$TEXMF_HOME/tex/latex/local/fullpage.sty" << 'EOF'
\NeedsTeXFormat{LaTeX2e}
\ProvidesPackage{fullpage}[2024/01/01 v1.0 Simple full page package]
\setlength{\textwidth}{\paperwidth}
\addtolength{\textwidth}{-2in}
\setlength{\oddsidemargin}{0pt}
\setlength{\evensidemargin}{0pt}
\setlength{\textheight}{\paperheight}
\addtolength{\textheight}{-2in}
\setlength{\topmargin}{-0.5in}
\endinput
EOF

# Initialize and update tlmgr
$TEXLIVE_DIR/bin/x86_64-linux/tlmgr init-usertree
$TEXLIVE_DIR/bin/x86_64-linux/tlmgr option repository https://mirror.ctan.org/systems/texlive/tlnet
$TEXLIVE_DIR/bin/x86_64-linux/tlmgr update --self

# Install required packages
echo "Installing LaTeX packages..."
$TEXLIVE_DIR/bin/x86_64-linux/tlmgr install \
    latex-bin \
    latex \
    latexmk \
    titlesec \
    hyperref \
    geometry \
    graphics \
    graphics-def \
    xcolor \
    fancyhdr \
    fontawesome5 \
    enumitem \
    etoolbox \
    xkeyval \
    iftex \
    url \
    listings \
    tools \
    fancyhdr

# Update TeX database
echo "Updating TeX database..."
$TEXLIVE_DIR/bin/x86_64-linux/mktexlsr $TEXMF_HOME

# Create a test file to verify installation
echo "Testing LaTeX installation..."
TEST_DIR=$(mktemp -d)
cat > "$TEST_DIR/test.tex" << 'EOF'
\documentclass{article}
\usepackage{fullpage}
\usepackage{titlesec}
\begin{document}
Test document
\end{document}
EOF

# Test compilation
$TEXLIVE_DIR/bin/x86_64-linux/pdflatex -output-directory="$TEST_DIR" "$TEST_DIR/test.tex"

# Check if test compilation succeeded
if [ ! -f "$TEST_DIR/test.pdf" ]; then
    echo "LaTeX test compilation failed!"
    cat "$TEST_DIR/test.log"
    exit 1
fi

echo "LaTeX test compilation successful!"

# Clean up test directory
rm -rf "$TEST_DIR"

# Install Node.js dependencies
cd /opt/render/project/src/resume-backend || exit 1
echo "Installing Node.js dependencies..."
npm install || { echo "Failed to install Node.js dependencies"; exit 1; }

# Create symbolic link for pdflatex
mkdir -p /usr/local/bin || true
ln -sf "$TEXLIVE_DIR/bin/x86_64-linux/pdflatex" /usr/local/bin/pdflatex || true

echo "Build script completed successfully"