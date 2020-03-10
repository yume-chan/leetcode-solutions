// 6. ZigZag Conversion

export type Solution = (s: string, numRows: number) => string;

type Parameters = Solution extends ((...args: infer T) => any) ? T : never;

type TupleConvert<T extends any[], TItem> = { [K in keyof T]: TItem };
type ParameterNames = TupleConvert<Parameters, string>;
const parameterNames: ParameterNames = ['s', 'numRows'];

type Result = ReturnType<Solution>;
type TestCase = [Parameters, Result];

/*

k=3
1   5   9     = 2n(k - 1) + 1
2 4 6 8 10    = 2n
3   7   11

k=4
1     7        13    = 2n(k - 1) + 1
2   6 8     12 14    = { 2n(k - 1) + 2 (n % 2 = 1), 2n(k - 1) + 0 (n % 2 = 0) }
3 5   9  11    15    = { 2n(k - 1) + 3 (n % 2 = 1), 2n(k - 1) + -1 (n % 2 = 0) }
4     10       16    = { 2n(k - 1) + 4}

k=5
1       9           17    = 2n(k - 1) + 1
2     8 10       16 18    = { 8n - 6 (n % 2 = 1), 8n (n % 2 = 0) }
3   7   11    15    19
4 6     12 14       20
5       13          21

*/

const solutions: Solution[] = [
    function convert(s: string, numRows: number): string {
        if (numRows === 1) {
            return s;
        }

        let answer = '';

        const step = 2 * (numRows - 1);

        let i = 0;
        while (i < s.length) {
            answer += s[i];
            i += step;
        }

        for (let j = 1; j < numRows - 1; j++) {
            i = j;
            while (true) {
                if (i < s.length) {
                    answer += s[i];
                    i += step - 2 * j;
                } else {
                    break;
                }

                if (i < s.length) {
                    answer += s[i];
                    i += 2 * j;
                } else {
                    break;
                }
            }
        }

        i = numRows - 1;
        while (i < s.length) {
            answer += s[i];
            i += step;
        }

        return answer;
    },
];

const cases: TestCase[] = [
    [['A', 1], 'A'],
    [['PAYPALISHIRING', 3], 'PAHNAPLSIIGYIR'],
    [['PAYPALISHIRING', 4], 'PINALSIGYAHRPI'],
];

function formatTestCaseName(testCase: TestCase): string {
    return parameterNames
        .map(
            (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
        .join(', ')
}

describe('6. ZigZag Conversion', () => {
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
