'use client';

import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';
import { X } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}

export const FileUpload: React.FC<FileUploadProps> = ({ onChange, value, endpoint }) => {
  const fileType = value?.split('.').pop();

  console.log('This is value', value);

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          onClick={() => onChange('')}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log('This is on client upload complete', res?.[0]);
        onChange(res?.[0].url);
      }}
      onUploadError={(err) => {
        console.log(err);
      }}
    />
  );
};
