import readingTime from "reading-time";

const cache = new WeakMap<object, { text: string; words: number }>();

function compute(body: string): { text: string; words: number } {
  const stripped = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]+>/g, "");
  const rt = readingTime(stripped);
  return { text: rt.text, words: rt.words };
}

function getEntry(body: string | undefined, key?: object) {
  if (!body) return { text: "1 min read", words: 0 };
  if (key) {
    const cached = cache.get(key);
    if (cached) return cached;
    const value = compute(body);
    cache.set(key, value);
    return value;
  }
  return compute(body);
}

export function getReadingTime(body: string | undefined, key?: object): string {
  return getEntry(body, key).text;
}

export function getWordCount(body: string | undefined, key?: object): number {
  return getEntry(body, key).words;
}
