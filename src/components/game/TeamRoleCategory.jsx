export default function TeamRoleCategory({ category }) {
  return (
    <div className="bg-bg-secondary p-4 rounded-md shadow-md space-y-2">
      <h3 className="text-accent font-semibold text-lg">{category.category}</h3>
      <ul className="list-disc list-inside space-y-1">
        {category.people.map((person, idx) => (
          <li key={idx} className="text-text-secondary">
            <span className="font-medium">{person.name}</span> — {person.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
