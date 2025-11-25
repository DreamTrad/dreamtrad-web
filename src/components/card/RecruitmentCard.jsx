import ReactMarkdown from "react-markdown";
import MarkdownSection from "../ui/MarkdownSection";

export default function RecruitmentCard({
  title,
  image,
  roles,
  contact,
  description,
}) {
  return (
    <div className="bg-bg-tertiary border-bg-secondary flex w-full max-w-7xl flex-col overflow-hidden rounded-2xl border shadow-lg">
      {/* Title */}
      <div className="bg-bg-secondary px-6 py-3">
        <h3 className="text-accent text-xl font-bold">{title}</h3>
      </div>

      {/* Middle: image + roles */}
      <div className="flex flex-col gap-6 p-6 md:flex-row">
        {/* Image */}
        <div className="mx-auto h-56 w-40 flex-shrink-0 md:mx-0">
          <img
            src={image}
            alt={`Affiche de ${title}`}
            className="h-full w-full rounded-md object-cover shadow-md"
          />
        </div>

        {/* Rôles / contenu */}
        <div className="bg-bg-secondary flex-1 rounded-md p-4">
          <h4 className="mb-2 text-lg font-semibold">Nous recherchons :</h4>
          <div className="flex h-40 items-center">
            <ul className="text-text-secondary list-inside list-disc space-y-5">
              {roles.map((role, idx) => (
                <li key={idx}>{role}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact */}
      {contact && (
        <div className="bg-bg-secondary text-text-secondary px-4 py-2 text-sm">
          <span className="text-accent font-semibold">
            Contact du projet sur Discord :
          </span>{" "}
          {contact}
        </div>
      )}

      {/* Description */}
      <div className="bg-bg-secondary flex-grow rounded-b-2xl p-4">
        <MarkdownSection
          content={description}
          className="text-text-secondary text-justify text-sm leading-relaxed"
        />
      </div>
    </div>
  );
}
