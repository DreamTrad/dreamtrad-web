import { Link } from "react-router-dom";

export default function ArticleCard({ id, title, author, date, tags, coverImage, excerpt }) {
  return (
    <Link
      to={`/articles/${id}`}
      className="bg-bg-tertiary rounded-lg shadow-md overflow-hidden border border-bg-secondary flex flex-col hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Infos */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h2 className="text-xl font-bold text-accent">{title}</h2>
        <p className="text-sm text-text-tertiary">
          {author} — {new Date(date).toLocaleDateString("fr-FR")}
        </p>
        {excerpt && <p className="text-sm flex-grow">{excerpt}</p>}

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-bg-secondary px-2 py-1 rounded text-xs"
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
