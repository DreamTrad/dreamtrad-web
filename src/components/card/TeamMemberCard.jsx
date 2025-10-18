import LinkWithIcon from "../ui/LinkWithIcon";
import ReactMarkdown from "react-markdown";

export default function TeamMemberCard({
  name,
  avatar,
  bio,
  skills,
  projects,
  links,
}) {
  return (
    <div className="bg-bg-tertiary border border-bg-secondary rounded-xl shadow-md overflow-hidden p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        {/* Avatar + Infos */}
        <div className="flex items-center gap-4 flex-1">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 object-cover rounded-lg border border-bg-secondary"
          />
          <div>
            <h2 className="text-xl font-bold text-accent">{name}</h2>
            {/* Compétences */}
            {skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-bg-secondary text-text-secondary text-xs px-2 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Réseaux */}
        {links?.length > 0 && (
          <div className="flex gap-3">
            {links.map((url, idx) => (
              <LinkWithIcon key={idx} url={url} />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-6 flex-grow">

        {/* Projets */}
        {projects?.length > 0 && (
          <div className="w-full bg-bg-secondary rounded-md p-4">
            <h3 className="text-sm font-semibold text-accent mb-2">
              Projets :
            </h3>
            <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
              {projects.map((proj, idx) => (
                <li key={idx}>{proj}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
