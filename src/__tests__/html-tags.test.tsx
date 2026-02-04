import { describe, expect, it } from 'vitest';
import { serialize } from '../serialize';

describe('HTML tags in MJML', () => {
  describe('inline HTML in mj-text', () => {
    it('should serialize inline text elements', () => {
      const result = serialize(
        <mj-text>
          <strong>Bold</strong> and <em>italic</em> text
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text><strong>Bold</strong> and <em>italic</em> text</mj-text>'
      );
    });

    it('should serialize anchor tags with attributes', () => {
      const result = serialize(
        <mj-text>
          <a href="https://example.com" target="_blank" rel="noopener">
            Click here
          </a>
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text><a href="https://example.com" target="_blank" rel="noopener">Click here</a></mj-text>'
      );
    });

    it('should serialize br as self-closing', () => {
      const result = serialize(
        <mj-text>
          Line 1<br />
          Line 2
        </mj-text>
      );
      expect(result).toBe('<mj-text>Line 1<br />Line 2</mj-text>');
    });

    it('should serialize nested inline elements', () => {
      const result = serialize(
        <mj-text>
          <strong>
            <em>Bold and italic</em>
          </strong>
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text><strong><em>Bold and italic</em></strong></mj-text>'
      );
    });

    it('should serialize sub and sup elements', () => {
      const result = serialize(
        <mj-text>
          H<sub>2</sub>O and E=mc<sup>2</sup>
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text>H<sub>2</sub>O and E=mc<sup>2</sup></mj-text>'
      );
    });
  });

  describe('lists in mj-text', () => {
    it('should serialize unordered lists', () => {
      const result = serialize(
        <mj-text>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text><ul><li>Item 1</li><li>Item 2</li></ul></mj-text>'
      );
    });

    it('should serialize ordered lists with attributes', () => {
      const result = serialize(
        <mj-text>
          <ol type="A" start={3}>
            <li>Item A</li>
            <li>Item B</li>
          </ol>
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text><ol type="A" start="3"><li>Item A</li><li>Item B</li></ol></mj-text>'
      );
    });
  });

  describe('table elements in mj-table', () => {
    it('should serialize table rows with cells', () => {
      const result = serialize(
        <mj-table>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
          </tr>
        </mj-table>
      );
      expect(result).toBe(
        '<mj-table><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Data 1</td><td>Data 2</td></tr></mj-table>'
      );
    });

    it('should serialize table cells with attributes', () => {
      const result = serialize(
        <mj-table>
          <tr>
            <td colspan={2} align="center" valign="top">
              Merged cell
            </td>
          </tr>
        </mj-table>
      );
      expect(result).toBe(
        '<mj-table><tr><td colspan="2" align="center" valign="top">Merged cell</td></tr></mj-table>'
      );
    });

    it('should serialize thead and tbody', () => {
      const result = serialize(
        <mj-table>
          <thead>
            <tr>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Body</td>
            </tr>
          </tbody>
        </mj-table>
      );
      expect(result).toBe(
        '<mj-table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Body</td></tr></tbody></mj-table>'
      );
    });
  });

  describe('img in mj-table', () => {
    it('should serialize img as self-closing with attributes', () => {
      const result = serialize(
        <mj-table>
          <tr>
            <td>
              <img
                src="https://example.com/img.png"
                alt="Example"
                width={100}
                height={50}
              />
            </td>
          </tr>
        </mj-table>
      );
      expect(result).toBe(
        '<mj-table><tr><td><img src="https://example.com/img.png" alt="Example" width="100" height="50" /></td></tr></mj-table>'
      );
    });
  });

  describe('meta in mj-raw for mj-head', () => {
    it('should serialize meta as self-closing', () => {
      const result = serialize(
        <mj-head>
          <mj-raw>
            <meta name="color-scheme" content="light dark" />
          </mj-raw>
        </mj-head>
      );
      expect(result).toBe(
        '<mj-head><mj-raw><meta name="color-scheme" content="light dark" /></mj-raw></mj-head>'
      );
    });

    it('should serialize meta with http-equiv', () => {
      const result = serialize(
        <mj-head>
          <mj-raw>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          </mj-raw>
        </mj-head>
      );
      expect(result).toBe(
        '<mj-head><mj-raw><meta http-equiv="X-UA-Compatible" content="IE=edge" /></mj-raw></mj-head>'
      );
    });
  });

  describe('void elements', () => {
    it('should serialize br as self-closing', () => {
      const result = serialize(<br />);
      expect(result).toBe('<br />');
    });

    it('should serialize hr as self-closing', () => {
      const result = serialize(<hr />);
      expect(result).toBe('<hr />');
    });

    it('should serialize img as self-closing', () => {
      const result = serialize(<img src="test.png" alt="test" />);
      expect(result).toBe('<img src="test.png" alt="test" />');
    });

    it('should serialize meta as self-closing', () => {
      const result = serialize(<meta name="test" content="value" />);
      expect(result).toBe('<meta name="test" content="value" />');
    });
  });

  describe('block elements in mj-text', () => {
    it('should serialize div and p elements', () => {
      const result = serialize(
        <mj-text>
          <div class="wrapper">
            <p>Paragraph text</p>
          </div>
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text><div class="wrapper"><p>Paragraph text</p></div></mj-text>'
      );
    });

    it('should serialize headings', () => {
      const result = serialize(
        <mj-text>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text><h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3></mj-text>'
      );
    });

    it('should serialize blockquote and pre', () => {
      const result = serialize(
        <mj-text>
          <blockquote>A quote</blockquote>
          <pre>{'code block'}</pre>
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text><blockquote>A quote</blockquote><pre>code block</pre></mj-text>'
      );
    });

    it('should serialize hr as self-closing in mj-text', () => {
      const result = serialize(
        <mj-text>
          Content above
          <hr />
          Content below
        </mj-text>
      );
      expect(result).toBe(
        '<mj-text>Content above<hr />Content below</mj-text>'
      );
    });
  });

  describe('conditional comments as raw strings', () => {
    it('should pass conditional comments as raw strings in mj-raw', () => {
      const result = serialize(
        <mj-raw>{'<!--[if mso]><table><tr><td><![endif]-->'}</mj-raw>
      );
      expect(result).toBe(
        '<mj-raw><!--[if mso]><table><tr><td><![endif]--></mj-raw>'
      );
    });
  });

  describe('global attributes', () => {
    it('should serialize id, class, and style attributes', () => {
      const result = serialize(
        <div id="container" class="wrapper" style="color: red;">
          Content
        </div>
      );
      expect(result).toBe(
        '<div id="container" class="wrapper" style="color: red;">Content</div>'
      );
    });

    it('should serialize data attributes', () => {
      const result = serialize(
        <span data-testid="test" data-value="123">
          Text
        </span>
      );
      expect(result).toBe(
        '<span data-testid="test" data-value="123">Text</span>'
      );
    });
  });
});
