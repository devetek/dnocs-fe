interface LogViewerProps {
  log: string;
}

export default function LogViewer(props: LogViewerProps) {
  const { log } = props;

  return (
    <div className="rounded-lg bg-gray-900 overflow-hidden">
      <div className="p-2 h-[600px] overflow-y-auto">
        <pre className="text-sm text-white">{log}</pre>
      </div>
    </div>
  );
}
