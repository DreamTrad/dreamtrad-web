// app/(admin)/admin/recrutement/page.js

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import PageEditor from "@/components/PageEditor";
import RecruitmentForm from "@/components/RecruitmentForm";

export default function AdminRecruitmentPage() {
  const [project, setProject] = useState([]);
  const [other, setOther] = useState([]);
  const [site, setSite] = useState([]);
  const [pairedProjects, setPairedProjects] = useState([]);

  const fetchData = async () => {
    const { data: projectData } = await supabase
      .from("project_recruitments")
      .select("*, projects(id, title)")
      .eq("type", "project");

    const { data: otherData } = await supabase
      .from("project_recruitments")
      .select("*, projects(id, title)")
      .eq("type", "other");

    const { data: siteData } = await supabase
      .from("site_recruitments")
      .select("*");

    const projects = (projectData || []).sort((a, b) =>
      (a.projects?.title || "").localeCompare(b.projects?.title || ""),
    );

    const others = otherData || [];

    const paired = projects.map((p) => ({
      project: p,
      other: others.find((o) => o.projects?.id === p.projects?.id),
    }));

    setProject(projects);
    setOther(others);
    setSite(siteData || []);
    setPairedProjects(paired);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveProject = async (data) => {
    const { data: result, error } = await supabase
      .from("project_recruitments")
      .update({
        title: data.title,
        roles: data.roles,
        contact: data.contact,
        description: data.description,
        is_active: data.is_active,
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) return null;

    await fetchData();
    return result;
  };

  const saveSite = async (data) => {
    const { data: result, error } = await supabase
      .from("site_recruitments")
      .update({
        title: data.title,
        roles: data.roles,
        contact: data.contact,
        description: data.description,
        is_active: data.is_active,
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) return null;

    await fetchData();
    return result;
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* INFBOX */}
      <div className="mb-10">
        <h1 className="text-accent mb-4 text-2xl font-bold">
          Infobox recrutement
        </h1>

        <PageEditor slug="recrutement" file="infobox" />
      </div>

      {/* SITE RECRUITMENTS */}
      <h2 className="mt-10 mb-4 text-lg font-bold">Site & autres projets</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {site.map((item) => (
          <RecruitmentForm
            key={item.id}
            label={item.title}
            data={item}
            onSave={saveSite}
          />
        ))}
      </div>

      {/* PROJECT RECRUITMENTS */}
      <h2 className="mt-10 mb-4 text-lg font-bold">Projets de traduction</h2>

      <div className="grid gap-6">
        {pairedProjects.map(({ project, other }) => (
          <div key={project.id} className="grid grid-cols-2 gap-4">
            <RecruitmentForm
              label={project.projects?.title || project.title}
              data={project}
              onSave={saveProject}
            />

            {other && (
              <RecruitmentForm
                label={
                  other.title || project.projects?.title + " : Recrutement site"
                }
                data={other}
                onSave={saveProject}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
