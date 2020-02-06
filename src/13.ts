function romanToInt1(s: string): number {
    const map = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    } as Record<string, number>;

    let result = 0;
    let temp = 0;
    for (const ch of s) {
        const value = map[ch];
        if (temp !== 0 && value > temp) {
            result += (value - temp);
            temp = 0;
        } else {
            result += temp;
            temp = value;
        }
    }
    result += temp;

    return result;
}

function romanToInt2(s: string): number {
    const map = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    } as Record<string, number>;

    let result = 0;
    let last = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const value = map[s[i]];
        if (value >= last) {
            result += value;
        } else {
            result -= value;
        }
        last = value;
    }
    return result;
}

const romanToInt = romanToInt2;

export default romanToInt;
