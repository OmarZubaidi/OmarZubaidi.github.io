import { describe, expect, it } from 'vitest';
import dummy from './dummy';

describe(dummy, () => {
  it('should return true', () => {
    expect.hasAssertions();

    expect(dummy()).toBe(true);
  });
});
