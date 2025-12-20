import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({
  id,
  slug,
  title,
  author,
  date,
  tags = [],
  excerpt,
}) {
  const coverImage = `/articles-content/${id}/cover.webp`;

  return (
    <Link
      href={`/articles/${slug}`}
      className="group bg-bg-tertiary border-hover-tertiary flex flex-col overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-xl"
    >
      {/* Image */}
      <Image
        src={coverImage}
        alt={title}
        width={400}
        height={200}
        className="h-48 w-full object-cover"
      />

      {/* Infos */}
      <div className="flex grow flex-col gap-2 p-4">
        <h2 className="text-text text-xl font-bold transition-colors group-hover:text-accent">
          {title}
        </h2>

        <p className="text-text text-sm">
          {author} — {new Date(date).toLocaleDateString("fr-FR")}
        </p>

        {excerpt && <p className="text-text grow text-sm">{excerpt}</p>}

        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-bg-secondary text-text-secondary rounded px-2 py-1 text-xs"
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
