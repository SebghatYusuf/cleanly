import assert from 'node:assert/strict';
import { test } from 'node:test';
import { canDrill } from '../../shared/spaceDrill.ts';
import type { SpaceNode } from '../../shared/types.ts';

const n = (patch: Partial<SpaceNode> & Pick<SpaceNode, 'name' | 'kind'>): SpaceNode => ({
  path: '/',
  size: 1,
  icon: 'folder',
  reclaimable: 0,
  ...patch,
});

test('System & apps opens', () => {
  assert.equal(canDrill(n({ name: 'System & apps', kind: 'other', icon: 'chip' })), true);
});

test('a file does not open', () => {
  assert.equal(canDrill(n({ name: 'a.iso', kind: 'file', icon: 'file' })), false);
});

test('N more items does not open', () => {
  assert.equal(canDrill(n({ name: '12 more items', kind: 'other', icon: 'more' })), false);
});

test('System & hidden does not open', () => {
  assert.equal(canDrill(n({ name: 'System & hidden', kind: 'other', icon: 'chip' })), false);
});

test('Hidden & reserved does not open', () => {
  assert.equal(canDrill(n({ name: 'Hidden & reserved', kind: 'other', icon: 'chip' })), false);
});

test('a folder without children opens', () => {
  assert.equal(canDrill(n({ name: '.gradle', kind: 'folder' })), true);
});
