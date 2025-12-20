"use client";

import DownloadButton from "./DownloadButton";

export default function DownloadClient({ platforms }) {
  if (!platforms?.length) return null;

  return (
      <div className="grid justify-center gap-10">
        {platforms.map((p) => (
          <DownloadButton
            className="w-full max-w-md"
            key={p.id}
            href={p.link}
            fullWidth
          >
            {p.name}
          </DownloadButton>
        ))}
      </div>
  );
}
