import DownloadButton from "./DownloadButton";

export default function DownloadClient({ patches }) {

  return (
    <div className="grid justify-center gap-10">
      {!patches || patches.length === 0 ? (
        <p className="text-text-secondary text-center">
          Aucun patch disponible.
        </p>
      ) : (
        patches.map((p) => (
          <DownloadButton
            key={p.id}
            href={p.link}
            fullWidth
            className="w-full max-w-md"
          >
            {p.name}
          </DownloadButton>
        ))
      )}
    </div>
  );
}
