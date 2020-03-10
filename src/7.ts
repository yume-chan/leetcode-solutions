// 7. Reverse Integer

export type Solution = (x: number) => number;

type Parameters = Solution extends ((...args: infer T) => any) ? T : never;

type TupleConvert<T extends any[], TItem> = { [K in keyof T]: TItem };
type ParameterNames = TupleConvert<Parameters, string>;
const parameterNames: ParameterNames = ['x'];

type Result = ReturnType<Solution>;
type TestCase = [Parameters, Result];

const solutions: Solution[] = [
    function reverse(x: number): number {
        const sign = Math.sign(x);
        const array = (sign * x).toString().split('');
        array.reverse();
        const answer = Number.parseInt(array.join(''), 10);
        if (answer > 2 ** 31) {
            return 0;
        }
        return sign * answer;
    },
];

const cases: TestCase[] = [
    [[123], 321],
    [[-123], -321],
    [[120], 21],
    [[1534236469], 0],
];

function formatTestCaseName(testCase: TestCase): string {
    return parameterNames
        .map(
            (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
        .join(', ')
}

describe('7. Reverse Integer', () => {
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
