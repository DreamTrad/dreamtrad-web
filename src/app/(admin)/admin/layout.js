// app/(admin)/admin/layout.js

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  // récup rôle
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  const role = profile?.role;

  let projects = [];

  if (role === "admin" || role === "super_admin") {
    const { data } = await supabase
      .from("projects")
      .select("id, title")
      .order("title");

    projects = data || [];
  } else {
    const { data } = await supabase
      .from("projet_users")
      .select("project_id, projects(id, title)")
      .eq("user_id", user.id);

    projects =
      data?.map((p) => ({
        id: p.projects.id,
        title: p.projects.title,
      })) || [];
  }

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <AdminSidebar projects={projects} role={role} />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}