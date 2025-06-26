// LatexPreview.jsx
import React from 'react';

// Function to escape LaTeX special characters
const escapeLatex = (text) => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')  // Escape backslashes
    .replace(/\{/g, '\\{')               // Escape opening braces
    .replace(/\}/g, '\\}')               // Escape closing braces
    .replace(/\$/g, '\\$')               // Escape dollar signs
    .replace(/\&/g, '\\&')               // Escape ampersands
    .replace(/\#/g, '\\#')               // Escape hash symbols
    .replace(/\^/g, '\\textasciicircum{}') // Escape caret
    .replace(/\_/g, '\\_')               // Escape underscores
    .replace(/\~/g, '\\textasciitilde{}') // Escape tilde
    .replace(/\%/g, '\\%')               // Escape percent signs
    .replace(/\|/g, '\\textbar{}');      // Escape pipe symbols
};

const LatexPreview = ({ formData }) => {
  const generateLatex = () => {
    return `%-------------------------
% Resume in Latex
% Based off of previous template
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[label=$\\vcenter{\\hbox{\\tiny$\\bullet$}}$]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(formData.personalInfo.name)}} \\\\ \\vspace{1pt}
    \\small ${[
      escapeLatex(formData.personalInfo.location),
      `\\href{tel:${escapeLatex(formData.personalInfo.phone)}}{${escapeLatex(formData.personalInfo.phone)}}`,
      `\\href{mailto:${escapeLatex(formData.personalInfo.email)}}{${escapeLatex(formData.personalInfo.email)}}`,
      `\\href{${escapeLatex(formData.personalInfo.linkedin)}}{\\underline{${escapeLatex(formData.personalInfo.linkedin.replace('https://', ''))}}}`
    ].filter(Boolean).join(' $|$ ')}
\\end{center}

${formData.summary ? `\\vspace{2pt}
\\noindent\\textit{${escapeLatex(formData.summary)}}
\\vspace{8pt}` : ''}

%-----------EDUCATION-----------
\\section{Education}
\\resumeSubHeadingListStart
${formData.education.map(edu => `
    \\resumeSubheading
      {${escapeLatex(edu.school)}}{${escapeLatex(edu.location)}}
      {${escapeLatex(edu.degree)}}{${escapeLatex(edu.date)}}
      ${edu.achievements.some(Boolean) ? `\\resumeItemListStart
        ${edu.achievements.filter(Boolean).map(achievement => `\\resumeItem{${escapeLatex(achievement)}}`).join('\n        ')}
      \\resumeItemListEnd` : ''}
`).join('\n')}
\\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\\section{Experience}
\\resumeSubHeadingListStart
${formData.experience.map(exp => `
    \\resumeSubheading
      {${escapeLatex(exp.company)}}{${escapeLatex(exp.date)}}
      {${escapeLatex(exp.title)}}{${escapeLatex(exp.location)}}
      ${exp.achievements.some(Boolean) ? `\\resumeItemListStart
        ${exp.achievements.filter(Boolean).map(achievement => `\\resumeItem{${escapeLatex(achievement)}}`).join('\n        ')}
      \\resumeItemListEnd` : ''}
`).join('\n')}
\\resumeSubHeadingListEnd

%-----------LEADERSHIP \\& AWARDS-----------
\\section{Leadership \\& Awards}
\\resumeSubHeadingListStart
${formData.awards.map(award => `
    \\resumeProjectHeading
        {\\textbf{${escapeLatex(award.title)}} $|$ \\emph{${escapeLatex(award.organization)}}}{${escapeLatex(award.year)}}`
).join('\n')}
\\resumeSubHeadingListEnd

%-----------SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: ${escapeLatex(formData.skills.languages)}} \\\\
     \\textbf{Software}{: ${escapeLatex(formData.skills.software)}} \\\\
     \\textbf{Core Competencies}{: ${escapeLatex(formData.skills.competencies)}} \\\\
     \\textbf{}
    }}
\\end{itemize}

\\end{document}`;
  };

  return (
    <pre className="text-xs whitespace-pre-wrap overflow-auto h-[600px] font-mono bg-gray-50 p-4 rounded">
      {generateLatex()}
    </pre>
  );
};

export default LatexPreview;
