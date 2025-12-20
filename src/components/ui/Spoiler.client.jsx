'use client';

import { useState } from 'react';

export default function Spoiler({ title = 'spoiler', children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        onClick={() => setOpen(!open)}
        className="border-bg-secondary bg-bg-secondary text-text-secondary hover:bg-hover hover:text-text flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition"
      >
        <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>
          ▶
        </span>
        {open ? `Cacher ${title}` : `Montrer ${title}`}
      </button>

      {open && (
        <div className="border-bg-secondary bg-bg-tertiary mt-3 rounded-xl border p-3">
          {children}
        </div>
      )}
    </div>
  );
}
