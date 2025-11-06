import LinkWithIcon from "../ui/LinkWithIcon";

export default function TeamRoleCategory({ category }) {
  return (
    <div className="bg-bg-secondary space-y-2 rounded-md p-4 shadow-md">
      <h3 className="text-accent text-lg font-semibold">{category.category}</h3>
      <ul className="list-inside list-disc space-y-1">
        {category.people.map((person, idx) => (
          <li key={idx} className="text-text-secondary flex items-center gap-2">
            <span className="font-medium">{person.name}</span>

            {/* External link icon if link exists */}
            {person.link && <LinkWithIcon url={person.link} />}

            {/* Role only if non-empty */}
            {person.role && <span>— {person.role}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
