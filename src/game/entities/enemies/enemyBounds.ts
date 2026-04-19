export function isPastLeftEdge(x: number, width: number, leftEdge = 0): boolean {
  return x + width / 2 < leftEdge
}
