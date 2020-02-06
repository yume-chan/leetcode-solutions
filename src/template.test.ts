import { List } from 'ts-toolbelt';

import resolution from './template';

describe('#. Question Title', () => {
    type Parameters = typeof resolution extends ((...args: infer T) => any) ? T : never;
    type Result = ReturnType<typeof resolution>;

    type ParameterNames = List.Repeat<string, List.Length<Parameters, 's'>>;
    type TestCase = [Parameters, Result];

    const parameters: ParameterNames = [];
    const cases: TestCase[] = [
        [[], ''],
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