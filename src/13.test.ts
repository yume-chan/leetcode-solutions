import { List } from 'ts-toolbelt';

import resolution from './13';

describe('13. Roman to Integer', () => {
    type Parameters = typeof resolution extends ((...args: infer T) => any) ? T : never;
    type Result = ReturnType<typeof resolution>;

    type ParameterNames = List.Repeat<string, List.Length<Parameters, 's'>>;
    type TestCase = [Parameters, Result];

    const parameters: ParameterNames = ['s'];
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
        return parameters
            .map(
                (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
            .join(', ');
    }

    for (const item of cases) {
        it(formatTestCaseName(item), () => {
            expect(resolution.apply(undefined, item[0])).toBe(item[1]);
        });
    }
});
