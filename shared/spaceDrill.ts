import type { SpaceNode } from './types';

/** True when tapping this bubble should open it in Space Map (load children if needed). */
export function canDrill(node: SpaceNode): boolean {
  if (node.kind === 'folder') return true;
  if (node.children?.length) return true;
  return node.name === 'System & apps';
}
