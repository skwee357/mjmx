export type CSSPixel = `${number}px` | `${number}`;
export type CSSUnit = CSSPixel;
export type CSSSpacing =
  | CSSUnit
  | `${CSSUnit} ${CSSUnit}`
  | `${CSSUnit} ${CSSUnit} ${CSSUnit}`
  | `${CSSUnit} ${CSSUnit} ${CSSUnit} ${CSSUnit}`;
export type CSSWidth = CSSPixel | `${number}%`;

export type HexColor = `#${string}`;
export type Color = HexColor | (string & {});

export type URLString = URL | (string & {});

export type Align = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type Direction = 'ltr' | 'rtl';

interface PaddingProps {
  padding?: CSSSpacing;
  'padding-top'?: CSSUnit;
  'padding-bottom'?: CSSUnit;
  'padding-left'?: CSSUnit;
  'padding-right'?: CSSUnit;
}

interface BorderProps {
  border?: string;
  'border-bottom'?: string;
  'border-left'?: string;
  'border-right'?: string;
  'border-top'?: string;
  'border-radius'?: CSSUnit;
}

export interface MjmlAttributes {
  owa?: string;
  lang?: string;
  dir?: Direction | 'auto';
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MjHeadAttributes {}

export interface MjBodyAttributes {
  'background-color'?: Color;
  width?: CSSWidth;
  'css-class'?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MjAttributesAttributes {}

export interface MjBreakpointAttributes {
  width: CSSUnit;
}

export interface MjFontAttributes {
  href: URLString;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MjHtmlAttributesAttributes {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MjPreviewAttributes {}

export interface MjStyleAttributes {
  inline?: 'inline';
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MjTitleAttributes {}

export interface MjAllAttributes {
  [key: string]: string | undefined;
}

export interface MjClassAttributes {
  name: string;
  [key: string]: string | undefined;
}

export interface MjAccordionAttributes extends PaddingProps {
  border?: string;
  'font-family'?: string;
  'icon-align'?: Align;
  'icon-height'?: CSSUnit;
  'icon-position'?: 'left' | 'right';
  'icon-unwrapped-alt'?: string;
  'icon-unwrapped-url'?: URLString;
  'icon-width'?: CSSUnit;
  'icon-wrapped-alt'?: string;
  'icon-wrapped-url'?: URLString;
  'css-class'?: string;
}

export interface MjAccordionElementAttributes {
  'background-color'?: Color;
  border?: string;
  'font-family'?: string;
  'icon-align'?: Align;
  'icon-height'?: CSSUnit;
  'icon-position'?: 'left' | 'right';
  'icon-unwrapped-alt'?: string;
  'icon-unwrapped-url'?: URLString;
  'icon-width'?: CSSUnit;
  'icon-wrapped-alt'?: string;
  'icon-wrapped-url'?: URLString;
  'css-class'?: string;
}

export interface MjAccordionTitleAttributes extends PaddingProps {
  'background-color'?: Color;
  color?: Color;
  'font-family'?: string;
  'font-size'?: CSSUnit;
  'css-class'?: string;
}

export interface MjAccordionTextAttributes extends PaddingProps {
  'background-color'?: Color;
  color?: Color;
  'font-family'?: string;
  'font-size'?: CSSUnit;
  'font-weight'?: string;
  'letter-spacing'?: CSSUnit;
  'line-height'?: CSSUnit;
  'css-class'?: string;
}

export interface MjButtonAttributes extends PaddingProps, BorderProps {
  align?: Align;
  'background-color'?: Color;
  color?: Color;
  'container-background-color'?: Color;
  'font-family'?: string;
  'font-size'?: CSSUnit;
  'font-style'?: string;
  'font-weight'?: string;
  height?: CSSUnit;
  href?: URLString;
  'inner-padding'?: CSSSpacing;
  'letter-spacing'?: CSSUnit;
  'line-height'?: CSSUnit;
  rel?: string;
  target?: string;
  'text-align'?: Align;
  'text-decoration'?: string;
  'text-transform'?: string;
  title?: string;
  'vertical-align'?: VerticalAlign;
  width?: CSSWidth;
  'css-class'?: string;
}

export interface MjCarouselAttributes {
  align?: Align;
  'background-color'?: Color;
  'border-radius'?: CSSUnit;
  'icon-width'?: CSSUnit;
  'left-icon'?: URLString;
  'right-icon'?: URLString;
  thumbnails?: 'visible' | 'hidden';
  'tb-border'?: string;
  'tb-border-radius'?: CSSUnit;
  'tb-hover-border-color'?: Color;
  'tb-selected-border-color'?: Color;
  'tb-width'?: CSSUnit;
  'css-class'?: string;
}

export interface MjCarouselImageAttributes {
  alt?: string;
  href?: URLString;
  rel?: string;
  src: URLString;
  target?: string;
  'thumbnails-src'?: URLString;
  title?: string;
  'css-class'?: string;
}

export interface MjColumnAttributes extends PaddingProps, BorderProps {
  'background-color'?: Color;
  'inner-background-color'?: Color;
  'inner-border'?: string;
  'inner-border-bottom'?: string;
  'inner-border-left'?: string;
  'inner-border-radius'?: CSSUnit;
  'inner-border-right'?: string;
  'inner-border-top'?: string;
  'vertical-align'?: VerticalAlign;
  width?: CSSWidth;
  'css-class'?: string;
}

export interface MjDividerAttributes extends PaddingProps {
  'border-color'?: Color;
  'border-style'?: string;
  'border-width'?: CSSUnit;
  'container-background-color'?: Color;
  width?: CSSWidth;
  align?: Align;
  'css-class'?: string;
}

export interface MjGroupAttributes {
  'background-color'?: Color;
  direction?: Direction;
  'vertical-align'?: VerticalAlign;
  width?: CSSWidth;
  'css-class'?: string;
}

export interface MjHeroAttributes extends PaddingProps, BorderProps {
  'background-color'?: Color;
  'background-height'?: CSSUnit;
  'background-position'?: string;
  'background-url'?: URLString;
  'background-width'?: CSSUnit;
  height?: CSSUnit;
  mode?: 'fixed-height' | 'fluid-height';
  'vertical-align'?: VerticalAlign;
  width?: CSSWidth;
  'css-class'?: string;
}

export interface MjImageAttributes extends PaddingProps, BorderProps {
  align?: Align;
  alt?: string;
  'container-background-color'?: Color;
  'fluid-on-mobile'?: 'true' | 'false';
  height?: CSSUnit;
  href?: URLString;
  name?: string;
  rel?: string;
  sizes?: string;
  src?: URLString;
  srcset?: string;
  target?: string;
  title?: string;
  usemap?: string;
  width?: CSSWidth;
  'css-class'?: string;
}

export interface MjNavbarAttributes {
  align?: Align;
  'base-url'?: URLString;
  hamburger?: 'hamburger';
  'ico-align'?: Align;
  'ico-close'?: string;
  'ico-color'?: Color;
  'ico-font-family'?: string;
  'ico-font-size'?: CSSUnit;
  'ico-line-height'?: CSSUnit;
  'ico-open'?: string;
  'ico-padding'?: CSSSpacing;
  'ico-padding-bottom'?: CSSUnit;
  'ico-padding-left'?: CSSUnit;
  'ico-padding-right'?: CSSUnit;
  'ico-padding-top'?: CSSUnit;
  'ico-text-decoration'?: string;
  'ico-text-transform'?: string;
  'css-class'?: string;
}

export interface MjNavbarLinkAttributes extends PaddingProps {
  color?: Color;
  'font-family'?: string;
  'font-size'?: CSSUnit;
  'font-style'?: string;
  'font-weight'?: string;
  href?: URLString;
  'letter-spacing'?: CSSUnit;
  'line-height'?: CSSUnit;
  rel?: string;
  target?: string;
  'text-decoration'?: string;
  'text-transform'?: string;
  'css-class'?: string;
}

export interface MjRawAttributes {
  position?: 'file-start';
}

export interface MjSectionAttributes extends PaddingProps, BorderProps {
  'background-color'?: Color;
  'background-position'?: string;
  'background-position-x'?: string;
  'background-position-y'?: string;
  'background-repeat'?: 'repeat' | 'no-repeat';
  'background-size'?: string;
  'background-url'?: URLString;
  direction?: Direction;
  'full-width'?: 'full-width';
  'text-align'?: Align;
  'css-class'?: string;
}

export interface MjSocialAttributes extends PaddingProps {
  align?: Align;
  'border-radius'?: CSSUnit;
  color?: Color;
  'container-background-color'?: Color;
  'font-family'?: string;
  'font-size'?: CSSUnit;
  'font-style'?: string;
  'font-weight'?: string;
  'icon-height'?: CSSUnit;
  'icon-padding'?: CSSSpacing;
  'icon-size'?: CSSUnit;
  'inner-padding'?: CSSSpacing;
  'line-height'?: CSSUnit;
  mode?: 'horizontal' | 'vertical';
  'text-decoration'?: string;
  'text-padding'?: CSSSpacing;
  'css-class'?: string;
}

export interface MjSocialElementAttributes extends PaddingProps {
  align?: Align;
  alt?: string;
  'background-color'?: Color;
  'border-radius'?: CSSUnit;
  color?: Color;
  'font-family'?: string;
  'font-size'?: CSSUnit;
  'font-style'?: string;
  'font-weight'?: string;
  href?: URLString;
  'icon-height'?: CSSUnit;
  'icon-padding'?: CSSSpacing;
  'icon-size'?: CSSUnit;
  'line-height'?: CSSUnit;
  name?:
    | 'facebook'
    | 'facebook-noshare'
    | 'twitter'
    | 'twitter-noshare'
    | 'x'
    | 'x-noshare'
    | 'google'
    | 'google-noshare'
    | 'pinterest'
    | 'pinterest-noshare'
    | 'linkedin'
    | 'linkedin-noshare'
    | 'instagram'
    | 'web'
    | 'snapchat'
    | 'youtube'
    | 'tumblr'
    | 'tumblr-noshare'
    | 'github'
    | 'xing'
    | 'xing-noshare'
    | 'vimeo'
    | 'medium'
    | 'soundcloud'
    | 'dribbble'
    | (string & {});
  rel?: string;
  sizes?: string;
  src?: URLString;
  srcset?: string;
  target?: string;
  title?: string;
  'text-decoration'?: string;
  'vertical-align'?: VerticalAlign;
  'css-class'?: string;
}

export interface MjSpacerAttributes extends PaddingProps {
  'container-background-color'?: Color;
  height?: CSSUnit;
  'css-class'?: string;
}

export interface MjTableAttributes extends PaddingProps {
  align?: Align;
  border?: string;
  cellpadding?: string;
  cellspacing?: string;
  color?: Color;
  'container-background-color'?: Color;
  'font-family'?: string;
  'font-size'?: CSSUnit;
  'font-style'?: string;
  'font-weight'?: string;
  'line-height'?: CSSUnit;
  role?: 'presentation' | 'none';
  'table-layout'?: 'auto' | 'fixed' | 'initial' | 'inherit';
  width?: CSSWidth;
  'css-class'?: string;
}

export interface MjTextAttributes extends PaddingProps {
  align?: Align;
  color?: Color;
  'container-background-color'?: Color;
  'font-family'?: string;
  'font-size'?: CSSUnit;
  'font-style'?: string;
  'font-weight'?: string;
  height?: CSSUnit;
  'letter-spacing'?: CSSUnit;
  'line-height'?: CSSUnit;
  'text-decoration'?: string;
  'text-transform'?: string;
  'css-class'?: string;
}

export interface MjWrapperAttributes extends PaddingProps, BorderProps {
  'background-color'?: Color;
  'background-position'?: string;
  'background-position-x'?: string;
  'background-position-y'?: string;
  'background-repeat'?: 'repeat' | 'no-repeat';
  'background-size'?: string;
  'background-url'?: URLString;
  'full-width'?: 'full-width';
  'text-align'?: Align;
  'css-class'?: string;
}

export interface MjIncludeAttributes {
  path: string;
  type?: 'html' | 'css' | 'mjml';
  'css-inline'?: 'inline';
}

export interface MjSelectorAttributes {
  path: string;
}

export interface MjHtmlAttributeAttributes {
  name: string;
}
