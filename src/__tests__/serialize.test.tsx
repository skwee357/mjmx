import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { MJML_NODE_TYPE, type MjmlNode } from '../ast';
import { serialize } from '../serialize';

const __dirname = dirname(fileURLToPath(import.meta.url));

function normalizeXml(xml: string): string {
  return xml.replace(/>\s+</g, '><').trim();
}

describe('serialize', () => {
  it('should serialize JSX to match comprehensive MJML fixture', async () => {
    const fixturePath = join(__dirname, 'fixtures', 'comprehensive.mjml');
    const expected = await readFile(fixturePath, 'utf-8');

    const mjmlTree = (
      <mjml lang="en">
        <mj-head>
          <mj-title>Welcome Email</mj-title>
          <mj-preview>Preview text for email clients</mj-preview>
          <mj-font
            name="Roboto"
            href="https://fonts.googleapis.com/css?family=Roboto:400,700"
          />
          <mj-breakpoint width="480px" />
          <mj-attributes>
            <mj-all font-family="Roboto, Arial, sans-serif" />
            <mj-class name="blue" color="#007bff" />
          </mj-attributes>
          <mj-style>{'.custom-class { color: red; }'}</mj-style>
        </mj-head>
        <mj-body background-color="#f4f4f4">
          <mj-wrapper padding="20px">
            <mj-section background-color="#ffffff" padding="20px">
              <mj-column width="100%">
                <mj-image
                  src="https://example.com/logo.png"
                  alt="Logo"
                  width="150px"
                />
                <mj-text font-size="24px" font-weight="bold">
                  Welcome to Our Service
                </mj-text>
                <mj-divider border-color="#007bff" />
              </mj-column>
            </mj-section>
          </mj-wrapper>
          <mj-section padding="20px">
            <mj-group>
              <mj-column width="50%">
                <mj-text>Left column content</mj-text>
                <mj-button
                  href="https://example.com/action"
                  background-color="#007bff"
                >
                  Click Here
                </mj-button>
              </mj-column>
              <mj-column width="50%">
                <mj-text>Right column content</mj-text>
                <mj-spacer height="20px" />
              </mj-column>
            </mj-group>
          </mj-section>
          <mj-section padding="10px">
            <mj-column>
              <mj-social mode="horizontal">
                <mj-social-element
                  name="facebook"
                  href="https://facebook.com/example"
                >
                  Facebook
                </mj-social-element>
                <mj-social-element
                  name="twitter"
                  href="https://twitter.com/example"
                >
                  Twitter
                </mj-social-element>
              </mj-social>
            </mj-column>
          </mj-section>
          <mj-section padding="10px">
            <mj-column>
              <mj-navbar>
                <mj-navbar-link href="https://example.com/home">
                  Home
                </mj-navbar-link>
                <mj-navbar-link href="https://example.com/about">
                  About
                </mj-navbar-link>
              </mj-navbar>
            </mj-column>
          </mj-section>
          <mj-section padding="10px">
            <mj-column>
              <mj-accordion>
                <mj-accordion-element>
                  <mj-accordion-title>Question 1</mj-accordion-title>
                  <mj-accordion-text>Answer to question 1</mj-accordion-text>
                </mj-accordion-element>
                <mj-accordion-element>
                  <mj-accordion-title>Question 2</mj-accordion-title>
                  <mj-accordion-text>Answer to question 2</mj-accordion-text>
                </mj-accordion-element>
              </mj-accordion>
            </mj-column>
          </mj-section>
          <mj-hero
            mode="fixed-height"
            height="300px"
            background-url="https://example.com/hero.jpg"
            background-color="#ffffff"
          >
            <mj-text font-size="32px" color="#ffffff">
              Hero Section
            </mj-text>
            <mj-button href="https://example.com/cta">Call to Action</mj-button>
          </mj-hero>
          <mj-section padding="10px">
            <mj-column>
              <mj-table>Name | Value</mj-table>
            </mj-column>
          </mj-section>
          <mj-section padding="10px">
            <mj-column>
              <mj-raw>Custom content here</mj-raw>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    );

    const result = serialize(mjmlTree);
    expect(normalizeXml(result)).toBe(normalizeXml(expected));
  });

  it('should not auto-escape strings (raw output)', () => {
    const result = serialize(<mj-text>{'<strong>Bold</strong>'}</mj-text>);
    expect(result).toBe('<mj-text><strong>Bold</strong></mj-text>');
  });

  it('should omit attributes with undefined values', () => {
    // Bypass createNode to test defensive branch in serializeAttributes
    const node: MjmlNode = {
      $$typeof: MJML_NODE_TYPE,
      tag: 'a',
      attributes: { href: undefined, class: 'link' },
      children: ['Link'],
    };
    const result = serialize(node);
    expect(result).toBe('<a class="link">Link</a>');
  });

  it('should handle nested arrays (from map with siblings)', () => {
    const items = ['A', 'B'];
    const result = serialize(
      <mj-section>
        {items.map((item) => (
          <mj-text>{item}</mj-text>
        ))}
        <mj-text>Footer</mj-text>
      </mj-section>
    );
    expect(result).toBe(
      '<mj-section><mj-text>A</mj-text><mj-text>B</mj-text><mj-text>Footer</mj-text></mj-section>'
    );
  });

  it('should serialize JSX with HTML tags to match comprehensive-html MJML fixture', async () => {
    const fixturePath = join(__dirname, 'fixtures', 'comprehensive-html.mjml');
    const expected = await readFile(fixturePath, 'utf-8');

    const mjmlTree = (
      <mjml lang="en">
        <mj-head>
          <mj-title>HTML Tags Email</mj-title>
          <mj-preview>Email with HTML content</mj-preview>
          <mj-raw>
            <meta name="color-scheme" content="light dark" />
            <meta name="supported-color-schemes" content="light dark" />
          </mj-raw>
          <mj-style>{'.highlight { background-color: yellow; }'}</mj-style>
        </mj-head>
        <mj-body background-color="#f4f4f4">
          <mj-section background-color="#ffffff" padding="20px">
            <mj-column>
              <mj-text font-size="18px">
                <h1>Welcome to Our Newsletter</h1>
                <p>
                  We're excited to have you here. Check out our{' '}
                  <strong>latest updates</strong> and <em>special offers</em>{' '}
                  below.
                </p>
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section padding="20px">
            <mj-column>
              <mj-text>
                <h2>What's New</h2>
                <ul>
                  <li>
                    Feature <strong>A</strong> - Improved performance
                  </li>
                  <li>
                    Feature <strong>B</strong> - New dashboard
                  </li>
                  <li>
                    Feature <strong>C</strong> - Better analytics
                  </li>
                </ul>
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section padding="20px">
            <mj-column>
              <mj-text>
                <h2>Quick Links</h2>
                <p>
                  Visit our{' '}
                  <a
                    href="https://example.com/docs"
                    target="_blank"
                    rel="noopener"
                  >
                    documentation
                  </a>{' '}
                  or <a href="https://example.com/support">contact support</a>.
                </p>
                <p>
                  Use code <code>SAVE20</code> for 20% off!
                </p>
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section padding="20px">
            <mj-column>
              <mj-text>
                <h2>Pricing Comparison</h2>
              </mj-text>
              <mj-table>
                <thead>
                  <tr>
                    <th align="left">Plan</th>
                    <th align="center">Price</th>
                    <th align="right">Users</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="left">Basic</td>
                    <td align="center">$9/mo</td>
                    <td align="right">1</td>
                  </tr>
                  <tr>
                    <td align="left">Pro</td>
                    <td align="center">$29/mo</td>
                    <td align="right">5</td>
                  </tr>
                  <tr>
                    <td align="left">Enterprise</td>
                    <td align="center">$99/mo</td>
                    <td align="right">Unlimited</td>
                  </tr>
                </tbody>
              </mj-table>
            </mj-column>
          </mj-section>
          <mj-section padding="20px">
            <mj-column>
              <mj-text>
                <h2>Product Gallery</h2>
              </mj-text>
              <mj-table>
                <tr>
                  <td align="center" valign="top">
                    <img
                      src="https://example.com/product1.jpg"
                      alt="Product 1"
                      width={150}
                      height={150}
                    />
                    <br />
                    <strong>Product 1</strong>
                  </td>
                  <td align="center" valign="top">
                    <img
                      src="https://example.com/product2.jpg"
                      alt="Product 2"
                      width={150}
                      height={150}
                    />
                    <br />
                    <strong>Product 2</strong>
                  </td>
                </tr>
              </mj-table>
            </mj-column>
          </mj-section>
          <mj-section padding="20px">
            <mj-column>
              <mj-text>
                <blockquote>
                  "This service has transformed our business. Highly
                  recommended!"
                </blockquote>
                <p>
                  <small>— Jane Doe, CEO of Example Corp</small>
                </p>
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section padding="20px">
            <mj-column>
              <mj-text>
                <h3>Chemical Formula</h3>
                <p>
                  Water is H<sub>2</sub>O and Einstein's equation is E=mc
                  <sup>2</sup>.
                </p>
                <hr />
                <p>
                  <s>Old price: $50</s> <strong>New price: $30</strong>
                </p>
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section padding="10px">
            <mj-column>
              <mj-raw>
                {'<!--[if mso]><table><tr><td><![endif]-->'}
                <div>Outlook-specific wrapper</div>
                {'<!--[if mso]></td></tr></table><![endif]-->'}
              </mj-raw>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    );

    const result = serialize(mjmlTree);
    expect(normalizeXml(result)).toBe(normalizeXml(expected));
  });
});
