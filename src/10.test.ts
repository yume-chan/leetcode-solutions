import { List } from 'ts-toolbelt';

import { isMatch } from './10';

describe('10. Regular Expression Matching', () => {
    type Parameters = [string, string];
    type Result = boolean;

    type ParameterNames = List.Repeat<string, List.Length<Parameters, 's'>>;
    type TestCase = [Parameters, Result];

    const parameters: ParameterNames = ['s', 'p'];
    const cases: TestCase[] = [
        [['aa', 'a'], false],
        [['aa', 'a*'], true],
        [['ab', '.*'], true],
        [['aab', 'c*a*b'], true],
        [['mississippi', 'mis*is*p*.'], false],
        [['ab', '.*c'], false],
        [['aaa', 'a*a'], true],
        [['aaaaaaaaaaaaab', 'a*a*a*a*a*a*a*a*a*a*a*a*b'], true],
    ];

    function formatTestCaseName(testCase: TestCase): string {
        return parameters
            .map(
                (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
            .join(', ')
    }

    for (const item of cases) {
        it(formatTestCaseName(item), () => {
            expect(isMatch.apply(undefined, item[0])).toBe(item[1]);
        });
    }
});
