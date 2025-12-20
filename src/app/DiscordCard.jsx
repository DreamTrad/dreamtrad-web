"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DiscordWidget({ inviteUrl }) {
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    fetch("https://discord.com/api/guilds/747028148494925864/widget.json")
      .then((res) => res.json())
      .then((data) => setServerData(data))
      .catch((err) => console.error("Failed to fetch Discord data:", err));
  }, []);

  if (!serverData)
    return (
      <p className="text-text-secondary text-center">
        Chargement du serveur Discord…
      </p>
    );

  return (
    <div className="border-hover-secondary bg-bg-tertiary flex flex-col items-center space-y-4 rounded-xl border p-6 text-center">
      {/* Server info */}
      <div className="flex flex-col items-center">
        <Image
          src={
            serverData.icon
              ? `https://cdn.discordapp.com/icons/${serverData.id}/${serverData.icon}.png`
              : "/icons/website/discord.svg"
          }
          alt="Server Icon"
          width={64}
          height={64}
          className="mb-2 h-16 w-16 rounded-full"
        />
        <h2 className="text-accent mb-1 text-lg font-semibold">
          {serverData.name}
        </h2>
        <p className="text-text-secondary text-sm">
          {serverData.members.length} membres en ligne
        </p>
      </div>

      {/* Invite Card */}
      <div className="w-full">
        <h3 className="text-accent mb-2 font-semibold">Rejoindre le Discord</h3>
        <p className="text-text-secondary mb-4 text-sm">
          Discutez de Visual Novel, participez aux bêta-tests ou contribuez aux
          projets !
        </p>
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-tertiary text-text inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold shadow transition hover:opacity-90 hover:shadow-lg"
        >
          <Image
            src="/icons/website/discord.svg"
            alt="Discord"
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
