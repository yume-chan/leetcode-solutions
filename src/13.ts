// 13. Roman To Integer

export type Solution = (s: string) => number;

type Parameters = Solution extends ((...args: infer T) => any) ? T : never;

type TupleConvert<T extends any[], TItem> = { [K in keyof T]: TItem };
type ParameterNames = TupleConvert<Parameters, string>;
const parameterNames: ParameterNames = ['s'];

type Result = ReturnType<Solution>;
type TestCase = [Parameters, Result];

const solutions: Solution[] = [
    function romanToInt(s: string): number {
        const map = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000,
        } as Record<string, number>;

        let result = 0;
        let temp = 0;
        for (const ch of s) {
            const value = map[ch];
            if (temp !== 0 && value > temp) {
                result += (value - temp);
                temp = 0;
            } else {
                result += temp;
                temp = value;
            }
        }
        result += temp;

        return result;
    },
    function romanToInt(s: string): number {
        const map = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000,
        } as Record<string, number>;

        let result = 0;
        let last = 0;
        for (let i = s.length - 1; i >= 0; i--) {
            const value = map[s[i]];
            if (value >= last) {
                result += value;
            } else {
                result -= value;
            }
            last = value;
        }
        return result;
    }
];

const cases: TestCase[] = [
    [['III'], 3],
    [['IV'], 4],
    [['V'], 5],
    [['IX'], 9],
    [['X'], 10],
    [['LVIII'], 58],
    [['MCMXCIV'], 1994],
];

function formatTestCaseName(testCase: TestCase): string {
    return parameterNames
        .map(
            (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
        .join(', ')
}

describe('13. Roman To Integer', () => {
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
