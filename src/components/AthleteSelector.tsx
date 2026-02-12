import React, { useEffect, useState, useRef } from 'react';
import { Search, ChevronDown, User } from 'lucide-react';
export interface Athlete {
  id: string;
  name: string;
  existingPhoto?: string;
}
interface AthleteSelectorProps {
  athletes: Athlete[];
  selectedAthlete: Athlete | null;
  onSelect: (athlete: Athlete) => void;
}
export function AthleteSelector({
  athletes,
  selectedAthlete,
  onSelect
}: AthleteSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const filteredAthletes = athletes.filter(
    (athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
  const handleSelect = (athlete: Athlete) => {
    onSelect(athlete);
    setIsOpen(false);
    setSearchTerm('');
  };
  return (
    <div className="space-y-1.5" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700">
        Select Athlete
      </label>

      <div className="relative">
        <div
          className={`
            relative w-full cursor-pointer bg-white border rounded-md shadow-sm 
            pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 sm:text-sm
            ${isOpen ? 'border-gray-400 ring-1 ring-gray-400' : 'border-gray-300'}
          `}
          onClick={() => setIsOpen(!isOpen)}>

          {selectedAthlete ?
          <span className="block truncate">
              <span className="font-medium text-gray-900">
                {selectedAthlete.name}
              </span>
              <span className="ml-2 text-gray-400 text-xs">
                {selectedAthlete.id}
              </span>
            </span> :

          <span className="block truncate text-gray-500">
              Search by name...
            </span>
          }
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </div>

        {isOpen &&
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <div className="sticky top-0 bg-white px-2 py-1.5 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                type="text"
                className="block w-full pl-8 pr-3 py-1 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 sm:text-xs transition duration-150 ease-in-out"
                placeholder="Filter athletes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                onClick={(e) => e.stopPropagation()} />

              </div>
            </div>

            {filteredAthletes.length === 0 ?
          <div className="cursor-default select-none relative py-2 px-4 text-gray-500 italic">
                No athletes found
              </div> :

          filteredAthletes.map((athlete) =>
          <div
            key={athlete.id}
            className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 ${selectedAthlete?.id === athlete.id ? 'bg-gray-50' : ''}`}
            onClick={() => handleSelect(athlete)}>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {athlete.existingPhoto ?
                <img
                  src={athlete.existingPhoto}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover" /> :


                <User className="h-3.5 w-3.5" />
                }
                    </div>
                    <span className="ml-3 block truncate font-medium text-gray-900">
                      {athlete.name}
                    </span>
                    <span className="ml-2 text-gray-400 text-xs">
                      {athlete.id}
                    </span>
                  </div>
                </div>
          )
          }
          </div>
        }
      </div>
    </div>);

}