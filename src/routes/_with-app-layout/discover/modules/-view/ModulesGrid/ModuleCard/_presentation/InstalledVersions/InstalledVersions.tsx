import type { InstalledVersionsProps, VersionChipProps } from './types';

const VersionChip = (props: VersionChipProps) => {
  const { version } = props;

  return (
    <div className="border rounded-2xl py-1 px-1.5">
      <p className="text-xs font-bold">{version}</p>
    </div>
  );
};

export default function InstalledVersions(props: InstalledVersionsProps) {
  const { versions } = props;

  return (
    <div className="flex flex-col mb-4">
      <p className="text-sm font-semibold mb-1">Installed Version(s)</p>

      <div className="flex flex-wrap gap-1">
        {versions.map(({ version }) => (
          <VersionChip key={version} version={version} />
        ))}
      </div>
    </div>
  );
}
