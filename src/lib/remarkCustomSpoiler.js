import { visit } from 'unist-util-visit';

export default function remarkCustomSpoiler() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 'spoiler') {
        const data = node.data || (node.data = {});
        data.hName = 'spoiler';

        let title = 'spoiler';

        if (
          node.children?.length > 0 &&
          node.children[0].type === 'paragraph'
        ) {
          const first = node.children[0].children?.[0];
          if (first?.type === 'text') {
            title = first.value.trim();
            node.children.shift();
          }
        }

        data.hProperties = { title };
      }
    });
  };
}
