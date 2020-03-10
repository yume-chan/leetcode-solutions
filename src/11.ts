// 11. Container With Most Water

export type Solution = (heights: number[]) => number;

type Parameters = Solution extends ((...args: infer T) => any) ? T : never;

type TupleConvert<T extends any[], TItem> = { [K in keyof T]: TItem };
type ParameterNames = TupleConvert<Parameters, string>;
const parameterNames: ParameterNames = ['heights'];

type Result = ReturnType<Solution>;
type TestCase = [Parameters, Result];

const solutions: Solution[] = [
    function maxArea(heights: number[]): number {
        let max = 0;
        for (let i = 0; i < heights.length - 1; i++) {
            const height = heights[i];
            const minWidth = Math.max(1, Math.ceil(max / height));
            for (let j = i + minWidth; j < heights.length; j++) {
                max = Math.max(max, (j - i) * Math.min(height, heights[j]));
            }
        }
        return max;
    },
];

const cases: TestCase[] = [
    [[[1, 8, 6, 2, 5, 4, 8, 3, 7]], 49],
];

function formatTestCaseName(testCase: TestCase): string {
    return parameterNames
        .map(
            (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
        .join(', ')
}

describe('11. Container With Most Water', () => {
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
