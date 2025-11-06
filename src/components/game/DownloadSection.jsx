import MarkdownSection from "../ui/MarkdownSection";
import DownloadButton from "../ui/DownloadButton";

export default function DownloadSection({ gameId, file, platforms }) {
  return (
    <div className="space-y-16">
      {file && <MarkdownSection gameId={gameId} file={file} />}

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
    </div>
  );
}
