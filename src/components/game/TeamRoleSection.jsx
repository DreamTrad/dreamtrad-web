import TeamRoleCategory from "./TeamRoleCategory";

export default function TeamRoleSection({ data }) {
  return (
    <div className="space-y-6">
      {data.map((cat, idx) => (
        <TeamRoleCategory key={idx} category={cat} />
      ))}
    </div>
  );
}
