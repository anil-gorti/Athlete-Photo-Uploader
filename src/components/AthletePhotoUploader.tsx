import React, { useEffect, useState, memo } from 'react';
import { AthleteSelector, Athlete } from './AthleteSelector';
import { RaceSelector, Race } from './RaceSelector';
import { PhotoDropzone } from './PhotoDropzone';
import { StatusIndicator, UploadStatus } from './StatusIndicator';
import { RotateCcw, Save } from 'lucide-react';
// Mock Data
const MOCK_ATHLETES: Athlete[] = [
{
  id: 'ATH-1001',
  name: 'Arpita Bhat'
},
{
  id: 'ATH-1002',
  name: 'Deepak Kumar'
},
{
  id: 'ATH-1003',
  name: 'Madhu Bala'
},
{
  id: 'ATH-1004',
  name: 'Niyati Kotian'
},
{
  id: 'ATH-1005',
  name: 'Uttam Mallya'
}];

const MOCK_RACES: Race[] = [
{
  id: 'RACE-01',
  name: 'Bangalore Ultra 2025'
},
{
  id: 'RACE-02',
  name: 'Bengaluru 10K Challenge 2025'
},
{
  id: 'RACE-03',
  name: 'Kodagu Monsoon Half Marathon 2025'
},
{
  id: 'RACE-04',
  name: 'Wipro Bengaluru Marathon 2025'
}];

export function AthletePhotoUploader() {
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [isSaving, setIsSaving] = useState(false);
  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith('http')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  const handleAthleteSelect = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setSelectedRace(null);
    setUploadedFile(null);
    setStatus('idle');
    if (athlete.existingPhoto) {
      setPreviewUrl(athlete.existingPhoto);
      setStatus('no-photo');
    } else {
      setPreviewUrl(null);
      setStatus('no-photo');
    }
  };
  const handleRaceSelect = (race: Race) => {
    setSelectedRace(race);
  };
  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setStatus('pending');
  };
  const handleSave = () => {
    if (!selectedAthlete || !selectedRace || !uploadedFile) return;
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setStatus('success');
      // In a real app, we'd update the athlete's record here
    }, 1500);
  };
  const handleClear = () => {
    setSelectedAthlete(null);
    setSelectedRace(null);
    setUploadedFile(null);
    setPreviewUrl(null);
    setStatus('idle');
    setIsSaving(false);
  };
  const isSaveDisabled =
  !selectedAthlete ||
  !selectedRace ||
  !uploadedFile ||
  isSaving ||
  status === 'success';
  const showClear = selectedAthlete !== null || uploadedFile !== null;
  return (
    <div className="w-full max-w-lg bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Athlete Photo Uploader
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload or update an athlete's race photos
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <AthleteSelector
            athletes={MOCK_ATHLETES}
            selectedAthlete={selectedAthlete}
            onSelect={handleAthleteSelect} />


          {selectedAthlete &&
          <RaceSelector
            races={MOCK_RACES}
            selectedRace={selectedRace}
            onSelect={handleRaceSelect} />

          }

          <PhotoDropzone
            onFileSelect={handleFileSelect}
            previewUrl={previewUrl}
            disabled={!selectedAthlete || !selectedRace}
            isExistingPhoto={!!selectedAthlete?.existingPhoto && !uploadedFile} />


          <p className="text-xs text-gray-400">
            You can upload up to 5 photos at a time. JPG or PNG only.
          </p>

          {status !== 'idle' && <StatusIndicator status={status} />}
        </div>

        {/* Actions Footer */}
        <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-2">
          {
          showClear ?
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-50 transition-colors">

                <RotateCcw className="w-3.5 h-3.5" />
                Clear / Reset
              </button> :

          <div></div>
          // Spacer
          }

          <button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all
              ${isSaveDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800 border border-transparent'}
            `}>

            {isSaving ?
            <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </> :

            <>
                <Save className="w-4 h-4" />
                Save Photo
              </>
            }
          </button>
        </div>
      </div>
    </div>);

}