import { useEffect, useState } from "react";
import discordIcon from "../../assets/icons/website/discord.svg";

export default function DiscordWidget({ inviteUrl }) {
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    fetch("https://discord.com/api/guilds/747028148494925864/widget.json")
      .then((res) => res.json())
      .then((data) => setServerData(data))
      .catch((err) => console.error("Failed to fetch Discord data:", err));
  }, []);

  if (!serverData) {
    return (
      <div className="border-hover-secondary bg-bg-tertiary flex flex-col items-center rounded-xl border p-6 text-center">
        <p className="text-text-secondary">Chargement du serveur Discord...</p>
      </div>
    );
  }

  return (
    <div className="border-hover-secondary bg-bg-tertiary flex flex-col items-center rounded-xl border p-6 text-center space-y-4">
      {/* Server info */}
      <div className="flex flex-col items-center">
        <img
          src={
            serverData.icon
              ? `https://cdn.discordapp.com/icons/${serverData.id}/${serverData.icon}.png`
              : discordIcon
          }
          alt="Server Icon"
          className="w-16 h-16 rounded-full mb-2"
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
        <h3 className="text-accent mb-2 text-sm font-semibold">
          Rejoindre le Discord
        </h3>
        <p className="text-text-secondary mb-4 text-xs">
          Discutez, participez aux bêta-tests ou contribuez aux projets !
        </p>
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-tertiary text-accent-secondary inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold shadow transition hover:opacity-90 hover:shadow-lg w-full"
        >
          <img src={discordIcon} alt="Discord" className="h-5 w-5" />
          Rejoindre
        </a>
      </div>
    </div>
  );
}
