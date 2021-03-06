// 9. Palindrome Number

export type Solution = (x: number) => boolean;

type Parameters = Solution extends ((...args: infer T) => any) ? T : never;

type TupleConvert<T extends any[], TItem> = { [K in keyof T]: TItem };
type ParameterNames = TupleConvert<Parameters, string>;
const parameterNames: ParameterNames = ['x'];

type Result = ReturnType<Solution>;
type TestCase = [Parameters, Result];

const solutions: Solution[] = [
    function isPalindrome(x: number): boolean {
        if (x < 0) {
            return false;
        }

        const copy = x;

        let reminder = x % 10;
        let reversed = reminder;
        x = (x - reminder) / 10;
        while (x > 0) {
            let reminder = x % 10;
            reversed = reversed * 10 + reminder;
            x = (x - reminder) / 10;
        }

        return reversed === copy;
    },
];

const cases: TestCase[] = [
    [[121], true],
    [[-121], false],
    [[10], false],
];

function formatTestCaseName(testCase: TestCase): string {
    return parameterNames
        .map(
            (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
        .join(', ')
}

describe('9. Palindrome Number', () => {
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
