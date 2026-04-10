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
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");

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

    const { data: allProjects } = await supabase
      .from("projects")
      .select("id, title")
      .order("title");

    setProject(projectData || []);
    setOther(otherData || []);
    setSite(siteData || []);
    setProjectsList(allProjects || []);

    if (allProjects?.length && !selectedProjectId) {
      setSelectedProjectId(String(allProjects[0].id));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProjects = selectedProjectId
    ? project.filter(
        (p) => String(p.projects?.id) === String(selectedProjectId),
      )
    : [];

  const filteredOther = selectedProjectId
    ? other.filter((o) => String(o.projects?.id) === String(selectedProjectId))
    : [];

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
      <div className="mb-10">
        <h1 className="mb-4 text-2xl font-bold">Infobox recrutement</h1>
        <PageEditor slug="recrutement" file="infobox" />
      </div>

      {/* SITE */}
      <h2 className="mb-4 text-lg font-bold">Site & autres projets</h2>

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

      {/* PROJECTS */}
      <h2 className="mt-10 mb-4 text-lg font-bold">Projets de traduction</h2>

      {/* SELECT */}
      <div className="mt-8 mb-8 flex items-center gap-4">
        <span className="font-bold">Afficher le recrutement du projet :</span>

        <select
          className="bg-bg-secondary rounded border p-2"
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          {projectsList.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {filteredProjects.map((projectItem) => {
          const otherItem = filteredOther.find(
            (o) => o.projects?.id === projectItem.projects?.id,
          );

          return (
            <div key={projectItem.id} className="grid grid-cols-2 gap-4">
              <RecruitmentForm
                label={projectItem.projects?.title || projectItem.title}
                data={projectItem}
                onSave={saveProject}
              />

              {otherItem && (
                <RecruitmentForm
                  label={
                    otherItem.title ||
                    projectItem.projects?.title + " : Aide pour le site"
                  }
                  data={otherItem}
                  onSave={saveProject}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
