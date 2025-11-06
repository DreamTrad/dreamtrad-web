import { Link } from "react-router-dom";

export default function ArticleCard({
  id,
  title,
  author,
  date,
  tags,
  coverImage,
  excerpt,
}) {
  return (
    <Link
      to={`/articles/${id}`}
      className="bg-bg-tertiary border-bg-secondary flex flex-col overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-xl"
    >
      {/* Image */}
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="h-48 w-full object-cover"
        />
      )}

      {/* Infos */}
      <div className="flex flex-grow flex-col gap-2 p-4">
        <h2 className="text-accent text-xl font-bold">{title}</h2>
        <p className="text-text-tertiary text-sm">
          {author} — {new Date(date).toLocaleDateString("fr-FR")}
        </p>
        {excerpt && <p className="flex-grow text-sm">{excerpt}</p>}

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-bg-secondary rounded px-2 py-1 text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
