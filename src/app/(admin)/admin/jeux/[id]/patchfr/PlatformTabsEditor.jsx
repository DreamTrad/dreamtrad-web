"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import PageEditor from "@/components/PageEditor";
import PageImagesManager from "@/components/PageImagesManager";

export default function PlatformTabsEditor({ slug }) {
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(null);

  const [newTabName, setNewTabName] = useState("");

  const fetchPages = async () => {
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("type", "installation")
      .order("position");

    setPages(data || []);
    if (data?.length) setActivePage(data[0]);
  };

  useEffect(() => {
    if (slug) fetchPages();
  }, [slug]);

  const updateVisibility = async (page, value) => {
    await supabase
      .from("pages")
      .update({ is_visible: value })
      .eq("slug", page.slug)
      .eq("file", page.file);

    fetchPages();
  };

  const removeTab = async (page) => {
    if (!confirm("Supprimer cet onglet ?")) return;

    await supabase
      .from("pages")
      .delete()
      .eq("slug", page.slug)
      .eq("file", page.file);

    fetchPages();
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_");

  const makeUniqueFile = (base, existing) => {
    let name = base;
    let i = 1;

    while (existing.includes(name)) {
      name = `${base}_${i}`;
      i++;
    }

    return name;
  };

  const addTab = async () => {
    const base = slugify(newTabName);
    if (!base) return;

    const existingFiles = pages.map((p) => p.file);
    const file = makeUniqueFile(base, existingFiles);

    await supabase.from("pages").insert({
      slug,
      file,
      type: "installation",
      title: newTabName,
      content: "",
      is_visible: false,
      position: pages.length,
    });

    setNewTabName("");
    fetchPages();
  };

  if (!pages.length) return null;

  const getButtonClass = (p) =>
    `flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition ${
      activePage?.file === p.file
        ? "bg-bg-tertiary text-text border-accent"
        : "bg-bg-secondary text-text-secondary border-bg-tertiary hover:bg-hover-secondary"
    }`;

  return (
    <div className="bg-bg-tertiary rounded-2xl p-6 flex flex-col gap-6">
      <h2 className="text-lg font-bold">Installation</h2>

      {/* ADD TAB */}
      <div className="flex gap-2">
        <input
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
          placeholder="Nom du nouvel onglet"
          className="bg-bg-secondary flex-1 rounded px-3 py-2 text-sm"
        />

        <button
          onClick={addTab}
          className="bg-accent rounded px-4 py-2 text-white"
        >
          Ajouter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {pages.map((p) => (
          <div key={p.file} className={getButtonClass(p)}>
            <button onClick={() => setActivePage(p)}>
              {p.title || p.file}
            </button>

            {/* Visible toggle */}
            <input
              type="checkbox"
              checked={p.is_visible}
              onChange={(e) => updateVisibility(p, e.target.checked)}
            />

            {/* Delete */}
            <button
              onClick={() => removeTab(p)}
              className="text-error text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Content */}
      {activePage && (
        <div className="flex flex-col gap-6">
          <PageEditor
            slug={activePage.slug}
            file={activePage.file}
            type="installation"
            editTitle
            editContent
          />

          <PageImagesManager
            slug={activePage.slug}
            file={activePage.file}
            ignoreFile={true}
          />
        </div>
      )}
    </div>
  );
}