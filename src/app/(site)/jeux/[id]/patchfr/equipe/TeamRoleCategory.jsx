import LinkWithIcon from "@/components/ui/LinkWithIcon";


export default function TeamRoleCategory({ role, items }) {
  if (!items?.length) return null;

  const roleLabels = {
    traduction: "Traduction",
    programmation: "Programmation",
    graphisme: "Graphisme",
    relecture: "Relecture",
    autre: "Autre",
  };

  // Sort items by member name
  const sortedItems = [...items].sort((a, b) =>
    (a.members?.name || "").localeCompare(b.members?.name || "")
  );

  return (
    <div className="bg-bg-secondary space-y-3 rounded-md p-5 shadow-md">
      <h3 className="text-accent text-xl font-bold">
        {roleLabels[role] || role}
      </h3>

      <ul className="space-y-2">
        {sortedItems.map((item) => {
          const member = item.members;

          const link = member?.is_important
            ? "/equipe"
            : member?.links?.[0] || "";

          return (
            <li
              key={`${member?.id}-${item.comment}`}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <span className="text-text text-lg font-semibold">
                  {member?.name}
                </span>

                {link && <LinkWithIcon url={link} />}
              </div>

              {item.comment && (
                <span className="text-text-secondary ml-1 text-sm">
                  {item.comment}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}