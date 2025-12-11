import { useMemo } from 'react';

import { FolderIcon } from 'lucide-react';

import type { SchemaFileManagerParts } from '@/entities/file-manager/rules/schema';
import {
  getFileDescFromFilename,
  getFileIconFromFilename,
} from '@/entities/file-manager/ui/mapper';

import { GridItem, RowHeader, RowItem } from './_Partials';
import type { FilesystemBrowserProps as Props } from './types';

export default function FilesystemBrowser(props: Props) {
  const {
    contents,
    searchQuery,
    selectedItem,
    viewMode,
    onItemClick,
    onItemDoubleClick,
    onClickBackground,
  } = props;

  const [files, folders] = useMemo(() => {
    const listFolder: SchemaFileManagerParts.ContentFolder[] = [];
    const listFile: SchemaFileManagerParts.ContentFile[] = [];

    const filteredContents = contents.filter((content) =>
      content.name.includes(searchQuery),
    );

    for (const content of filteredContents) {
      if (content.kind === 'file') {
        listFile.push(content);
      } else {
        listFolder.push(content);
      }
    }

    return [listFile, listFolder] as const;
  }, [contents, searchQuery]);

  if (viewMode === 'grid') {
    return (
      <div
        className="overflow-hidden overflow-y-auto h-full"
        onClick={onClickBackground}
      >
        <div className="p-2 grid grid-cols-2 lg:grid-cols-4 gap-2 h-max">
          {folders.map((folder) => {
            const { name } = folder;

            const handleClick = () => {
              onItemClick?.({
                ...folder,
                kind: 'folder',
              });
            };

            const handleDoubleClick = () => {
              onItemDoubleClick?.({
                ...folder,
                kind: 'folder',
              });
            };

            return (
              <GridItem
                key={name}
                contentName={name}
                icon={FolderIcon}
                isSelected={selectedItem?.name === name}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
              />
            );
          })}
          {files.map((file) => {
            const { name } = file;

            const handleClick = () => {
              onItemClick?.({
                ...file,
                kind: 'file',
              });
            };

            const handleDoubleClick = () => {
              onItemDoubleClick?.({
                ...file,
                kind: 'file',
              });
            };

            const Icon = getFileIconFromFilename(name);

            return (
              <GridItem
                key={name}
                contentName={name}
                icon={Icon}
                isSelected={selectedItem?.name === name}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
              />
            );
          })}
        </div>
      </div>
    );
  }

  const isEven = folders.length % 2 === 0;

  return (
    <div className="flex flex-col overflow-hidden" onClick={onClickBackground}>
      <RowHeader />

      <div className="p-2 flex flex-col overflow-hidden overflow-y-auto">
        {folders.map((folder, index) => {
          const { name, timestamp } = folder;

          const handleClick = () => {
            onItemClick?.({
              ...folder,
              kind: 'folder',
            });
          };

          const handleDoubleClick = () => {
            onItemDoubleClick?.({
              ...folder,
              kind: 'folder',
            });
          };

          return (
            <RowItem
              key={name}
              isOdd={Boolean(index % 2)}
              isSelected={selectedItem?.name === name}
              contentName={name}
              contentLastUpdated={timestamp.updated}
              contentFileExtension="Folder"
              icon={FolderIcon}
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
            />
          );
        })}
        {files.map((file, index) => {
          const { name, size, timestamp } = file;

          const handleClick = () => {
            onItemClick?.({
              ...file,
              kind: 'file',
            });
          };

          const handleDoubleClick = () => {
            onItemDoubleClick?.({
              ...file,
              kind: 'file',
            });
          };

          const augmentedIndex = isEven ? index : index + 1;

          return (
            <RowItem
              key={name}
              isOdd={Boolean(augmentedIndex % 2)}
              isSelected={selectedItem?.name === name}
              contentName={name}
              contentFileSizeFormatted={size.formatted}
              contentLastUpdated={timestamp.updated}
              contentFileExtension={getFileDescFromFilename(name)}
              icon={getFileIconFromFilename(name)}
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
            />
          );
        })}
      </div>
    </div>
  );
}
