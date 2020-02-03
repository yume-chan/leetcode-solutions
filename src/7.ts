// 7. Reverse Integer

function reverse(x: number): number {
    const sign = Math.sign(x);
    const array = (sign * x).toString().split('');
    array.reverse();
    const answer = Number.parseInt(array.join(''), 10);
    if (answer > 2 ** 31) {
        return 0;
    }
    return sign * answer;
}

export default reverse;