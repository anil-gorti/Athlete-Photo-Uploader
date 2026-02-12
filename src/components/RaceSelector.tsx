import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Trophy } from 'lucide-react';
export interface Race {
  id: string;
  name: string;
}
interface RaceSelectorProps {
  races: Race[];
  selectedRace: Race | null;
  onSelect: (race: Race) => void;
  disabled?: boolean;
}
export function RaceSelector({
  races,
  selectedRace,
  onSelect,
  disabled
}: RaceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSelect = (race: Race) => {
    onSelect(race);
    setIsOpen(false);
  };
  return (
    <div className="space-y-1.5" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700">
        Select Race
      </label>

      <div className="relative">
        <div
          className={`
            relative w-full bg-white border rounded-md shadow-sm 
            pl-3 pr-10 py-2 text-left sm:text-sm
            ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400'}
            ${isOpen && !disabled ? 'border-gray-400 ring-1 ring-gray-400' : 'border-gray-300'}
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}>

          {selectedRace ?
          <span className="block truncate">
              <span className="font-medium text-gray-900">
                {selectedRace.name}
              </span>
            </span> :

          <span className="block truncate text-gray-500">
              Choose a race...
            </span>
          }
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </div>

        {isOpen && !disabled &&
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {races.map((race) =>
          <div
            key={race.id}
            className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 ${selectedRace?.id === race.id ? 'bg-gray-50' : ''}`}
            onClick={() => handleSelect(race)}>

                <div className="flex items-center">
                  <Trophy className="flex-shrink-0 h-4 w-4 text-gray-400" />
                  <span className="ml-2.5 block truncate text-gray-900">
                    {race.name}
                  </span>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </div>);

}