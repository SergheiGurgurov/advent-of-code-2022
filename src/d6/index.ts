/* 
    # Analysis:
    we have a malfunctioning handheld communication device

    To be able to communicate with the Elves, the device needs to lock on to their signal
    The signal is a series of seemingly-random characters that the device receives one at a time
    the start-of-packet marker is indicated by a sequence of four characters that are all different

    the goal is to find the index of the first character after the packet marker

*/


import { readFileSync } from 'node:fs';
const input = readFileSync('./input.txt').toString();

const unique = <T extends Iterable<any> & ArrayLike<any>>(arr: T) => new Set(arr).size == arr.length

const findIndexAfterMarker = (markerLength: number) => (input: string) => {
    for (let i = markerLength - 1; i < input.length; i++) {
        if (unique(input.slice(i + 1 - markerLength, i + 1))) {
            return i + 1;
        }
    }
}

const solvePart1 = findIndexAfterMarker(4)
const solvePart2 = findIndexAfterMarker(14)

console.log("part one:", solvePart1(input))
console.log("part two:", solvePart2(input))
