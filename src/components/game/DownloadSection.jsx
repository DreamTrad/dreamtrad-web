import { useEffect, useState } from "react";
import MarkdownSection from "../ui/MarkdownSection";
import DownloadButton from "../ui/DownloadButton";
import ImageCarousel from "../game/ImageCarousel";
import ProjectProgressCard from "../card/ProjectProgressCard";

export default function DownloadSection({ gameId, file, platforms }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data/progress.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const project = projects.find((p) => p.id === gameId);

  return (
    <div className="space-y-16">
      {file && <MarkdownSection gameId={gameId} file={file} />}

      {/* ProgressCard */}
      {project && (
        <div className="flex justify-center">
          <ProjectProgressCard
            id={project.id}
            title={project.title}
            image={project.image}
            progress={project.progress}
          />
        </div>
      )}

      <ImageCarousel gameId={gameId} interval={15000} />

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
