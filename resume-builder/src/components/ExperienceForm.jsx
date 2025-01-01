// ExperienceForm.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ data, onUpdate }) => {
  const handleInputChange = (index, field, value) => {
    const newExperience = [...data];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    onUpdate(newExperience);
  };

  const handleAchievementChange = (expIndex, achievementIndex, value) => {
    const newExperience = [...data];
    newExperience[expIndex].achievements[achievementIndex] = value;
    onUpdate(newExperience);
  };

  const addExperience = () => {
    onUpdate([...data, {
      company: '',
      title: '',
      location: '',
      date: '',
      achievements: ['', '', '', '']
    }]);
  };

  const removeExperience = (index) => {
    const newExperience = data.filter((_, i) => i !== index);
    onUpdate(newExperience);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        {data.map((experience, expIndex) => (
          <div key={expIndex} className="relative border rounded-lg p-4">
            <button
              onClick={() => removeExperience(expIndex)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <Input
                  value={experience.company}
                  onChange={(e) => handleInputChange(expIndex, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={experience.title}
                  onChange={(e) => handleInputChange(expIndex, 'title', e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Input
                  value={experience.location}
                  onChange={(e) => handleInputChange(expIndex, 'location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <Input
                  value={experience.date}
                  onChange={(e) => handleInputChange(expIndex, 'date', e.target.value)}
                  placeholder="Jan 2023 - Present"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievements/Responsibilities
              </label>
              {experience.achievements.map((achievement, achievementIndex) => (
                <div key={achievementIndex} className="mb-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(expIndex, achievementIndex, e.target.value)}
                    placeholder={`• Achievement ${achievementIndex + 1}`}
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
          onClick={addExperience}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;