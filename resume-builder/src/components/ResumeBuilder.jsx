import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
      competencies: ''
    }
  });

  const [showLatex, setShowLatex] = useState(false);

  const handlePersonalInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const generateLatex = () => {
    return `\\documentclass[letterpaper,11pt]{article}

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

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${formData.personalInfo.name || 'Your Name'}} \\\\ \\vspace{1pt}
    \\small ${[
      formData.personalInfo.location,
      formData.personalInfo.phone,
      formData.personalInfo.email,
      formData.personalInfo.linkedin
    ].filter(Boolean).join(' $|$ ')}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
\\begin{itemize}[leftmargin=0.15in, label={}]
${formData.education.map(edu => `
    \\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{${edu.school || '(School Name)'}} & ${edu.location || '(Location)'} \\\\
      ${edu.degree || '(Degree)'} & ${edu.date || '(Date)'} \\\\
    \\end{tabular*}\\vspace{-2pt}
`).join('\n')}
\\end{itemize}

\\end{document}`;
  };

  const handleGeneratePDF = async () => {
    try {
      const latex = generateLatex();
      console.log('Sending LaTeX:', latex); // Debug log
      
      const response = await fetch('http://localhost:3001/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex }),
      });

      if (!response.ok) {
        const errorData = await response.json();
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
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const ResumePreview = () => {
    const { personalInfo, education } = formData;
    
    return (
      <div className="min-h-[600px] bg-white p-8 shadow rounded">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{personalInfo.name || 'Your Name'}</h1>
          <div className="text-sm text-gray-600">
            {[
              personalInfo.location,
              personalInfo.phone,
              personalInfo.email,
              personalInfo.linkedin
            ].filter(Boolean).join(' | ') || 'Location | Phone | Email | LinkedIn'}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold">{edu.school || '(School Name)'}</span>
                <span className="text-gray-600">{edu.location || '(Location)'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{edu.degree || '(Degree)'}</span>
                <span className="text-gray-600">{edu.date || '(Date)'}</span>
              </div>
              {edu.gpa && <div className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 min-h-screen p-6">
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
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      value={formData.personalInfo.name}
                      onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <Input
                      value={formData.personalInfo.location}
                      onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input
                      value={formData.personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      value={formData.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <Input
                      value={formData.personalInfo.linkedin}
                      onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            {showLatex ? (
              <pre className="text-xs whitespace-pre-wrap overflow-auto h-[600px] font-mono bg-gray-50 p-4 rounded">
                {generateLatex()}
              </pre>
            ) : (
              <ResumePreview />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;