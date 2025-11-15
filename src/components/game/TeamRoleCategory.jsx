import LinkWithIcon from "../ui/LinkWithIcon";

export default function TeamRoleCategory({ category }) {
  return (
    <div className="bg-bg-secondary space-y-3 rounded-md p-5 shadow-md">
      <h3 className="text-accent text-xl font-bold">{category.category}</h3>

      <ul className="space-y-2">
        {category.people.map((person, idx) => (
          <li key={idx} className="flex flex-col gap-1">
            {/* Name emphasized */}
            <div className="flex items-center gap-2">
              <span className="text-text font-semibold text-lg">
                {person.name}
              </span>

              {person.link && <LinkWithIcon url={person.link} />}
            </div>

            {/* Role */}
            {person.role && (
              <span className="text-text-secondary text-sm ml-1">
                {person.role}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
