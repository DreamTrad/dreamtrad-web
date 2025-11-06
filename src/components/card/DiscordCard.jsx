import discordIcon from "../../assets/icons/website/discord.svg";

export default function DiscordCard({ inviteUrl }) {
  return (
    <div className="border-hover-secondary bg-bg-tertiary flex flex-col items-center rounded-xl border p-6 text-center">
      <h2 className="text-accent mb-2 text-lg font-semibold">
        Rejoindre le Discord
      </h2>

      <p className="text-text-secondary mb-4 text-sm">
        Rejoignez notre Discord pour discuter, participer aux beta-tests, ou
        aider sur les différents projets !
      </p>

      <a
        href={inviteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-accent-tertiary text-accent-secondary inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold shadow transition hover:opacity-90 hover:shadow-lg"
      >
        <img src={discordIcon} alt="Discord" className="h-5 w-5" />
        Rejoindre
      </a>
    </div>
  );
}
