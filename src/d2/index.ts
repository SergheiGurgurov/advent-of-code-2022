/* 
## input format:
A Y -> {A = 🪨;} {X = 🪨;}
B X -> {B = 📰;} {Y = 📰;}
C Z -> {C = ✂️;} {Z = ✂️;}

## points:
points for shape   {🪨 = 1;📰 = 2;✂️ = 3} +
points for outcome {Loss = 0; Draw = 3; Victory = 6}


## goal
how many point would i get following the instructions?

## part 2 -> the input format is switched:
A Y -> {A = 🪨;} {X = Lose;}
B X -> {B = 📰;} {Y = Draw;}
C Z -> {C = ✂️;} {Z = Win;}

*/
import { readFileSync } from 'node:fs';

const POINTMAP = {
    "A X": 3 + 1,
    "B X": 0 + 1,
    "C X": 6 + 1,
    "A Y": 6 + 2,
    "B Y": 3 + 2,
    "C Y": 0 + 2,
    "A Z": 0 + 3,
    "B Z": 6 + 3,
    "C Z": 3 + 3,
}

const POINTMAP_2 = {
    "A X": 0 + 3,
    "A Y": 3 + 1,
    "A Z": 6 + 2,
    "B X": 0 + 1,
    "B Y": 3 + 2,
    "B Z": 6 + 3,
    "C X": 0 + 2,
    "C Y": 3 + 3,
    "C Z": 6 + 1,
}

const input = readFileSync('./input.txt').toString();

const pipe = (...fn: Function[]) => (data: any) => { return fn.forEach((fn) => data = fn(data)), data };
const array_sum = (arr: number[]) => arr.reduce((accumulator, value) => { return accumulator + value }, 0)
const parse = (input: string) => input.trim().split('\n')
const pointMapper = (pointMap: Record<string, number>) => (matchString: string) => pointMap[matchString];
const map = (fn) => (arr: any[]) => arr.map(fn);

const calculate_points = (pointMap: Record<string, number>) => pipe(
    parse,
    map(pointMapper(pointMap)),
    array_sum,
)

console.log(calculate_points(POINTMAP)(input))
console.log(calculate_points(POINTMAP_2)(input))