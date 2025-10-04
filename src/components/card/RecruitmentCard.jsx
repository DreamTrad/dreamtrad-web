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
    <div className="bg-bg-tertiary rounded-2xl shadow-lg overflow-hidden border border-bg-secondary flex flex-col w-full max-w-7xl">
      {/* Title */}
      <div className="bg-bg-secondary px-6 py-3">
        <h3 className="text-xl font-bold text-accent">{title}</h3>
      </div>

      {/* Middle: image + roles */}
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Image */}
        <div className="flex-shrink-0 w-40 h-56">
          <img
            src={image}
            alt={`Affiche de ${title}`}
            className="w-full h-full object-cover rounded-md shadow-md"
          />
        </div>

        {/* Rôles / contenu */}
        {/* Rôles / contenu */}
        <div className="flex-1 bg-bg-secondary rounded-md p-4">
          <h4 className="text-lg font-semibold mb-2">Nous recrutons :</h4>
          <div className="flex items-center h-40">
            <ul className="list-disc list-inside space-y-5 text-text-secondary">
              {roles.map((role, idx) => (
                <li key={idx}>{role}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact */}
      {contact && (
        <div className="bg-bg-secondary px-4 py-2 text-text-secondary text-sm">
          <span className="font-semibold text-accent">
            Contact du projet sur Discord :
          </span>{" "}
          {contact}
        </div>
      )}

      {/* Description */}
      <div className="bg-bg-secondary p-4 rounded-b-2xl flex-grow">
        <MarkdownSection
          content={description}
          className="text-sm text-text-secondary leading-relaxed text-justify"
        />
      </div>
    </div>
  );
}
