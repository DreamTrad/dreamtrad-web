// app/(site)/jeux/[id]/patchfr/equipe/page.js

import TeamRoleCategory from "./TeamRoleCategory";
import { createStaticClient } from "@/lib/supabase/public";
import { getImageUrl } from "@/lib/supabase/storage";

export const revalidate = 21600; // 6 hours

export async function generateMetadata({ params }) {

  const id = (await params).id;
  const image = getImageUrl(`/jeux/${id}/cover.webp`);

  const supabase = createStaticClient();

  const { data: game } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .single();


  return {
    title: `Équipe patch fr | ${game.title}`,
    description: `Découvrez l’équipe ayant travaillé sur la traduction française de ${game.title}.`,
    openGraph: {
      title: `Équipe patch fr | ${game.title}`,
      description: `Équipe de traduction française du visual novel ${game.title}.`,
      url: `/jeux/${id}/patchfr/equipe`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
    },
  };
}

export default async function TeamRoleSection({ params }) {
  const id = (await params).id;

   const supabase = createStaticClient();

  const { data } = await supabase
    .from("project_roles")
    .select(`
      role,
      comment,
      members (
        id,
        name,
        is_important,
        links
      )
    `)
    .eq("project_id", id);

    const groupedRoles = (data || []).reduce((acc, item) => {
    const key = item.role;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});


  return (
    <>
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20">
              <div className="bg-bg-secondary/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm md:p-8">
      <h1 className="text-text mb-14 text-center text-4xl font-bold">
        L’équipe ayant travaillé sur le patch
      </h1>
      <p className="text-justify">
        Si une information est incorrecte, ou manquante, ou que vous souhaitez
        transmettre un lien vers un réseau social ou site internet en lien avec vous
        qui sera affiché à côté de votre pseudo, n’hésitez pas à nous contacter
        !
      </p>
            </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Object.entries(groupedRoles).map(([role, items]) => (
  <TeamRoleCategory key={role} role={role} items={items} />
))}
      </div>
      </div>
    </>
  );
}
