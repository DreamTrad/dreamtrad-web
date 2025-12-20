import Image from "next/image";
import LinkWithIcon from "../../components/ui/LinkWithIcon";

export default function TeamMemberCard({
  name,
  avatar,
  skills,
  projects,
  links,
}) {
  return (
    <div className="bg-bg-tertiary border-bg-secondary flex flex-col gap-6 overflow-hidden rounded-xl border p-6 shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Avatar + Infos */}
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Image
            src={avatar}
            alt={name}
            width={80}
            height={80}
            className="border-bg-secondary rounded-lg border object-cover"
          />

          <div className="min-w-0 flex-1">
            <h2 className="text-accent text-xl font-bold break-normal wrap-break-word whitespace-normal">
              {name}
            </h2>

            {/* Skills */}
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
          <div className="flex min-w-0 flex-wrap gap-3">
            {links.map((url, idx) => (
              <LinkWithIcon key={idx} url={url} />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex grow flex-col gap-6 md:flex-row">
        {projects?.length > 0 && (
          <div className="bg-bg-secondary w-full rounded-md p-4">
            <h3 className="text-accent mb-2 text-sm font-semibold">
              Projets Principaux :
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
