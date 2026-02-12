import React from 'react';
import { CheckCircle2, AlertCircle, Clock, FileImage } from 'lucide-react';
export type UploadStatus = 'idle' | 'no-photo' | 'pending' | 'success' | 'error';
interface StatusIndicatorProps {
  status: UploadStatus;
}
export function StatusIndicator({ status }: StatusIndicatorProps) {
  if (status === 'idle') return null;
  const config = {
    'no-photo': {
      icon: FileImage,
      text: 'No photo uploaded',
      color: 'text-gray-500',
      bg: 'bg-gray-50',
      border: 'border-gray-200'
    },
    pending: {
      icon: Clock,
      text: 'Photo uploaded, not saved',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    success: {
      icon: CheckCircle2,
      text: 'Photo successfully saved',
      color: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    error: {
      icon: AlertCircle,
      text: 'Upload failed. Please try again.',
      color: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200'
    }
  };
  const current = config[status];
  const Icon = current.icon;
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-md border ${current.bg} ${current.border} transition-all duration-300`}>

      <Icon className={`w-4 h-4 ${current.color}`} />
      <span className={`text-sm font-medium ${current.color}`}>
        {current.text}
      </span>
    </div>);

}