import { createNode, Fragment, type MjmlChild, type MjmlNode } from './ast';
import type {
  HtmlAnchorAttributes,
  HtmlGlobalAttributes,
  HtmlImgAttributes,
  HtmlListAttributes,
  HtmlMetaAttributes,
  HtmlTableCellAttributes,
} from './html-types';
import type {
  MjAccordionAttributes,
  MjAccordionElementAttributes,
  MjAccordionTextAttributes,
  MjAccordionTitleAttributes,
  MjAllAttributes,
  MjAttributesAttributes,
  MjBodyAttributes,
  MjBreakpointAttributes,
  MjButtonAttributes,
  MjCarouselAttributes,
  MjCarouselImageAttributes,
  MjClassAttributes,
  MjColumnAttributes,
  MjDividerAttributes,
  MjFontAttributes,
  MjGroupAttributes,
  MjHeadAttributes,
  MjHeroAttributes,
  MjHtmlAttributeAttributes,
  MjHtmlAttributesAttributes,
  MjImageAttributes,
  MjIncludeAttributes,
  MjmlAttributes,
  MjNavbarAttributes,
  MjNavbarLinkAttributes,
  MjPreviewAttributes,
  MjRawAttributes,
  MjSectionAttributes,
  MjSelectorAttributes,
  MjSocialAttributes,
  MjSocialElementAttributes,
  MjSpacerAttributes,
  MjStyleAttributes,
  MjTableAttributes,
  MjTextAttributes,
  MjTitleAttributes,
  MjWrapperAttributes,
} from './types';

export { Fragment };

type PropsWithChildren<T = object> = T & { children?: MjmlChild };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Component = (props: any) => MjmlNode;

export function jsx(
  tag: string | typeof Fragment | Component,
  props: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _key?: string
): MjmlNode {
  if (typeof tag === 'function') {
    return tag(props);
  }

  const { children, ...attributes } = props;

  const childArray: MjmlChild[] =
    children === undefined
      ? []
      : Array.isArray(children)
        ? children
        : [children as MjmlChild];

  return createNode(tag, attributes, childArray);
}

export const jsxs = jsx;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export type Element = MjmlNode;
  export type ElementType = string | typeof Fragment | Component;

  export interface ElementChildrenAttribute {
    children: MjmlChild;
  }

  export interface IntrinsicElements {
    mjml: PropsWithChildren<MjmlAttributes>;
    'mj-head': PropsWithChildren<MjHeadAttributes>;
    'mj-body': PropsWithChildren<MjBodyAttributes>;
    'mj-attributes': PropsWithChildren<MjAttributesAttributes>;
    'mj-breakpoint': MjBreakpointAttributes;
    'mj-font': MjFontAttributes;
    'mj-html-attributes': PropsWithChildren<MjHtmlAttributesAttributes>;
    'mj-preview': PropsWithChildren<MjPreviewAttributes>;
    'mj-style': PropsWithChildren<MjStyleAttributes>;
    'mj-title': PropsWithChildren<MjTitleAttributes>;
    'mj-all': MjAllAttributes;
    'mj-class': MjClassAttributes;
    'mj-section': PropsWithChildren<MjSectionAttributes>;
    'mj-column': PropsWithChildren<MjColumnAttributes>;
    'mj-group': PropsWithChildren<MjGroupAttributes>;
    'mj-wrapper': PropsWithChildren<MjWrapperAttributes>;
    'mj-text': PropsWithChildren<MjTextAttributes>;
    'mj-button': PropsWithChildren<MjButtonAttributes>;
    'mj-image': MjImageAttributes;
    'mj-divider': MjDividerAttributes;
    'mj-spacer': MjSpacerAttributes;
    'mj-table': PropsWithChildren<MjTableAttributes>;
    'mj-raw': PropsWithChildren<MjRawAttributes>;
    'mj-hero': PropsWithChildren<MjHeroAttributes>;
    'mj-accordion': PropsWithChildren<MjAccordionAttributes>;
    'mj-accordion-element': PropsWithChildren<MjAccordionElementAttributes>;
    'mj-accordion-title': PropsWithChildren<MjAccordionTitleAttributes>;
    'mj-accordion-text': PropsWithChildren<MjAccordionTextAttributes>;
    'mj-carousel': PropsWithChildren<MjCarouselAttributes>;
    'mj-carousel-image': MjCarouselImageAttributes;
    'mj-navbar': PropsWithChildren<MjNavbarAttributes>;
    'mj-navbar-link': PropsWithChildren<MjNavbarLinkAttributes>;
    'mj-social': PropsWithChildren<MjSocialAttributes>;
    'mj-social-element': PropsWithChildren<MjSocialElementAttributes>;
    'mj-include': MjIncludeAttributes;
    'mj-selector': PropsWithChildren<MjSelectorAttributes>;
    'mj-html-attribute': PropsWithChildren<MjHtmlAttributeAttributes>;

    // HTML inline text elements (for mj-text)
    a: PropsWithChildren<HtmlAnchorAttributes>;
    span: PropsWithChildren<HtmlGlobalAttributes>;
    strong: PropsWithChildren<HtmlGlobalAttributes>;
    b: PropsWithChildren<HtmlGlobalAttributes>;
    em: PropsWithChildren<HtmlGlobalAttributes>;
    i: PropsWithChildren<HtmlGlobalAttributes>;
    u: PropsWithChildren<HtmlGlobalAttributes>;
    s: PropsWithChildren<HtmlGlobalAttributes>;
    small: PropsWithChildren<HtmlGlobalAttributes>;
    code: PropsWithChildren<HtmlGlobalAttributes>;
    sub: PropsWithChildren<HtmlGlobalAttributes>;
    sup: PropsWithChildren<HtmlGlobalAttributes>;
    br: HtmlGlobalAttributes;

    // HTML block text elements (for mj-text)
    div: PropsWithChildren<HtmlGlobalAttributes>;
    p: PropsWithChildren<HtmlGlobalAttributes>;
    h1: PropsWithChildren<HtmlGlobalAttributes>;
    h2: PropsWithChildren<HtmlGlobalAttributes>;
    h3: PropsWithChildren<HtmlGlobalAttributes>;
    h4: PropsWithChildren<HtmlGlobalAttributes>;
    h5: PropsWithChildren<HtmlGlobalAttributes>;
    h6: PropsWithChildren<HtmlGlobalAttributes>;
    ul: PropsWithChildren<HtmlListAttributes>;
    ol: PropsWithChildren<HtmlListAttributes>;
    li: PropsWithChildren<HtmlGlobalAttributes>;
    blockquote: PropsWithChildren<HtmlGlobalAttributes>;
    pre: PropsWithChildren<HtmlGlobalAttributes>;
    hr: HtmlGlobalAttributes;

    // HTML table elements (for mj-table - use mj-table instead of <table>)
    tr: PropsWithChildren<HtmlGlobalAttributes>;
    td: PropsWithChildren<HtmlTableCellAttributes>;
    th: PropsWithChildren<HtmlTableCellAttributes>;
    thead: PropsWithChildren<HtmlGlobalAttributes>;
    tbody: PropsWithChildren<HtmlGlobalAttributes>;

    // HTML media elements (for mj-table - mj-image can't be used inside mj-table)
    img: HtmlImgAttributes;

    // HTML head elements (for mj-raw in mj-head - dark mode support)
    meta: HtmlMetaAttributes;
  }
}
