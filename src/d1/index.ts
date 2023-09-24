import { readFileSync } from "node:fs";

const input = readFileSync('./input.txt', 'utf-8')

//pipe function for clear reading
const pipe = (...fn: Function[]) => (data: any) => { return fn.forEach((fn) => data = fn(data)), data };

const parse = (text: string) => text.trim().split("\n\n").map(elem => elem.split("\n").map(Number))
const array_sum = (arr: number[]) => arr.reduce((accumulator, value) => { return accumulator + value }, 0)
const flatten = (data: number[][]) => data.map(array_sum)
const max = (arr: number[]) => Math.max(...arr);
const top = (podiumSize: number) => (arr: number[]) => arr.sort((a, b) => b - a).slice(0, podiumSize)

const richest_elf = pipe(parse, flatten, max)
const richest_3_sum = pipe(parse, flatten, top(3),array_sum)



console.log("richest_elf", richest_elf(input))
console.log("richest_3_sum", richest_3_sum(input))