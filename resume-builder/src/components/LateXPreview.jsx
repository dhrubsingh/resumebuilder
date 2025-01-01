// LatexPreview.jsx
import React from 'react';

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
    \\textbf{\\Huge \\scshape ${formData.personalInfo.name}} \\\\ \\vspace{1pt}
    \\small ${[
      formData.personalInfo.location,
      `\\href{tel:${formData.personalInfo.phone}}{${formData.personalInfo.phone}}`,
      `\\href{mailto:${formData.personalInfo.email}}{${formData.personalInfo.email}}`,
      `\\href{${formData.personalInfo.linkedin}}{\\underline{${formData.personalInfo.linkedin.replace('https://', '')}}}`
    ].filter(Boolean).join(' $|$ ')}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
\\resumeSubHeadingListStart
${formData.education.map(edu => `
    \\resumeSubheading
      {${edu.school}}{${edu.location}}
      {${edu.degree}}{${edu.date}}
      ${edu.achievements.some(Boolean) ? `\\resumeItemListStart
        ${edu.achievements.filter(Boolean).map(achievement => `\\resumeItem{${achievement}}`).join('\n        ')}
      \\resumeItemListEnd` : ''}
`).join('\n')}
\\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\\section{Experience}
\\resumeSubHeadingListStart
${formData.experience.map(exp => `
    \\resumeSubheading
      {${exp.company}}{${exp.date}}
      {${exp.title}}{${exp.location}}
      ${exp.achievements.some(Boolean) ? `\\resumeItemListStart
        ${exp.achievements.filter(Boolean).map(achievement => `\\resumeItem{${achievement}}`).join('\n        ')}
      \\resumeItemListEnd` : ''}
`).join('\n')}
\\resumeSubHeadingListEnd

%-----------LEADERSHIP \\& AWARDS-----------
\\section{Leadership \\& Awards}
\\resumeSubHeadingListStart
${formData.awards.map(award => `
    \\resumeProjectHeading
        {\\textbf{${award.title}} $|$ \\emph{${award.organization}}}{${award.year}}`
).join('\n')}
\\resumeSubHeadingListEnd

%-----------SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: ${formData.skills.languages}} \\\\
     \\textbf{Software}{: ${formData.skills.software}} \\\\
     \\textbf{Core Competencies}{: ${formData.skills.competencies}} \\\\
     \\textbf{}
    }}
\\end{itemize}

\\end{document}`};

  return (
    <pre className="text-xs whitespace-pre-wrap overflow-auto h-[600px] font-mono bg-gray-50 p-4 rounded">
      {generateLatex()}
    </pre>
  );
};

export default LatexPreview;
