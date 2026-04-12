// app/jeux/[id]/staff/page.js
import StaffCard from "./StaffCard";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamicParams = true;
export const revalidate = 60 * 60 * 24;

export async function generateMetadata({ params }) {
  const id = (await params).id;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("id, title")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching staff:", error);
    redirect("/");
  }

  const image = `/jeux/${data.id}/cover.webp`;

  return {
    title: `Staff | ${data.title}`, // combine "Staff" + layout title
    description: `Découvrez les personnes qui se cachent derrière ${data.title}.`,
    openGraph: {
      title: `Staff | ${data.title}`,
      description: `Découvrez les personnes qui se cachent derrière ${data.title}.`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${data.title} staff`,
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

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("staff_projects")
    .select(
      `
            staffs (
              *
            )
          `,
    )
    .eq("project_id", id);

  if (error) {
    console.error("Error fetching staff:", error);
    redirect("/");
  }

  const staffs = data
    .map((item) => item.staffs)
    .filter((s) => s && s.is_visible);

  return (
    <div className="pb-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        <h1 className="text-text mb-12 text-center text-4xl font-extrabold">
          Le Staff
        </h1>

        <div className="flex flex-col items-center gap-10">
          {staffs.map((member, idx) => (
            <StaffCard key={member.id} {...member} imageRight={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
