import { describe, expect, it } from 'vitest';
import { defaultGravity, findMetal, makeMessage, makeShareUrl } from './fatigue';

describe('fatigue helpers', () => {
  it('returns lead for the default value', () => {
    expect(findMetal(defaultGravity)).toMatchObject({ name: '鉛', symbol: 'Pb' });
  });

  it('creates the selected expression', () => {
    expect(makeMessage('鉄', 'heavy')).toBe('鉄のように身体が重い');
    expect(makeMessage('鉄', 'light')).toBe('鉄のように身体が軽い');
  });

  it('safely encodes a share URL', () => {
    const url = new URL(makeShareUrl('鉛のように身体が重い', '鉛'));
    expect(url.searchParams.get('hashtags')).toBe('金属疲労ジェネレーター,鉛');
  });
});
