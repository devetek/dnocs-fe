import { FileIcon } from 'lucide-react';

import {
  KNOWN_FILE_DESC_FROM_EXT,
  KNOWN_FILE_DESC_FROM_NAME,
} from './constants/file-desc';
import {
  KNOWN_FILE_ICONS_FROM_EXT,
  KNOWN_FILE_ICONS_FROM_NAME,
} from './constants/file-icons';

const getFileExtension = (filename: string) => filename.split('.').at(-1) || '';

export function getFileIconFromFilename(filename: string) {
  const iconFromFilename = KNOWN_FILE_ICONS_FROM_NAME[filename];
  if (iconFromFilename) return iconFromFilename;

  const iconFromFileExt =
    KNOWN_FILE_ICONS_FROM_EXT[getFileExtension(filename).toLocaleLowerCase()];
  if (iconFromFileExt) return iconFromFileExt;

  return FileIcon;
}

export function getFileDescFromFilename(filename: string) {
  const fileDescFromFilename = KNOWN_FILE_DESC_FROM_NAME[filename];
  if (fileDescFromFilename) return fileDescFromFilename;

  const fileExt = getFileExtension(filename);
  const fileDescFromFileExt =
    KNOWN_FILE_DESC_FROM_EXT[fileExt.toLocaleLowerCase()];
  if (fileDescFromFileExt) return fileDescFromFileExt;

  return fileExt ? `${fileExt.toUpperCase()} File` : 'Unknown File';
}
