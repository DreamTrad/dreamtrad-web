export default function LoaderOverlay({ className = "" }) {
  return (
    <div className={`flex items-center justify-center p-4 bg-bg-tertiary rounded-lg ${className}`}>
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
