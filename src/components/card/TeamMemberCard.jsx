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
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-6 overflow-hidden rounded-xl border p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        {/* Avatar + Infos */}
        <div className="flex flex-1 items-center gap-4">
          <img
            src={avatar}
            alt={name}
            className="border-bg-secondary h-20 w-20 rounded-lg border object-cover"
          />
          <div>
            <h2 className="text-accent text-xl font-bold">{name}</h2>
            {/* Compétences */}
            {skills?.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-bg-secondary text-text-secondary rounded-md px-2 py-1 text-xs"
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
      <div className="flex flex-grow flex-col gap-6 md:flex-row">
        {/* Projets */}
        {projects?.length > 0 && (
          <div className="bg-bg-secondary w-full rounded-md p-4">
            <h3 className="text-accent mb-2 text-sm font-semibold">
              Projets :
            </h3>
            <ul className="text-text-secondary list-inside list-disc space-y-1 text-sm">
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
