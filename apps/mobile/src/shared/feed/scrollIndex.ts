export function clampScrollIndex(index: number, itemCount: number): number {
  if (itemCount <= 0) {
    return 0;
  }

  if (!Number.isFinite(index) || index < 0) {
    return 0;
  }

  return Math.min(Math.floor(index), itemCount - 1);
}
