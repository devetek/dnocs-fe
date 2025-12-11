import { useRef, useState } from 'react';

import { AlertCircleIcon, UploadIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

import type { SchemaGcpForm } from '../../model/forms/schema';
import { schemaGcpForm } from '../../model/forms/schema';

export default function UploadArea(props: Props) {
  const { maxSizeInMiB = 5, onUploadData } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const refFileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = async (selectedFiles: FileList | null) => {
    setErrorMessage(undefined);

    if (!selectedFiles) return;

    // // Convert FileList to array
    const selectedFile = Array.from(selectedFiles).at(0);
    if (!selectedFile) return;

    if (selectedFile.size > maxSizeInMiB * 1024 * 1024) {
      setErrorMessage(
        `File "${selectedFile.name}" exceeds the ${maxSizeInMiB}MiB size limit!`,
      );
      return;
    }

    if (selectedFile.type !== 'application/json') {
      setErrorMessage(`File "${selectedFile.name}" is not a JSON file!`);
      return;
    }

    const result = await new Promise<Record<string, unknown> | Error>(
      (resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            resolve(data);
          } catch (error) {
            resolve(error instanceof Error ? error : Error(String(error)));
          }
        };

        reader.onerror = (error) => {
          resolve(error instanceof Error ? error : Error(String(error)));
        };

        reader.readAsText(selectedFile);
      },
    );

    if (result instanceof Error) {
      setErrorMessage(result.message);
      return;
    }

    const parsedResult = schemaGcpForm.safeParse(result);
    if (!parsedResult.success) {
      setErrorMessage(
        parsedResult.error.issues
          .map(
            (issue) => `${issue.message} for field "${issue.path.join('.')}"`,
          )
          .join('; '),
      );
      return;
    }

    onUploadData?.(parsedResult.data);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleClick = () => {
    refFileInput.current?.click();
  };
  const cnRoot = cn(
    'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    isDragging
      ? 'border-primary bg-primary/5'
      : 'border-muted-foreground/25 hover:border-primary/50',
  );

  return (
    <div className="flex flex-col">
      <div
        className={cnRoot}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={refFileInput}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <UploadIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              <span className="text-primary font-semibold">
                Click to upload
              </span>{' '}
              or drag and drop the JSON file here.
            </p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 text-destructive text-sm mt-2">
          <AlertCircleIcon className="h-4 w-4" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

interface Props {
  maxSizeInMiB?: number;
  onUploadData?: (data: SchemaGcpForm) => void;
}
