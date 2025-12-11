export default function ErrorInline({ message = '' as string | undefined }) {
  if (!message) return null;

  return (
    <p role="alert" className="mt-0.5 text-xs font-medium text-red-500">
      {message}
    </p>
  );
}
