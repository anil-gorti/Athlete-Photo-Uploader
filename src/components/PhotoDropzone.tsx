import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
interface PhotoDropzoneProps {
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
  disabled: boolean;
  isExistingPhoto?: boolean;
}
export function PhotoDropzone({
  onFileSelect,
  previewUrl,
  disabled,
  isExistingPhoto
}: PhotoDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    },
    [disabled]
  );
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      if (
      files.length > 0 && (
      files[0].type === 'image/jpeg' || files[0].type === 'image/png'))
      {
        onFileSelect(files[0]);
      }
    },
    [disabled, onFileSelect]
  );
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        Profile Photo
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center w-full h-64 rounded-lg border-2 border-dashed transition-colors
          ${disabled ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60' : isDragOver ? 'bg-gray-50 border-gray-400' : 'bg-white border-gray-300 hover:bg-gray-50'}
        `}>

        {previewUrl ?
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div className="relative group">
              <img
              src={previewUrl}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-md shadow-sm bg-gray-100" />

              {!disabled &&
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-md">
                  {/* Overlay for hover effect if needed, currently keeping it simple */}
                </div>
            }
            </div>
            <p className="mt-3 text-sm font-medium text-gray-600">
              {isExistingPhoto ? 'Current photo' : 'New photo selected'}
            </p>
            {!disabled &&
          <label className="mt-2 cursor-pointer text-xs text-gray-500 hover:text-gray-900 underline">
                Replace photo
                <input
              type="file"
              className="hidden"
              accept="image/jpeg, image/png"
              onChange={handleFileInput} />

              </label>
          }
          </div> :

        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
            <div className="mb-3 p-3 rounded-full bg-gray-100 text-gray-400">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="mb-1 text-sm text-gray-900 font-medium">
              Drag and drop a photo here
            </p>
            <p className="mb-4 text-xs text-gray-500">JPG or PNG, max 5MB</p>
            <label
            className={`
              inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer
              ${disabled ? 'pointer-events-none opacity-50' : ''}
            `}>

              Select File
              <input
              type="file"
              className="hidden"
              accept="image/jpeg, image/png"
              onChange={handleFileInput}
              disabled={disabled} />

            </label>
          </div>
        }
      </div>
    </div>);

}