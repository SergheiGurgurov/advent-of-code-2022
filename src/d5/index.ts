/* 
    # Notes:
    on the line with teh number of piles,
    the number of total characters = 3*N.Piles + 1*N.Piles-1
        so: Chars = 4*N.Piles - 1
        so: N.Piles = (Chars+1)/4

    on each line with the crates (above the numbers):
    the value inside the crate at index:"X" resides at the following index of the line:
        1+4(x-1) -> 1+4x-4 -> 4x-3
*/

type CratePiles = { [key: number]: string[] }
type Instruction = [number, number, number]; //moveamount, from, to

type ParsedInput = { crates: CratePiles, instructions: Instruction[] }

import { readFileSync } from 'node:fs';
const input = readFileSync('./input.txt').toString();

const pipe = (...fn: Function[]) => (data: any) => { return fn.forEach((fn) => data = fn(data)), data };
const map = (fn) => (arr: any[]) => arr.map(fn);
const mapByKey = (fn) => (obj: any) => Object.keys(obj).map(key => fn(obj[key]))
const pop = (arr: any[]) => arr.pop()
const join = (char: string) => (arr: string[]) => arr.join(char);
const array_sum = (arr: number[]) => arr.reduce((accumulator, value) => { return accumulator + value }, 0)

const parseCrates = (input: string[]): CratePiles => {
    const out: CratePiles = {};
    const N_Piles = (input[0].length + 1) / 4;
    for (let i = 1, valueIndex = 1; i <= N_Piles; i++, valueIndex += 4) {
        out[i] = [];
        for (const row of input) {
            const value = row[valueIndex];
            if (value !== " ") {
                out[i].unshift(value)
            }
        }
    }
    return out;
}

const parseInstruction = (instruction: string) => instruction.match(/move.(.*).from.(.*).to.(.*)/).slice(1).map(Number) as Instruction
const parseInstructions = (instructions: string[]) => instructions.map(parseInstruction)

const parse = (input: string) => {
    return {
        crates: parseCrates(input.slice(0, input.indexOf("1")).trim().split('\n')),
        instructions: parseInstructions(input.slice(input.indexOf("move")).trim().split('\n'))
    }
}

const cratesByOne = (crates: CratePiles) => (ins: Instruction) => crates[ins[2]].push(...crates[ins[1]].splice(-1 * ins[0]).reverse())
const cratesByStack = (crates: CratePiles) => (ins: Instruction) => crates[ins[2]].push(...crates[ins[1]].splice(-1 * ins[0]))
const applyInstuctions = (instructionHandler: Function) => (input: ParsedInput) => { return input.instructions.forEach(instructionHandler(input.crates)), input.crates }

const solvePart1 = pipe(
    parse,
    applyInstuctions(cratesByOne),
    mapByKey(pop),
    join("")
)

const solvePart2 = pipe(
    parse,
    applyInstuctions(cratesByStack),
    mapByKey(pop),
    join("")
)

console.log("part one:", solvePart1(input))
console.log("part two:", solvePart2(input))
