// PersonalInfoForm.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const PersonalInfoForm = ({ data, onUpdate }) => {
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
            Full Name
          </label>
          <Input
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Input
            value={data.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <Input
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john.doe@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <Input
            value={data.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;