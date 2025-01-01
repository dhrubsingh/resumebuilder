// ResumePreview.jsx
import React from 'react';

// CSS to import Computer Modern font - add this to your global CSS
// @import url('https://cdn.jsdelivr.net/npm/computer-modern-latex-font@1.0.0/fonts/Serif/cmun-serif.css');

const ResumePreview = ({ formData }) => {
  const { personalInfo, education, experience, awards, skills } = formData;
  
  return (
    <div className="min-h-[600px] bg-white p-8 text-black font-['Computer_Modern_Serif'] text-[11pt] max-w-[8.5in] leading-normal">
      {/* Header/Name */}
      <div className="text-center mb-6">
        <h1 className="text-[24pt] font-normal uppercase tracking-wide mb-1 font-['Computer_Modern_Serif']">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="text-[10pt] leading-normal">
          {[
            personalInfo.location,
            personalInfo.phone,
            personalInfo.email,
            <a key="linkedin" href={personalInfo.linkedin} className="underline">
              {personalInfo.linkedin?.replace('https://', '')}
            </a>
          ].filter(Boolean).join(' | ')}
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-4">
        <h2 className="text-[14pt] font-normal tracking-wide border-b border-black pb-[2pt] mb-[8pt] uppercase">
          Education
        </h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <div className="font-bold">{edu.school}</div>
              <div>{edu.location}</div>
            </div>
            <div className="flex justify-between items-baseline -mt-[2pt]">
              <div className="italic text-[10pt]">{edu.degree}</div>
              <div className="italic text-[10pt]">{edu.date}</div>
            </div>
            {edu.achievements.some(Boolean) && (
              <ul className="list-none pl-4 mt-1">
                {edu.achievements.filter(Boolean).map((achievement, i) => (
                  <li key={i} className="flex items-start text-[10pt] leading-normal mb-[2pt]">
                    <span className="inline-block w-[3px] h-[3px] bg-black rounded-full mr-[6pt] mt-[8pt] shrink-0"></span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="mb-4">
        <h2 className="text-[14pt] font-normal tracking-wide border-b border-black pb-[2pt] mb-[8pt] uppercase">
          Experience
        </h2>
        {experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <div className="font-bold">{exp.company}</div>
              <div>{exp.date}</div>
            </div>
            <div className="flex justify-between items-baseline -mt-[2pt]">
              <div className="italic text-[10pt]">{exp.title}</div>
              <div className="italic text-[10pt]">{exp.location}</div>
            </div>
            {exp.achievements.some(Boolean) && (
              <ul className="list-none pl-4 mt-1">
                {exp.achievements.filter(Boolean).map((achievement, i) => (
                  <li key={i} className="flex items-start text-[10pt] leading-normal mb-[2pt]">
                    <span className="inline-block w-[3px] h-[3px] bg-black rounded-full mr-[6pt] mt-[8pt] shrink-0"></span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Awards Section */}
      <div className="mb-4">
        <h2 className="text-[14pt] font-normal tracking-wide border-b border-black pb-[2pt] mb-[8pt] uppercase">
          Leadership & Awards
        </h2>
        <div className="space-y-[2pt]">
          {awards.map((award, index) => (
            <div key={index} className="flex justify-between items-baseline text-[10pt]">
              <span>
                <span className="font-bold">{award.title}</span>
                {award.organization && (
                  <span className="italic"> | {award.organization}</span>
                )}
              </span>
              <span>{award.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <h2 className="text-[14pt] font-normal tracking-wide border-b border-black pb-[2pt] mb-[8pt] uppercase">
          Technical Skills
        </h2>
        <div className="text-[10pt] leading-snug pl-[0.15in]">
          {skills.languages && (
            <div>
              <span className="font-bold">Languages: </span>
              {skills.languages}
            </div>
          )}
          {skills.software && (
            <div>
              <span className="font-bold">Software: </span>
              {skills.software}
            </div>
          )}
          {skills.competencies && (
            <div>
              <span className="font-bold">Core Competencies: </span>
              {skills.competencies}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;