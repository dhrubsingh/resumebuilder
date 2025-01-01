// ResumeBuilder.jsx
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import AwardsForm from './AwardsForm';
import SkillsForm from './SkillsForm';
import LatexPreview from './LateXPreview';
import ResumePreview from './ResumePreview';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      location: '',
      phone: '',
      email: '',
      linkedin: ''
    },
    education: [{
      school: '',
      location: '',
      degree: '',
      date: '',
      gpa: '',
      achievements: ['', '', '']
    }],
    experience: [{
      company: '',
      title: '',
      location: '',
      date: '',
      achievements: ['', '', '', '']
    }],
    awards: [{
      title: '',
      organization: '',
      year: ''
    }],
    skills: {
      languages: '',
      software: '',
      competencies: '',
      certifications: ''
    }
  });

  const [showLatex, setShowLatex] = useState(false);

  const handleFormUpdate = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

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

\\end{document}`;
  };

  const handleGeneratePDF = async () => {
    try {
      console.log('Attempting to generate PDF...');
      console.log('API URL:', import.meta.env.VITE_API_URL); // Add this line
      const latex = generateLatex();
      
      // Add this log to see the LaTeX content
      console.log('LaTeX content length:', latex.length);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/compile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData); // Add this line
        throw new Error(errorData.details || 'Failed to generate PDF');
      }

      const pdfBlob = await response.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLatex(!showLatex)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                showLatex ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                  showLatex ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm text-gray-700">
              {showLatex ? 'Show LaTeX' : 'Show Preview'}
            </span>
          </div>
          <Button 
            onClick={handleGeneratePDF} 
            variant="outline"
          >
            Generate PDF
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfoForm 
                data={formData.personalInfo}
                onUpdate={(data) => handleFormUpdate('personalInfo', data)}
              />
            </TabsContent>

            <TabsContent value="education">
              <EducationForm 
                data={formData.education}
                onUpdate={(data) => handleFormUpdate('education', data)}
              />
            </TabsContent>

            <TabsContent value="experience">
              <ExperienceForm 
                data={formData.experience}
                onUpdate={(data) => handleFormUpdate('experience', data)}
              />
            </TabsContent>

            <TabsContent value="awards">
              <AwardsForm 
                data={formData.awards}
                onUpdate={(data) => handleFormUpdate('awards', data)}
              />
            </TabsContent>

            <TabsContent value="skills">
              <SkillsForm 
                data={formData.skills}
                onUpdate={(data) => handleFormUpdate('skills', data)}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            {showLatex ? (
              <LatexPreview formData={formData} />
            ) : (
              <ResumePreview formData={formData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;