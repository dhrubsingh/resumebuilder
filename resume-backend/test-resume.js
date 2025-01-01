import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const testLatex = `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

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

% Section formatting
\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large}{}{0em}{}[\\titlerule \\vspace{-5pt}]

% Custom commands for consistent formatting
\\newcommand{\\resumeSubheading}[4]{
  \\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      #3 & #4 \\\\
    \\end{tabular*}\\vspace{-2pt}
}

\\newcommand{\\resumeItem}[1]{
    \\item {#1}
}

\\begin{document}

%-----------HEADING-----------
\\begin{center}
    \\textbf{\\Huge \\scshape John Doe} \\\\ \\vspace{1pt}
    \\small Toronto, ON $|$ 123-456-7890 $|$ 
    \\href{mailto:john@email.com}{john@email.com} $|$
    \\href{https://linkedin.com/in/johndoe}{\\underline{linkedin.com/in/johndoe}}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\resumeSubheading
      {University of Toronto}{2020 -- 2024}
      {Bachelor of Science in Computer Science}{GPA: 3.8/4.0}
\\end{itemize}

%-----------EXPERIENCE-----------
\\section{Experience}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\resumeSubheading
      {Software Engineer}{Jan 2023 -- Present}
      {Company Name}{Toronto, ON}
    \\begin{itemize}[leftmargin=0.2in]
        \\resumeItem{Developed and maintained web applications using React and Node.js}
        \\resumeItem{Improved application performance by 40\\% through optimization}
    \\end{itemize}
\\end{itemize}

\\end{document}`;

async function testPDFGeneration() {
  try {
    console.log('Sending request to generate PDF...');
    const response = await fetch('http://localhost:3001/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latex: testLatex }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to generate PDF: ${errorData.details}`);
    }

    // Save the PDF
    const pdfBuffer = await response.buffer();
    writeFileSync('test_resume.pdf', pdfBuffer);
    
    console.log('Resume PDF generated successfully! Check test_resume.pdf');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testPDFGeneration();