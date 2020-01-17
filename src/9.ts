// 9. Palindrome Number

export function isPalindrome(x: number): boolean {
    if (x < 0) {
        return false;
    }

    const copy = x;

    let reminder = x % 10;
    let reversed = reminder;
    x = (x - reminder) / 10;
    while (x > 0) {
        let reminder = x % 10;
        reversed = reversed * 10 + reminder;
        x = (x - reminder) / 10;
    }

    return reversed === copy;
}
