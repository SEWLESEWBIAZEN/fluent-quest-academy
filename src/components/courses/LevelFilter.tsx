
import React from 'react';
import { CourseLevel } from '@/contexts/CourseContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface LevelFilterProps {
  selectedLevel: CourseLevel | null;
  onChange: (value: CourseLevel | null) => void;
}

const LevelFilter: React.FC<LevelFilterProps> = ({ selectedLevel, onChange }) => {
  const levels: CourseLevel[] = ['beginner', 'intermediate', 'advanced'];
  
  const handleChange = (value: string) => {
    if (value === '') {
      onChange(null);
    } else {
      onChange(value as CourseLevel);
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
        {levels.map((level) => (
          <ToggleGroupItem 
            key={level} 
            value={level}
            className={`rounded-full px-4 py-2 text-sm ${
              level === 'beginner' 
                ? 'data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800' 
                : level === 'intermediate'
                ? 'data-[state=on]:bg-green-100 data-[state=on]:text-green-800'
                : 'data-[state=on]:bg-purple-100 data-[state=on]:text-purple-800'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default LevelFilter;
