// EducationForm.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ data, onUpdate }) => {
  const handleInputChange = (index, field, value) => {
    const newEducation = [...data];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    onUpdate(newEducation);
  };

  const handleAchievementChange = (eduIndex, achievementIndex, value) => {
    const newEducation = [...data];
    newEducation[eduIndex].achievements[achievementIndex] = value;
    onUpdate(newEducation);
  };

  const addEducation = () => {
    onUpdate([...data, {
      school: '',
      location: '',
      degree: '',
      date: '',
      gpa: '',
      achievements: ['', '', '']
    }]);
  };

  const removeEducation = (index) => {
    const newEducation = data.filter((_, i) => i !== index);
    onUpdate(newEducation);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        {data.map((education, eduIndex) => (
          <div key={eduIndex} className="relative border rounded-lg p-4">
            <button
              onClick={() => removeEducation(eduIndex)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School
                </label>
                <Input
                  value={education.school}
                  onChange={(e) => handleInputChange(eduIndex, 'school', e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Input
                  value={education.location}
                  onChange={(e) => handleInputChange(eduIndex, 'location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree
                </label>
                <Input
                  value={education.degree}
                  onChange={(e) => handleInputChange(eduIndex, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <Input
                  value={education.date}
                  onChange={(e) => handleInputChange(eduIndex, 'date', e.target.value)}
                  placeholder="Aug 2020 - June 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA
                </label>
                <Input
                  value={education.gpa}
                  onChange={(e) => handleInputChange(eduIndex, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievements
              </label>
              {education.achievements.map((achievement, achievementIndex) => (
                <div key={achievementIndex} className="mb-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(eduIndex, achievementIndex, e.target.value)}
                    placeholder={`Achievement ${achievementIndex + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full mt-4"
          onClick={addEducation}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationForm;