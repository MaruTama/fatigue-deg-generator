import metals from '../data/metalSpecificGravity.json';

export type Metal = {
  name: string;
  symbol: string;
  specific_gravity: number;
};

export const metalList = metals as Metal[];
export const minimumGravity = metalList[0].specific_gravity;
export const maximumGravity = metalList[metalList.length - 1].specific_gravity;
export const defaultGravity = 11.35;

export function findMetal(gravity: number): Metal {
  return metalList.find((metal) => metal.specific_gravity >= gravity) ?? metalList.at(-1)!;
}

export function fatiguePercent(gravity: number): string {
  return ((gravity / maximumGravity) * 100).toFixed(1);
}

export function makeMessage(metalName: string, feeling: 'heavy' | 'light'): string {
  return `${metalName}のように身体が${feeling === 'heavy' ? '重い' : '軽い'}`;
}

export function makeShareUrl(message: string, metalName: string): string {
  const url = new URL('https://twitter.com/intent/tweet');
  url.searchParams.set('text', `${message}\n`);
  url.searchParams.set('url', 'https://marutama.github.io/fatigue-deg-generator/');
  url.searchParams.set('hashtags', `金属疲労ジェネレーター,${metalName}`);
  return url.toString();
}
