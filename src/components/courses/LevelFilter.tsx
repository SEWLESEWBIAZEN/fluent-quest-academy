
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useCourse } from '@/contexts/CourseContext';

interface LevelFilterProps {
  selectedLevel: string | null;
  onChange: (value: string | null) => void;
}

const LevelFilter: React.FC<LevelFilterProps> = ({ selectedLevel, onChange }) => {
 const {languageLevels} = useCourse();
  
  const handleChange = (value: string) => {
    if (value === '') {
      onChange(null);
    } else {
      onChange(value);
    }
  };



  return (
    <div className="mb-6">
      <h3 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-400">Level</h3>
      <ToggleGroup 
        type="single" 
        value={selectedLevel || ''} 
        onValueChange={handleChange}
        className="flex flex-wrap gap-2"
      >
        <ToggleGroupItem value="" className="rounded-full px-4 py-2 text-sm">
          All Levels
        </ToggleGroupItem>
        {languageLevels?.map((level) => (
          <ToggleGroupItem 
            key={level._id} 
            value={level._id}
            className={`rounded-full px-4 py-2 text-sm ${
              level?.name.toLocaleLowerCase() === 'beginner' 
                ? 'data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800' 
                : level?.name.toLocaleLowerCase() === 'intermediate'
                ? 'data-[state=on]:bg-green-100 data-[state=on]:text-green-800'
                : 'data-[state=on]:bg-purple-100 data-[state=on]:text-purple-800'
            }`}
          >
            {level?.name && level?.name?.charAt(0)?.toUpperCase() + level?.name?.slice(1)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default LevelFilter;
