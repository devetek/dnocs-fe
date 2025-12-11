import { Fragment, useEffect, useRef, useState } from 'react';

import { iife } from '@/shared/libs/browser/iife';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { BasePathFailed, FolderItemRow, FolderRootRow } from './_Partials';
import type { FolderStatus, FolderTreeProps as Props } from './types';

export default function FolderTree(props: Props) {
  const { isEager, registry, basePath, currentFullPath, onClickFolderItem } =
    props;

  const refPreviousFullPath = useRef<string | undefined>(undefined);
  if (refPreviousFullPath.current == null) {
    refPreviousFullPath.current = currentFullPath;
  }

  const [openedFolders, setOpenedFolders] = useState<Set<string>>(
    () => new Set(),
  );

  const checkIsFolderOpened = (fullPath: string) => {
    const foundIndex = [...openedFolders].findIndex(
      (openedFolder) => openedFolder === fullPath,
    );

    return [foundIndex !== -1, foundIndex] as const;
  };

  const toggleFolder = useHandler((fullPath: string, from: 'row' | 'path') => {
    refPreviousFullPath.current = fullPath;

    const [isOpened] = checkIsFolderOpened(fullPath);

    // =============================================================================
    //   Close -> Open
    // =============================================================================

    if (!isEager && from === 'path') {
      let pathIsClosed: string | undefined;

      const pathSegments = fullPath.replace(`${basePath}/`, '').split('/');

      loop: for (let i = 0; i < pathSegments.length; i++) {
        let pathSegment = `${basePath}`;

        for (let j = 0; j <= i; j++) {
          pathSegment += `/${pathSegments[j]}`;
        }

        const [isCurrentlyOpened] = checkIsFolderOpened(pathSegment);
        if (!isCurrentlyOpened) {
          pathIsClosed = pathSegment;
          break loop;
        }
      }

      const newOpenedFolders = [
        ...openedFolders,
        pathIsClosed || null,
        fullPath,
      ].filter(excludeNully);

      setOpenedFolders(new Set(newOpenedFolders));

      return;
    }

    if (!isOpened && fullPath !== basePath) {
      const pathSegments = fullPath.replace(`${basePath}/`, '').split('/');

      const collectedSegments: string[] = [];

      for (let i = 0; i < pathSegments.length - 1; i++) {
        let pathSegment = `${basePath}`;

        for (let j = 0; j <= i; j++) {
          pathSegment += `/${pathSegments[j]}`;
        }

        collectedSegments.push(pathSegment);
      }

      const newOpenedFolders = [
        ...openedFolders,
        ...collectedSegments,
        from === 'row' ? fullPath : null,
      ].filter(excludeNully);

      setOpenedFolders(new Set(newOpenedFolders));
      return;
    }

    // =============================================================================
    //   Open --> Close
    // =============================================================================

    if (!isEager) {
      if (from === 'path') return;

      const tempOpenedFolders = new Set(openedFolders);
      tempOpenedFolders.delete(fullPath);

      setOpenedFolders(tempOpenedFolders);
      return;
    }

    const childrenOfCurrentPath = [...openedFolders].filter((path) =>
      path.includes(fullPath),
    );

    const tempOpenedFolders = new Set(openedFolders);

    for (const childOfCurrentPath of childrenOfCurrentPath) {
      tempOpenedFolders.delete(childOfCurrentPath);
    }

    setOpenedFolders(tempOpenedFolders);
  });

  useEffect(() => {
    if (!currentFullPath || refPreviousFullPath.current === currentFullPath)
      return;

    toggleFolder(currentFullPath, 'path');
  }, [currentFullPath, toggleFolder]);

  const renderFolderTree = (fullPath: string, depth: number) => {
    const currentFolderContents = registry.get(fullPath);
    if (!currentFolderContents) return null;

    if (currentFolderContents.status !== 'success') {
      if (fullPath === basePath) {
        return <BasePathFailed error={currentFolderContents} />;
      }

      return null;
    }

    return currentFolderContents.contents.map((content) => {
      if (content.kind === 'file') return null;

      const selfFullPath = `${fullPath}/${content.name}`;

      const [isOpened] = checkIsFolderOpened(selfFullPath);
      const isSelected = selfFullPath === currentFullPath;

      const handleClick = () => {
        toggleFolder(selfFullPath, 'row');
        onClickFolderItem(selfFullPath);
      };

      const folderStatus = iife((): FolderStatus => {
        const meta = registry.get(selfFullPath);
        if (meta == null) return 'unloaded';

        return meta.status === 'success' ? 'loaded' : 'failed';
      });

      return (
        <Fragment key={content.name}>
          <FolderItemRow
            folderName={content.name}
            folderStatus={folderStatus}
            isOpened={isOpened}
            isSelected={isSelected}
            style={{ paddingLeft: 8 + 16 * depth }}
            onClick={handleClick}
          />

          {isOpened && renderFolderTree(selfFullPath, depth + 1)}
        </Fragment>
      );
    });
  };

  return (
    <section className="flex flex-col gap-y-1">
      <FolderRootRow basePath={basePath} />

      {renderFolderTree(basePath, 0)}
    </section>
  );
}
