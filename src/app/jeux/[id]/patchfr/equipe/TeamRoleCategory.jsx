import LinkWithIcon from "@/components/ui/LinkWithIcon";

export const dynamic = "force-static";

export default function TeamRoleCategory({ category }) {
  if (!category?.people?.length) return null;

  return (
    <div className="bg-bg-secondary space-y-3 rounded-md p-5 shadow-md">
      <h3 className="text-accent text-xl font-bold">{category.category}</h3>

      <ul className="space-y-2">
        {category.people.map((person) => (
          <li key={person.id ?? person.name} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-text text-lg font-semibold">
                {person.name}
              </span>
              {person.link && <LinkWithIcon url={person.link} />}
            </div>

            {person.role && (
              <span className="text-text-secondary ml-1 text-sm">
                {person.role}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
