export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const gridDirections = [
  { r: +1, c: 0 }, //bottom
  { r: -1, c: 0 }, //top
  { r: 0, c: -1 }, //left
  { r: 0, c: +1 }, //right
];