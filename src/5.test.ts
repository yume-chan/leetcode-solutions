import { List } from 'ts-toolbelt';

import { longestPalindrome } from "./5";

describe('5. Longest Palindromic Substring', () => {
    type Parameters = [string];
    type Result = string;

    type ParameterNames = List.Repeat<string, List.Length<Parameters, 's'>>;
    type TestCase = [Parameters, Result];

    const parameters: ParameterNames = ['s'];
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
        return parameters
            .map(
                (name, index) => `${name} = ${JSON.stringify(testCase[0][index])}`)
            .join(', ')
    }

    for (const item of cases) {
        it(formatTestCaseName(item), () => {
            expect(longestPalindrome.apply(undefined, item[0])).toBe(item[1]);
        });
    }
});
