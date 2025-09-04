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
              <a
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-hover"
                title="Voir le lien"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 010 5.656m-3.657-9.9a4 4 0 015.657 5.657l-1.415 1.415m-2.829 2.829a4 4 0 01-5.657-5.657l1.415-1.415" />
                </svg>
              </a>
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
