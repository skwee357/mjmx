export const MJML_NODE_TYPE = Symbol.for('mjmx.node');

export const Fragment = Symbol.for('mjmx.fragment');

export interface MjmlNode {
  readonly $$typeof: typeof MJML_NODE_TYPE;
  readonly tag: string | typeof Fragment;
  readonly attributes: Record<string, string | undefined>;
  readonly children: MjmlChild[];
}

export type MjmlChild =
  | MjmlNode
  | string
  | number
  | boolean
  | null
  | undefined
  | MjmlChild[];

export function isMjmlNode(value: unknown): value is MjmlNode {
  return (
    typeof value === 'object' &&
    value !== null &&
    '$$typeof' in value &&
    value.$$typeof === MJML_NODE_TYPE
  );
}

export function createNode(
  tag: string | typeof Fragment,
  attributes: Record<string, unknown>,
  children: MjmlChild[]
): MjmlNode {
  const stringAttributes: Record<string, string | undefined> = {};

  for (const [key, value] of Object.entries(attributes)) {
    if (value === undefined || value === null) {
      continue;
    }
    if (value instanceof URL) {
      stringAttributes[key] = value.toString();
    } else {
      stringAttributes[key] = String(value);
    }
  }

  return {
    $$typeof: MJML_NODE_TYPE,
    tag,
    attributes: stringAttributes,
    children,
  };
}
