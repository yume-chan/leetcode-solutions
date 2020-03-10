// 12. Integer to Roman

export type Solution = (num: number) => string;

type Parameters = Solution extends ((...args: infer T) => any) ? T : never;

type TupleConvert<T extends any[], TItem> = { [K in keyof T]: TItem };
type ParameterNames = TupleConvert<Parameters, string>;
const parameterNames: ParameterNames = ['num'];

type Result = ReturnType<Solution>;
type TestCase = [Parameters, Result];

const solutions: Solution[] = [
    function intToRoman(num: number): string {
        let result = '';

        while (num >= 1000) {
            result += 'M';
            num -= 1000;
        }

        if (num >= 900) {
            result += 'CM';
            num -= 900;
        } else if (num >= 500) {
            result += 'D';
            num -= 500;
        } else if (num >= 400) {
            result += 'CD';
            num -= 400;
        }

        while (num >= 100) {
            result += 'C';
            num -= 100;
        }

        if (num >= 90) {
            result += 'XC';
            num -= 90;
        } else if (num >= 50) {
            result += 'L';
            num -= 50;
        } else if (num >= 40) {
            result += 'XL';
            num -= 40;
        }

        while (num >= 10) {
            result += 'X';
            num -= 10;
        }

        if (num === 9) {
            result += 'IX';
            return result;
        } else if (num >= 5) {
            result += 'V';
            num -= 5;
        } else if (num === 4) {
            result += 'IV';
            return result;
        }

        if (num > 0) {
            result += 'I'.repeat(num);
        }

        return result;
    },
];

const cases: TestCase[] = [
    [[3], 'III'],
    [[4], 'IV'],
    [[5], 'V'],
    [[9], 'IX'],
    [[10], 'X'],
    [[58], 'LVIII'],
    [[1994], 'MCMXCIV'],
];

function formatTestCaseName(testCase: TestCase): string {
    return parameterNames
        .map(
            (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
        .join(', ')
}

describe('12. Integer to Roman', () => {
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
