import { Fragment, isMjmlNode, type MjmlChild, type MjmlNode } from './ast';

const SELF_CLOSING_TAGS = new Set([
  // MJML
  'mj-all',
  'mj-breakpoint',
  'mj-carousel-image',
  'mj-class',
  'mj-divider',
  'mj-font',
  'mj-image',
  'mj-include',
  'mj-spacer',
  // HTML void elements
  'br',
  'hr',
  'img',
  'meta',
]);

function serializeAttributes(
  attributes: Record<string, string | undefined>
): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(attributes)) {
    if (value !== undefined) {
      parts.push(`${key}="${value}"`);
    }
  }

  return parts.length > 0 ? ' ' + parts.join(' ') : '';
}

function serializeChildren(children: MjmlChild[]): string {
  const parts: string[] = [];

  for (const child of children) {
    if (
      child === null ||
      child === undefined ||
      child === true ||
      child === false
    ) {
      continue;
    }

    if (Array.isArray(child)) {
      parts.push(serializeChildren(child));
    } else if (isMjmlNode(child)) {
      parts.push(serializeNode(child));
    } else {
      parts.push(String(child));
    }
  }

  return parts.join('');
}

function serializeNode(node: MjmlNode): string {
  if (node.tag === Fragment) {
    return serializeChildren(node.children);
  }

  const tag = node.tag as string;
  const attrs = serializeAttributes(node.attributes);

  if (SELF_CLOSING_TAGS.has(tag)) {
    return `<${tag}${attrs} />`;
  }

  const content = serializeChildren(node.children);
  return `<${tag}${attrs}>${content}</${tag}>`;
}

export function serialize(node: MjmlNode): string {
  return serializeNode(node);
}

export const toMjmlString = serialize;
