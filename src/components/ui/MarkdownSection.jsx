import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkCustomSpoiler from '@/lib/remarkCustomSpoiler';
import Spoiler from './Spoiler.client';

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---')) return markdown;

  const end = markdown.indexOf('\n---', 3);
  if (end === -1) return markdown;

  return markdown.slice(end + 4).trim();
}


export default function MarkdownSection({
  content,
  className = '',
  imageClassName = '',
}) {
  return (
    <div
      className={`prose prose-invert break-anywhere max-w-none wrap-break-word ${className} prose-p:text-justify prose-a:no-underline prose-a:font-bold`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkCustomSpoiler]}
        rehypePlugins={[rehypeRaw]}
        components={{
          iframe: (props) => (
            <div className="relative my-4 h-0 overflow-hidden rounded-lg pb-[56.25%] shadow-lg">
              <iframe
                {...props}
                className="absolute top-0 left-0 h-full w-full"
                allowFullScreen
              />
            </div>
          ),
          img: (props) => (
            <img {...props} className={imageClassName || undefined} />
          ),
          a: ({ href, children, ...props }) =>
            href?.startsWith('/') ? (
              <Link
                href={href}
                className="text-accent-secondary hover:text-accent-tertiary font-bold no-underline"
                {...props}
              >
                {children}
              </Link>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-secondary hover:text-accent-tertiary font-bold no-underline"
                {...props}
              >
                {children}
              </a>
            ),
          spoiler: ({ title, children }) => (
            <Spoiler title={title}>{children}</Spoiler>
          ),
        }}
      >
        {stripFrontmatter(content)}
      </ReactMarkdown>
    </div>
  );
}
