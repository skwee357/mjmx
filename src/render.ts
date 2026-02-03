import mjml2html from 'mjml';
import type { MjmlNode } from './ast';
import { isMjmlNode } from './ast';
import { serialize } from './serialize';

export type RenderOptions = Parameters<typeof mjml2html>[1];
export type RenderResult = ReturnType<typeof mjml2html>;

export function render(
  mjml: MjmlNode | string,
  options?: RenderOptions
): RenderResult {
  const str = isMjmlNode(mjml) ? serialize(mjml) : mjml;
  return mjml2html(str, options);
}
