export function isPastRightEdge(x: number, width: number, rightEdge: number): boolean {
  return x - width / 2 > rightEdge
}
