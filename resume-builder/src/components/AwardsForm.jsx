// AwardsForm.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const AwardsForm = ({ data, onUpdate }) => {
  const handleInputChange = (index, field, value) => {
    const newAwards = [...data];
    newAwards[index] = {
      ...newAwards[index],
      [field]: value
    };
    onUpdate(newAwards);
  };

  const addAward = () => {
    onUpdate([...data, {
      title: '',
      organization: '',
      year: ''
    }]);
  };

  const removeAward = (index) => {
    const newAwards = data.filter((_, i) => i !== index);
    onUpdate(newAwards);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        {data.map((award, index) => (
          <div key={index} className="relative border rounded-lg p-4">
            <button
              onClick={() => removeAward(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Award Title
                </label>
                <Input
                  value={award.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  placeholder="Excellence in Innovation Award"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization
                </label>
                <Input
                  value={award.organization}
                  onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                  placeholder="Organization Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <Input
                  value={award.year}
                  onChange={(e) => handleInputChange(index, 'year', e.target.value)}
                  placeholder="2024"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full mt-4"
          onClick={addAward}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Award
        </Button>
      </CardContent>
    </Card>
  );
};

export default AwardsForm;