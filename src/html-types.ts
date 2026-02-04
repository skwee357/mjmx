export interface HtmlGlobalAttributes {
  id?: string;
  class?: string;
  style?: string;
  title?: string;
  lang?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
  hidden?: boolean | 'hidden' | '';
  tabindex?: number | string;
  [key: `data-${string}`]: string | undefined;
}

export interface HtmlAnchorAttributes extends HtmlGlobalAttributes {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  rel?: string;
  download?: string | boolean;
}

export interface HtmlImgAttributes extends HtmlGlobalAttributes {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
}

export interface HtmlTableCellAttributes extends HtmlGlobalAttributes {
  colspan?: number | string;
  rowspan?: number | string;
  align?: 'left' | 'center' | 'right' | 'justify';
  valign?: 'top' | 'middle' | 'bottom' | 'baseline';
}

export interface HtmlListAttributes extends HtmlGlobalAttributes {
  type?: string;
  start?: number | string;
}

export interface HtmlMetaAttributes {
  name?: string;
  content?: string;
  charset?: string;
  'http-equiv'?: string;
}
