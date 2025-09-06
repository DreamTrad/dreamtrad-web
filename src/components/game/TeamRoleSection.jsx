import TeamRoleCategory from "./TeamRoleCategory";

export default function TeamRoleSection({ data }) {
  return (
    <div className="space-y-6">
      {data
        .filter((cat) => cat.people && cat.people.length > 0) // skip empty categories
        .map((cat, idx) => (
          <TeamRoleCategory key={idx} category={cat} />
        ))}
    </div>
  );
}
