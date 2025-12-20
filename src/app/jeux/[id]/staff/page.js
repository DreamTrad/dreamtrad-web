// app/jeux/[id]/staff/page.js
import { games } from "@/data/jeux";
import StaffCard from "./StaffCard";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const game = games.find((g) => g.id === id);
  if (!game) return {};

  const image = `/jeux/${id}/cover.webp`;

  return {
    title: `Staff | ${game.name}`, // combine "Staff" + layout title
    description: `Découvrez les personnes qui se cachent derrière ${game.name}.`,
    openGraph: {
      title: `Staff | ${game.name}`,
      description: `Découvrez les personnes qui se cachent derrière ${game.name}.`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${game.name} staff`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [image],
    },
  };
}


export default async function StaffPage({ params }) {
  const id = (await params).id;

  const game = games.find((g) => g.id === id);
  if (!game) redirect("/");

  const staffIds = game.categories.general.sections.find(
    (s) => s.id === "staff",
  )?.staff;

  if (!staffIds) redirect("/");

  const staffPath = path.join(process.cwd(), "src/data/json/vn_staff.json");

  const staffList = JSON.parse(fs.readFileSync(staffPath, "utf8"));

  const filtered = staffList.filter((s) => staffIds.includes(s.id));

  return (
    <div className="pb-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        <h1 className="text-text mb-12 text-center text-4xl font-extrabold">
          Le Staff
        </h1>

        <div className="flex flex-col items-center gap-10">
          {filtered.map((member, idx) => (
            <StaffCard key={member.id} {...member} imageRight={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
