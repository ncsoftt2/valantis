export const findMaxPrice = (numbers: number[]) => {
    if(!numbers.length) return
    return numbers.reduce((max, current) => {
        return max >= current ? max : current
    });
}