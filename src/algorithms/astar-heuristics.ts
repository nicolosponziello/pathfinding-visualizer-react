import { Coordinate } from "../components/Node/node_data";

const euclidean = (start: Coordinate, end: Coordinate): number => {
  return Math.sqrt(Math.pow(end.r - start.r, 2) + Math.pow(end.c - start.c, 2));
};

const diagonal = (start: Coordinate, end: Coordinate): number => {
  return Math.max(Math.abs(start.r - end.r), Math.abs(start.c - end.c));
};

const manhattan = (start: Coordinate, end: Coordinate): number => {
  return Math.abs(start.r - end.r) + Math.abs(start.c - end.c);
};

export enum Euristic {
  MANHATTAN,
  EUCLIDEAN,
  DIAGONAL,
}

export const calculateHeuristic = (
  type: Euristic,
  start: Coordinate,
  end: Coordinate
): number => {
  switch (type) {
    case Euristic.DIAGONAL:
      return diagonal(start, end);
    case Euristic.EUCLIDEAN:
      return euclidean(start, end);
    case Euristic.MANHATTAN:
      return manhattan(start, end);
  }
};
