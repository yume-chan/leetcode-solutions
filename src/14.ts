// 14. Longest Common Prefix

export type Solution = (strs: string[]) => string;

type Parameters = Solution extends ((...args: infer T) => any) ? T : never;

type TupleConvert<T extends any[], TItem> = { [K in keyof T]: TItem };
type ParameterNames = TupleConvert<Parameters, string>;
const parameterNames: ParameterNames = ['strs'];

type Result = ReturnType<Solution>;
type TestCase = [Parameters, Result];

const solutions: Solution[] = [
    function longestCommonPrefix(strs: string[]): string {
        // vertical search
        if (strs.length === 0) {
            return '';
        }

        const maxLength = Math.min.apply(undefined, strs.map(item => item.length));
        for (let i = 0; i < maxLength; i++) {
            let ch = strs[0][i];
            for (let j = 1; j < strs.length; j++) {
                if (ch !== strs[j][i]) {
                    return strs[0].substring(0, i);
                }
            }
        }

        return strs[0].substring(0, maxLength);
    },
    function longestCommonPrefix(strs: string[]): string {
        // binary search

        function haveSameSubstring(strs: string[], start: number, end: number): boolean {
            for (let i = start; i <= end; i++) {
                const ch = strs[0][i];
                for (let j = 1; j < strs.length; j++) {
                    if (strs[j][i] !== ch) {
                        return false;
                    }
                }
            }
            return true;
        }

        if (strs.length === 0) {
            return '';
        }

        /*
            0 1 2 3 4
            a b b
            a b c
            length = 3

            l = 0
            r = length - 1 = 2

            middle = floor((0 + 2) / 2) = 1
            substr = str[0, 1 + 1] = 'ab'

            is common? true

            l = middle + 1 = 2
            r = 2

            middle = floor((2 + 2) / 2) = 2
            substr = str[2, 2 + 1] = 'b'

            is common? false

            result = str[0, l] = 'ab'
        */

        let low = 0;
        let high = Math.min.apply(undefined, strs.map(item => item.length)) - 1;

        while (low <= high) {
            let middle = Math.floor((low + high) / 2);
            if (haveSameSubstring(strs, low, middle)) {
                low = middle + 1;
            } else {
                high = middle - 1;
            }
        }

        return strs[0].substring(0, low);
    },
];

const cases: TestCase[] = [
    [[['flower', 'flow', 'flight']], 'fl'],
    [[['dog', 'racecar', 'car']], ''],
    [[[]], ''],
    [[['a']], 'a'],
    [[['abb', 'abc']], 'ab'],
];

function formatTestCaseName(testCase: TestCase): string {
    return parameterNames
        .map(
            (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
        .join(', ')
}

describe('14. Longest Common Prefix', () => {
    for (let i = 0; i < solutions.length; i++) {
        describe(`solution ${i + 1}`, () => {
            for (const item of cases) {
                it(formatTestCaseName(item), () => {
                    expect(solutions[i].apply(undefined, item[0])).toBe(item[1]);
                });
            }
        });
    }
});

export default solutions;
