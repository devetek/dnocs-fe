import { useEmit } from '../../model/events';
import { useFilesystemModel } from '../../model/filesystem';
import FolderTree from '../_presentation/FolderTree';

export default function Sidebar() {
  const emit = useEmit();

  const [basePath, isEager, currentFullPath, registry] = useFilesystemModel(
    (s) => [s.basePath, s.eager, s.history.currentFullPath, s.registry],
  );

  const handleClickFolderItem = (fullPath: string) => {
    emit('#file-manager-sidepanel/filesystem-history-navigate-to', fullPath);
  };

  return (
    <>
      <div className="p-4 pt-3 h-full overflow-y-auto">
        <FolderTree
          registry={registry}
          basePath={basePath}
          isEager={isEager}
          currentFullPath={currentFullPath}
          onClickFolderItem={handleClickFolderItem}
        />
      </div>
    </>
  );
}
