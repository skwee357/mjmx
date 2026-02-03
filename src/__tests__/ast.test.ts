import { describe, expect, it } from 'vitest';
import { createNode, Fragment, isMjmlNode, MJML_NODE_TYPE } from '../ast';

describe('isMjmlNode', () => {
  it('should return true for valid MjmlNode', () => {
    const node = createNode('mj-text', {}, []);
    expect(isMjmlNode(node)).toBe(true);
  });

  it('should return false for null', () => {
    expect(isMjmlNode(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isMjmlNode(undefined)).toBe(false);
  });

  it('should return false for primitives', () => {
    expect(isMjmlNode('string')).toBe(false);
    expect(isMjmlNode(123)).toBe(false);
    expect(isMjmlNode(true)).toBe(false);
  });

  it('should return false for objects without $$typeof', () => {
    expect(isMjmlNode({ tag: 'mj-text' })).toBe(false);
  });

  it('should return false for objects with wrong $$typeof', () => {
    expect(isMjmlNode({ $$typeof: Symbol('other') })).toBe(false);
  });
});

describe('createNode', () => {
  it('should create a node with tag and empty attributes/children', () => {
    const node = createNode('mj-text', {}, []);
    expect(node.$$typeof).toBe(MJML_NODE_TYPE);
    expect(node.tag).toBe('mj-text');
    expect(node.attributes).toEqual({});
    expect(node.children).toEqual([]);
  });

  it('should convert attributes to strings', () => {
    const node = createNode('mj-text', { 'font-size': '16px', count: 42 }, []);
    expect(node.attributes).toEqual({ 'font-size': '16px', count: '42' });
  });

  it('should skip null and undefined attributes', () => {
    const node = createNode(
      'mj-text',
      { color: 'red', size: null, weight: undefined },
      []
    );
    expect(node.attributes).toEqual({ color: 'red' });
  });

  it('should convert URL attributes to strings', () => {
    const url = new URL('https://example.com/image.png');
    const node = createNode('mj-image', { src: url }, []);
    expect(node.attributes).toEqual({ src: 'https://example.com/image.png' });
  });

  it('should create a fragment node', () => {
    const node = createNode(Fragment, {}, ['child1', 'child2']);
    expect(node.tag).toBe(Fragment);
    expect(node.children).toEqual(['child1', 'child2']);
  });
});
