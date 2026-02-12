import React, { useEffect, useState, memo } from 'react';
import { AthleteSelector, Athlete } from './AthleteSelector';
import { PhotoDropzone } from './PhotoDropzone';
import { StatusIndicator, UploadStatus } from './StatusIndicator';
import { RotateCcw, Save } from 'lucide-react';
// Mock Data
const MOCK_ATHLETES: Athlete[] = [
{
  id: 'ATH-1042',
  name: 'Marcus Johnson',
  existingPhoto:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
},
{
  id: 'ATH-1087',
  name: 'Serena Williams'
},
{
  id: 'ATH-2091',
  name: 'David Chen',
  existingPhoto:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
},
{
  id: 'ATH-3012',
  name: 'Sarah Miller'
},
{
  id: 'ATH-3045',
  name: 'James Wilson'
},
{
  id: 'ATH-4102',
  name: 'Emily Davis',
  existingPhoto:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
},
{
  id: 'ATH-5021',
  name: 'Michael Brown'
},
{
  id: 'ATH-6098',
  name: 'Jessica Taylor'
},
{
  id: 'ATH-7123',
  name: 'Robert Anderson'
},
{
  id: 'ATH-8234',
  name: 'Lisa Thomas'
}];

export function AthletePhotoUploader() {
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
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
    setUploadedFile(null);
    setStatus('idle');
    if (athlete.existingPhoto) {
      setPreviewUrl(athlete.existingPhoto);
      setStatus('no-photo'); // Technically no *new* photo uploaded yet
    } else {
      setPreviewUrl(null);
      setStatus('no-photo');
    }
  };
  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setStatus('pending');
  };
  const handleSave = () => {
    if (!selectedAthlete || !uploadedFile) return;
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
    setUploadedFile(null);
    setPreviewUrl(null);
    setStatus('idle');
    setIsSaving(false);
  };
  const isSaveDisabled =
  !selectedAthlete || !uploadedFile || isSaving || status === 'success';
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
            Upload or update an athlete's profile photo
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <AthleteSelector
            athletes={MOCK_ATHLETES}
            selectedAthlete={selectedAthlete}
            onSelect={handleAthleteSelect} />


          <PhotoDropzone
            onFileSelect={handleFileSelect}
            previewUrl={previewUrl}
            disabled={!selectedAthlete}
            isExistingPhoto={!!selectedAthlete?.existingPhoto && !uploadedFile} />


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