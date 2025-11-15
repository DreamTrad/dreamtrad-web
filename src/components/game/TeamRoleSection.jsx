import TeamRoleCategory from "./TeamRoleCategory";

export default function TeamRoleSection({ data }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {data
        .filter((cat) => cat.people && cat.people.length > 0)
        .map((cat, idx) => (
          <TeamRoleCategory key={idx} category={cat} />
        ))}
    </div>
  );
}
