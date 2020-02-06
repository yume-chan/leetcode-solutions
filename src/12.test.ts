import { List } from 'ts-toolbelt';

import resolution from './12';

describe('12. Integer to Roman', () => {
    type Parameters = typeof resolution extends ((...args: infer T) => any) ? T : never;
    type Result = ReturnType<typeof resolution>;

    type ParameterNames = List.Repeat<string, List.Length<Parameters, 's'>>;
    type TestCase = [Parameters, Result];

    const parameters: ParameterNames = ['num'];
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
