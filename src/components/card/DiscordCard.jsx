import discordIcon from "../../assets/icons/website/discord.svg";

export default function DiscordCard({ inviteUrl }) {
  return (
    <div className="border border-bg-secondary bg-bg-tertiary rounded-xl shadow-md p-6 text-center flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2 text-accent">
        Rejoindre le Discord
      </h2>

      <p className="text-sm text-text-secondary mb-4">
        Rejoignez notre Discord pour discuter, participer aux beta-tests,
        ou aider sur les différents projets !
      </p>

      <a
        href={inviteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-4 py-2 rounded-lg shadow hover:shadow-lg hover:opacity-90 transition"
      >
        <img src={discordIcon} alt="Discord" className="w-5 h-5 bg-white" />
        Rejoindre
      </a>
    </div>
  );
}
