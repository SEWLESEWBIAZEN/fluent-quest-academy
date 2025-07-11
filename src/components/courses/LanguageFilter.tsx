
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Language } from '@/lib/types';

interface LanguageFilterProps {
  languages: Language[];
  selectedLanguage: string | null;
  onChange: (value: string) => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({
  languages,
  selectedLanguage,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-400">Languages</h3>
      <ToggleGroup type="single" value={selectedLanguage || ''} onValueChange={onChange} className="flex flex-wrap gap-2">
        <ToggleGroupItem value="" className="rounded-full px-4 py-2 text-sm">
          All
        </ToggleGroupItem>
        {languages.map((lang) => (
          <ToggleGroupItem 
            key={lang._id}
            value={lang._id}
            className="rounded-full px-4 py-2 text-sm"
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default LanguageFilter;
