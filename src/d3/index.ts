/* 
    ## Description;

    we have N rucksacks
    each rucksack has 2 compartments

    each string in the list represents 1 rucksack,
    the charactes inside the string represent the items

    exactly 1 item il placed incorrectly
    and is contained in both compartments
    (it occurring twice in the string doesn't
     mean it's contained in both compartments)
    
    each item (character) has an associated number (priority)

    [a-z,A-Z]=>[1-26,27-52] ascii -> [97-122,65-90]

    ## Goal

    for each racksack find the misplaced item,
    then sum up the priorities of all items.

    ## Part 2:
    the elves (and so the racksacks) are organized in groups of 3
    every group has a "badge" that identifies it,
    which is an item that is contained in all 3 racksack of the group

    we need to find the badge for each group of 3 and then sum them all up together
*/

import { readFileSync } from 'node:fs';
const input = readFileSync('./input.txt').toString();

const pipe = (...fn: Function[]) => (data: any) => { return fn.forEach((fn) => data = fn(data)), data };
const map = (fn) => (arr: any[]) => arr.map(fn);
const array_sum = (arr: number[]) => arr.reduce((accumulator, value) => { return accumulator + value }, 0)

const splitIntoChunks = (chunkSize: number) => (arr: any[]) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}

const getCharacterValue = (asciiCode: number) => asciiCode > 96 ? asciiCode - 96 : asciiCode - 38;
const toAscii = (char: string) => char.charCodeAt(0);

const splitInTwo = (arr: any[] | string) => { return [arr.slice(0, Math.floor(arr.length / 2)), arr.slice(Math.floor(arr.length / 2))] }
const parse = (input: string) => input.split("\n")
const findMisplaced = ([a1, a2]: [string, string]) => {
    for (const left of a1)
        for (const right of a2)
            if (left == right)
                return right
}

const getCommonCharacter = (arr: string[]) => {
    const otherStrings = arr.slice(1);
    for (const char of arr[0]) {
        let counter = otherStrings.length;
        stringLoop: for (const otherString of otherStrings) {
            for (const otherChar of otherString) {
                if (char == otherChar) {
                    counter--;
                    if (!counter) return char;
                    continue stringLoop;
                }
            }
        }
    }
}

const solveProblem1 = pipe(
    parse,
    map(splitInTwo),
    map(findMisplaced),
    map(toAscii),
    map(getCharacterValue),
    array_sum
)

const solveProblem2 = pipe(
    parse,
    splitIntoChunks(3),
    map(getCommonCharacter),
    map(toAscii),
    map(getCharacterValue),
    array_sum
)

console.log("part one:", solveProblem1(input))
console.log("part two:", solveProblem2(input))