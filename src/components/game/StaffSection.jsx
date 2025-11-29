import MarkdownSection from "../ui/MarkdownSection";
import StaffCard from "../card/StaffCard";

export default function StaffSection({ section, title, staffList }) {
  const filtered = section.staff
    ? staffList.filter((s) => section.staff.includes(s.id))
    : staffList;

  return (
    <div className="pb-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">

        {/* Title */}
        <h1 className="text-text text-center text-4xl font-extrabold mb-12">
          {title}
        </h1>

        {/* Optional description */}
        {section.file && (
          <div className="
            my-16
            bg-bg-secondary/60 border border-bg-tertiary
            rounded-2xl p-6 shadow-md shadow-black/10
          ">
            <MarkdownSection
              file={section.file}
              className="text-text-secondary text-justify leading-relaxed"
            />
          </div>
        )}

        {/* Cards */}
        <div className="flex flex-col items-center gap-10">
          {filtered.map((member, idx) => (
            <StaffCard
              key={member.id}
              {...member}
              imageRight={idx % 2 === 1}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
