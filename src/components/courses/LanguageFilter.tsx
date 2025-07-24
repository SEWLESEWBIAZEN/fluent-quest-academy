
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Language } from '@/lib/types';
import ReactCountryFlag from 'react-country-flag';

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
  if (!languages || languages.length === 0) {
    return null; // No languages to display
  }

  const seen = new Set<string>();
  const uniqueLanguages = languages?.filter((lang) => {
    const isDuplicate = seen.has(lang.name);
    seen.add(lang.name);
    return !isDuplicate;
  });

  
  return (
    <div className="mb-6">
      <h3 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-400">Languages</h3>
      <ToggleGroup type="single" value={selectedLanguage || ''} onValueChange={onChange} className="flex flex-wrap gap-2">
        <ToggleGroupItem value="" className="rounded-full px-4 py-2 text-sm">
          All
        </ToggleGroupItem>
        {uniqueLanguages.map((lang) => (
          <ToggleGroupItem 
            key={lang._id}
            value={lang._id}
            className="rounded-full px-4 py-2 text-sm"
          >
            <ReactCountryFlag
            countryCode={lang?.flag || "US"}
            svg
            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
            cdnSuffix="svg"
            title={lang?.flag || "US"}
            width={24}
            height={12}
            />
            {lang.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default LanguageFilter;
