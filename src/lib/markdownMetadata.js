export function extractMarkdownMetadata(markdown) {
  if (!markdown.startsWith('---')) {
    return {
      description: '',
      body: markdown,
    };
  }

  const end = markdown.indexOf('\n---', 3);
  if (end === -1) {
    return {
      description: '',
      body: markdown,
    };
  }

  return {
    description: markdown.slice(3, end).trim(),
    body: markdown.slice(end + 4).trim(),
  };
}

// Extract first H1 for title
export function extractFirstTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : 'DreamTrad';
}
