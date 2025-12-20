import MarkdownSection from "@/components/ui/MarkdownSection";

export default function StaffCard({
  id,
  name,
  image,
  text,
  imageRight = false,
}) {
  return (
    <div
      key={id}
      className="bg-bg-tertiary flex w-full flex-col overflow-hidden rounded-2xl p-6 shadow-lg md:flex-row md:items-center md:gap-6"
    >
      {/* Image */}
      <div
        className={`flex flex-2 items-center justify-center ${imageRight ? "md:order-3" : "md:order-1"} order-1`}
      >
        <img
          src={image}
          alt={`Photo de ${name}`}
          className="mb-4 w-full max-w-xs rounded-md object-contain md:mb-0"
        />
      </div>

      {/* Texte */}
      <div
        className={`text-text-secondary flex flex-3 flex-col gap-4 ${imageRight ? "md:order-2" : "md:order-2"} order-2`}
      >
        <h3 className="text-accent text-center text-2xl font-bold md:text-left">
          {name}
        </h3>
        <MarkdownSection
          content={text}
          className="text-text-secondary text-justify leading-relaxed"
        />
      </div>
    </div>
  );
}
