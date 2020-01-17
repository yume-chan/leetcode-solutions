import { List } from 'ts-toolbelt';

import { isPalindrome } from './9';

describe('9. Palindrome Number', () => {
    type Parameters = [number];
    type Result = boolean;

    type ParameterNames = List.Repeat<string, List.Length<Parameters, 's'>>;
    type TestCase = [Parameters, Result];

    const parameters: ParameterNames = ['x'];
    const cases: TestCase[] = [
        [[121], true],
        [[-121], false],
        [[10], false],
    ];

    function formatTestCaseName(testCase: TestCase): string {
        return parameters
            .map(
                (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
            .join(', ')
    }

    for (const item of cases) {
        it(formatTestCaseName(item), () => {
            expect(isPalindrome.apply(undefined, item[0])).toBe(item[1]);
        });
    }
});
