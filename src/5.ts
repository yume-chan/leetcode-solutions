// 5. Longest Palindromic Substring

export type Solution = (s: string) => string;

type Parameters = Solution extends ((...args: infer T) => any) ? T : never;

type TupleConvert<T extends any[], TItem> = { [K in keyof T]: TItem };
type ParameterNames = TupleConvert<Parameters, string>;
const parameterNames: ParameterNames = ['s'];

type Result = ReturnType<Solution>;
type TestCase = [Parameters, Result];

const solutions: Solution[] = [
    function longestPalindrome(s: string): string {
        if (!s) { return ''; }
        if (s.length === 1) { return s; }

        let starts: number[] = [];

        let start = 0;
        let end = 1;
        let length = 1;

        for (let i = 1; i < s.length; i++) {
            const ch = s[i];

            const temp: number[] = [];
            for (const item of starts) {
                if (ch === s[item]) {
                    temp.push(item - 1);

                    const l = i - item + 1;
                    /* istanbul ignore else*/
                    if (l > length) {
                        start = item;
                        end = i + 1;
                        length = l;
                    }
                }
            }
            starts = temp;

            if (ch === s[i - 1]) {
                starts.push(i - 2);
                if (length < 2) {
                    start = i - 1;
                    end = i + 1;
                    length = 2;
                }
            }

            if (i > 1 && ch === s[i - 2]) {
                starts.push(i - 3);
                if (length < 3) {
                    start = i - 2;
                    end = i + 1;
                    length = 3;
                }
            }
        }

        return s.substring(start, end);
    },
];

const cases: TestCase[] = [
    [[''], ''],
    [['a'], 'a'],
    [['ab'], 'a'],
    [['abb'], 'bb'],
    [['ccc'], 'ccc'],
    [['abbc'], 'bb'],
    [['abcba'], 'abcba'],
    [['babad'], 'bab'],
    [['bbabcbaccc'], 'abcba'],
];

function formatTestCaseName(testCase: TestCase): string {
    return parameterNames
        .map(
            (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
        .join(', ')
}

describe('5. Longest Palindromic Substring', () => {
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
