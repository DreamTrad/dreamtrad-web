export default function LoaderOverlay({ className = "" }) {
  return (
    <div
      className={`bg-bg-tertiary flex items-center justify-center rounded-lg p-4 ${className}`}
    >
      <div className="border-accent h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
    </div>
  );
}
