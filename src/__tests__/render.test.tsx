import { describe, expect, it } from 'vitest';
import { render } from '../render';

describe('render', () => {
  it('should render a string directly', () => {
    const result = render('<mjml><mj-body></mj-body></mjml>');
    expect(result.html).toContain('<!doctype html>');
    expect(result.errors).toEqual([]);
  });

  it('should render a JSX node', () => {
    const result = render(
      <mjml>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-text>Hello</mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    );
    expect(result.html).toContain('Hello');
    expect(result.errors).toEqual([]);
  });

  it('should pass options to mjml2html', () => {
    const result = render(
      <mjml>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-text>Test</mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>,
      { validationLevel: 'skip' }
    );
    expect(result.html).toContain('<!doctype html>');
  });

  it('should return errors for invalid MJML', () => {
    const result = render(
      <mjml>
        <mj-body>
          <mj-text>Invalid: mj-text directly in mj-body</mj-text>
        </mj-body>
      </mjml>,
      { validationLevel: 'soft' }
    );
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
