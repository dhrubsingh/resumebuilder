// SkillsForm.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const SkillsForm = ({ data, onUpdate }) => {
  const handleInputChange = (field, value) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages
          </label>
          <Textarea
            value={data.languages}
            onChange={(e) => handleInputChange('languages', e.target.value)}
            placeholder="English (Native), Spanish (Fluent), French (Intermediate)"
            className="h-24 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            List languages and proficiency levels, separated by commas
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Software & Technical Skills
          </label>
          <Textarea
            value={data.software}
            onChange={(e) => handleInputChange('software', e.target.value)}
            placeholder="Microsoft Office Suite, Adobe Creative Suite, Python, JavaScript"
            className="h-24 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            List software, tools, and programming languages you're proficient in
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Core Competencies
          </label>
          <Textarea
            value={data.competencies}
            onChange={(e) => handleInputChange('competencies', e.target.value)}
            placeholder="Project Management, Data Analysis, Customer Service Excellence, Digital Marketing"
            className="h-24 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            List your key professional competencies and soft skills
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications & Professional Development
          </label>
          <Textarea
            value={data.certifications}
            onChange={(e) => handleInputChange('certifications', e.target.value)}
            placeholder="PMP Certification, Google Analytics Certificate, Agile Scrum Master"
            className="h-24 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            List relevant certifications, training, and professional development achievements
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tips for Skills Section:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Use keywords relevant to your industry and target role</li>
            <li>• Be specific about technical skills and proficiency levels</li>
            <li>• Include both hard and soft skills</li>
            <li>• List the most relevant and impressive skills first</li>
            <li>• Keep descriptions concise but descriptive</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;