function maxArea(heights: number[]): number {
    let max = 0;
    for (let i = 0; i < heights.length - 1; i++) {
        const height = heights[i];
        const minWidth = Math.max(1, Math.ceil(max / height));
        for (let j = i + minWidth; j < heights.length; j++) {
            max = Math.max(max, (j - i) * Math.min(height, heights[j]));
        }
    }
    return max;
}

export default maxArea;
