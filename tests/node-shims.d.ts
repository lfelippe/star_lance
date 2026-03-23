declare module 'node:test' {
  const test: (name: string, fn: () => void | Promise<void>) => void
  export default test
}

declare module 'node:assert/strict' {
  interface AssertModule {
    equal(actual: unknown, expected: unknown, message?: string): void
    deepEqual(actual: unknown, expected: unknown, message?: string): void
  }

  const assert: AssertModule
  export default assert
}
