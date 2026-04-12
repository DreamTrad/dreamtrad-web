"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DiscordWidget({ inviteUrl }) {
  const [serverData, setServerData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://discord.com/api/guilds/747028148494925864/widget.json", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Discord API error");
        return res.json();
      })
      .then((data) => setServerData(data))
      .catch(() => setError(true));

    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <p className="text-text-secondary text-center">
        Impossible de charger le serveur Discord.
      </p>
    );
  }

  if (!serverData) {
    return (
      <div className="bg-bg-secondary h-32 w-full animate-pulse rounded-xl" />
    );
  }

  const iconUrl = serverData.icon
    ? `https://cdn.discordapp.com/icons/${serverData.id}/${serverData.icon}.png`
    : "/icons/website/discord.svg";

  return (
    <div className="border-hover-secondary bg-bg-tertiary flex flex-col items-center space-y-4 rounded-xl border p-6 text-center">
      {/* Server info */}
      <div className="flex flex-col items-center">
        <Image
          src={iconUrl}
          alt="Server Icon"
          width={64}
          height={64}
          className="mb-2 h-16 w-16 rounded-full"
        />

        <h2 className="text-accent mb-1 text-lg font-semibold">
          {serverData.name}
        </h2>

        <p className="text-text-secondary text-sm">
          {serverData.members?.length ?? 0} membres en ligne
        </p>
      </div>

      {/* Invite Card */}
      <div className="w-full">
        <h3 className="text-accent mb-2 font-semibold">Rejoindre le Discord</h3>

        <p className="text-text-secondary mb-4 text-sm">
          Discutez de visual novels, participez aux bêta-tests ou contribuez aux
          projets.
        </p>

        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rejoindre le serveur Discord"
          className="bg-accent-tertiary text-text inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold shadow transition hover:opacity-90 hover:shadow-lg"
        >
          <Image
            src="/icons/website/discord.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
          Rejoindre
        </a>
      </div>
    </div>
  );
}
