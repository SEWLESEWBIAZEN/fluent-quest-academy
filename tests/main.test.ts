
import { it, expect, describe, test } from 'vitest'

describe('Main', () => {
  it('should work', () => {
    expect(true).toBe(true)
  })
})

describe('group', () => {
  test('should work', () => {
    expect(1).toBeTruthy()
  })
})