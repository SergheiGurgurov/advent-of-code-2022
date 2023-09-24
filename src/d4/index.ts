import { readFileSync } from 'node:fs';
const input = readFileSync('./input.txt').toString();

const pipe = (...fn: Function[]) => (data: any) => { return fn.forEach((fn) => data = fn(data)), data };
const map = (fn) => (arr: any[]) => arr.map(fn);
const count_truthy = (arr: boolean[]) => arr.reduce((acc, value) => { return value && acc + 1 || acc }, 0)

const parse = (input: string) => input.split("\n").map((assignment: string) => assignment.split(",").map((range: string) => range.split("-").map(Number)))
const isFullOverlap = ([[a1, a2], [b1, b2]]) => (a1 <= b1 && a2 >= b2) || (a1 >= b1 && a2 <= b2)
const hasAnyOverlap = ([[a1, a2], [b1, b2]]) => (a1 <= b2 && a2 >= b1)

const solvePart1 = pipe(
    parse, //each line becomes a an array of two ranges: [[a1, a2], [b1, b2]]
    map(isFullOverlap),
    count_truthy
)

const solvePart2 = pipe(
    parse,
    map(hasAnyOverlap),
    count_truthy
)

console.log("part one: ", solvePart1(input));
console.log("part two: ", solvePart2(input));