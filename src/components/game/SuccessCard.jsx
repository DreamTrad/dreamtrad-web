export default function SuccessCard({ image, titleEn, titleFr, description, resolution }) {
  return (
    <div className="bg-bg-tertiary text-text-secondary rounded-lg shadow-md p-4 flex gap-4 items-start w-full max-w-md">
      {/* image */}
      <img
        src={image}
        alt={titleEn}
        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
      />

      {/* content */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-text">{titleFr}</h3>
        <p className="text-sm italic text-text-tertiary">{titleEn}</p>
        <p className="text-sm">{description}</p>
        <p className="text-xs text-text-tertiary mt-2">
          <span className="font-semibold">Résolution :</span> {resolution}
        </p>
      </div>
    </div>
  );
}
