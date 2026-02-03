import { describe, expect, it } from 'vitest';
import { isMjmlNode, type MjmlChild } from '../ast';
import { Fragment, jsx, jsxs } from '../jsx-runtime';
import { serialize } from '../serialize';

describe('jsx', () => {
  it('should create an element with no children', () => {
    const node = jsx('mj-divider', {});
    expect(isMjmlNode(node)).toBe(true);
    expect(node.tag).toBe('mj-divider');
    expect(node.children).toEqual([]);
  });

  it('should create an element with a single child', () => {
    const node = jsx('mj-text', { children: 'Hello' });
    expect(node.tag).toBe('mj-text');
    expect(node.children).toEqual(['Hello']);
  });

  it('should create an element with multiple children', () => {
    const node = jsx('mj-text', { children: ['Hello', ' ', 'World'] });
    expect(node.children).toEqual(['Hello', ' ', 'World']);
  });

  it('should handle attributes', () => {
    const node = jsx('mj-text', { 'font-size': '16px', color: '#333' });
    expect(node.attributes).toEqual({ 'font-size': '16px', color: '#333' });
  });

  it('should separate children from attributes', () => {
    const node = jsx('mj-text', {
      'font-size': '16px',
      children: 'Content',
    });
    expect(node.attributes).toEqual({ 'font-size': '16px' });
    expect(node.children).toEqual(['Content']);
  });

  it('should handle function components', () => {
    const MyComponent = ({ name }: { name: string }) =>
      jsx('mj-text', { children: `Hello ${name}` });

    const node = jsx(MyComponent, { name: 'World' });
    expect(node.tag).toBe('mj-text');
    expect(node.children).toEqual(['Hello World']);
  });

  it('should handle Fragment', () => {
    const node = jsx(Fragment, { children: ['child1', 'child2'] });
    expect(node.tag).toBe(Fragment);
    expect(node.children).toEqual(['child1', 'child2']);
  });
});

describe('jsxs', () => {
  it('should be the same as jsx', () => {
    expect(jsxs).toBe(jsx);
  });
});

describe('JSX integration', () => {
  it('should work with JSX syntax for simple elements', () => {
    const node = <mj-text font-size="16px">Hello</mj-text>;
    expect(serialize(node)).toBe('<mj-text font-size="16px">Hello</mj-text>');
  });

  it('should work with nested elements', () => {
    const node = (
      <mj-section>
        <mj-column>
          <mj-text>Nested</mj-text>
        </mj-column>
      </mj-section>
    );
    expect(serialize(node)).toBe(
      '<mj-section><mj-column><mj-text>Nested</mj-text></mj-column></mj-section>'
    );
  });

  it('should work with fragments', () => {
    const node = (
      <>
        <mj-text>First</mj-text>
        <mj-text>Second</mj-text>
      </>
    );
    expect(serialize(node)).toBe(
      '<mj-text>First</mj-text><mj-text>Second</mj-text>'
    );
  });

  it('should work with component functions', () => {
    const Greeting = ({ name }: { name: string }) => (
      <mj-text>Hello {name}!</mj-text>
    );

    const node = <Greeting name="World" />;
    expect(serialize(node)).toBe('<mj-text>Hello World!</mj-text>');
  });

  it('should work with conditional rendering', () => {
    const show = true;
    const node = <mj-section>{show && <mj-text>Visible</mj-text>}</mj-section>;
    expect(serialize(node)).toBe(
      '<mj-section><mj-text>Visible</mj-text></mj-section>'
    );
  });

  it('should work with array mapping', () => {
    const items = ['A', 'B', 'C'];
    const node = (
      <mj-section>
        {items.map((item) => (
          <mj-text>{item}</mj-text>
        ))}
      </mj-section>
    );
    expect(serialize(node)).toBe(
      '<mj-section><mj-text>A</mj-text><mj-text>B</mj-text><mj-text>C</mj-text></mj-section>'
    );
  });

  it('should handle number children', () => {
    const node = <mj-text>{42}</mj-text>;
    expect(serialize(node)).toBe('<mj-text>42</mj-text>');
  });

  it('should skip null and undefined children', () => {
    const node = (
      <mj-text>
        {null}
        Hello
        {undefined}
      </mj-text>
    );
    expect(serialize(node)).toBe('<mj-text>Hello</mj-text>');
  });

  it('should skip boolean children', () => {
    const node = (
      <mj-text>
        {true}
        Hello
        {false}
      </mj-text>
    );
    expect(serialize(node)).toBe('<mj-text>Hello</mj-text>');
  });

  it('should work with nested components', () => {
    const Inner = () => <mj-text>Inner</mj-text>;
    const Outer = () => (
      <mj-column>
        <Inner />
      </mj-column>
    );
    const node = <Outer />;
    expect(serialize(node)).toBe(
      '<mj-column><mj-text>Inner</mj-text></mj-column>'
    );
  });

  it('should pass children to components', () => {
    const Wrapper = ({ children }: { children?: MjmlChild }) => (
      <mj-section>{children}</mj-section>
    );
    const node = (
      <Wrapper>
        <mj-text>Wrapped</mj-text>
      </Wrapper>
    );
    expect(serialize(node)).toBe(
      '<mj-section><mj-text>Wrapped</mj-text></mj-section>'
    );
  });
});
