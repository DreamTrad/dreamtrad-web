export default function StaffCard({ id, name, image, text, imageRight = false }) {
  return (
    <div
      key={id}
      className="bg-bg-tertiary border-hover-secondary flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border p-6 md:flex-row md:items-center md:gap-6"
    >
      {!imageRight && (
        <div className="flex flex-[2] items-center justify-center md:order-1">
          <img
            src={image}
            alt={`Photo de ${name}`}
            className="h-64 w-full max-w-xs rounded-md object-contain"
          />
        </div>
      )}

      <div className="flex flex-[3] flex-col gap-4 text-text-secondary md:order-2">
        <h3 className="text-2xl font-bold text-accent">{name}</h3>
        <p className="text-justify">{text}</p>
      </div>

      {imageRight && (
        <div className="flex flex-[2] items-center justify-center md:order-3">
          <img
            src={image}
            alt={`Photo de ${name}`}
            className="h-64 w-full max-w-xs rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
}
