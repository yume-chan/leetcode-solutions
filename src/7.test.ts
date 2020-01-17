import { List } from 'ts-toolbelt';

import { reverse } from './7';

describe('7. Reverse Integer', () => {
    type Parameters = [number];
    type Result = number;

    type ParameterNames = List.Repeat<string, List.Length<Parameters, 's'>>;
    type TestCase = [Parameters, Result];

    const parameters: ParameterNames = ['x'];
    const cases: TestCase[] = [
        [[123], 321],
        [[-123], -321],
        [[120], 21],
        [[1534236469], 0],
    ];

    function formatTestCaseName(testCase: TestCase): string {
        return parameters
            .map(
                (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
            .join(', ')
    }

    for (const item of cases) {
        it(formatTestCaseName(item), () => {
            expect(reverse.apply(undefined, item[0])).toBe(item[1]);
        })
    };
});
