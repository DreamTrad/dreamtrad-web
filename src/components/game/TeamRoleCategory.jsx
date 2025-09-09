import LinkWithIcon from "../ui/LinkWithIcon";


export default function TeamRoleCategory({ category }) {
  return (
    <div className="bg-bg-secondary p-4 rounded-md shadow-md space-y-2">
      <h3 className="text-accent font-semibold text-lg">{category.category}</h3>
      <ul className="list-disc list-inside space-y-1">
        {category.people.map((person, idx) => (
          <li key={idx} className="text-text-secondary flex items-center gap-2">
            <span className="font-medium">{person.name}</span>

            {/* External link icon if link exists */}
           {person.link && (
              <LinkWithIcon url={person.link} />
            )}

            {/* Role only if non-empty */}
            {person.role && (
              <span>— {person.role}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
