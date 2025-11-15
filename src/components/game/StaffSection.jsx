import MetaTags from "../MetaTags";
import MarkdownSection from "../ui/MarkdownSection";
import StaffCard from "../card/StaffCard";

export default function StaffSection({ section, title, staffList }) {
  const filtered = section.staff
    ? staffList.filter((s) => section.staff.includes(s.id))
    : staffList;

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-9xl p-8">
        <h1 className="text-text mb-8 text-center text-3xl font-bold">{title}</h1>

        {section.file && (
          <div className="mt-16 mb-16">
            <MarkdownSection file={section.file} className="text-justify leading-relaxed" />
          </div>
        )}

        <div className="flex flex-col gap-8">
          {filtered.map((member, idx) => (
            <StaffCard key={member.id} {...member} imageRight={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
