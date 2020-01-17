import { List } from 'ts-toolbelt';

import { convert } from './6';

describe('6. ZigZag Conversion', () => {
    type Parameters = [string, number];
    type Result = string;

    type ParameterNames = List.Repeat<string, List.Length<Parameters, 's'>>;
    type TestCase = [Parameters, Result];

    const parameters: ParameterNames = ['s', 'numRows'];
    const cases: TestCase[] = [
        [['A', 1], 'A'],
        [['PAYPALISHIRING', 3], 'PAHNAPLSIIGYIR'],
        [['PAYPALISHIRING', 4], 'PINALSIGYAHRPI'],
    ];

    function formatTestCaseName(testCase: TestCase): string {
        return parameters
            .map(
                (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
            .join(', ')
    }

    for (const item of cases) {
        it(formatTestCaseName(item), () => {
            expect(convert.apply(undefined, item[0])).toBe(item[1]);
        });
    }
});
