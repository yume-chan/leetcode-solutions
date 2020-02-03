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
};

export default longestPalindrome;