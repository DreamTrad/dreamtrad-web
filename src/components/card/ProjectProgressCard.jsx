import { Link } from "react-router-dom";

export default function ProjectProgressCard({
  title,
  image,
  progress,
  recruiting,
}) {

  const bars = [
    { label: "Traduction", value: progress.traduction },
    { label: "Images", value: progress.images },
    { label: "Technique", value: progress.technique },
    { label: "Relecture", value: progress.relecture },
  ];

  return (
    <div className="flex items-start bg-bg-secondary p-6 rounded-xl shadow-lg">
      {/* Image alignée avec les barres */}
      <div className="flex-shrink-0 w-32 h-full overflow-hidden rounded-md mr-6">
        <img src={image} alt={title} className="h-full w-auto object-cover" />
      </div>

      {/* Contenu */}
      <div className="flex-1">
        {/* Header avec titre + recrutement */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          {recruiting && (
            <Link
              to="/recrutement"
              className="text-accent font-semibold hover:underline hover:text-accent/80 transition"
            >
              Recrutement !
            </Link>
          )}
        </div>

        {/* Barres de progression */}
        <div className="space-y-3">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between mb-1 text-sm">
                <span>{bar.label}</span>
                <span>{bar.value}%</span>
              </div>
              <div className="relative w-full h-4 bg-bg-tertiary rounded-md overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-accent"
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
