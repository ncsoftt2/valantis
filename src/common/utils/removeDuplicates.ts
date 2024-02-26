export function removeDuplicatesAndSort(array: number[]) {
    const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);
    return uniqueArray.sort((a, b) => a - b);
}