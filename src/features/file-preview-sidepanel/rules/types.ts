import type { SchemaFileManagerParts } from '@/entities/file-manager/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface FilePreviewSidepanelProps {
  serverId: SchemaCommon.UnitId;
  selectedFileFullPath: string;
  selectedFile: SchemaFileManagerParts.ContentFile;
}
