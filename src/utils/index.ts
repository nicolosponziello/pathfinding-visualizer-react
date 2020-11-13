export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomEnum<T>(en: T): T[keyof T] {
  let values = (Object.keys(en)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  let randomIndex = randomInteger(0, values.length);
  return values[randomIndex];
}

export const gridDirections = [
  { r: +1, c: 0 }, //bottom
  { r: -1, c: 0 }, //top
  { r: 0, c: -1 }, //left
  { r: 0, c: +1 }, //right
];