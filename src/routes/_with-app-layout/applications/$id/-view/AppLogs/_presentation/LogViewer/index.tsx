interface LogViewerProps {
  logs: string;
}

export default function LogViewer(props: LogViewerProps) {
  const { logs } = props;

  return (
    <div className="rounded-lg bg-gray-900 overflow-hidden">
      <div className="p-2 h-96 overflow-y-auto">
        <pre className="text-sm text-white">{logs}</pre>
      </div>
    </div>
  );
}
