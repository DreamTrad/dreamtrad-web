// app/(admin)/admin/layout.js

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }) {
  const supabase = createSupabaseServerClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title")
    .order("title");

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <AdminSidebar projects={projects || []} />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">
          <div className="rounded-2xl bg-bg-secondary/80 p-6 shadow-xl backdrop-blur">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}