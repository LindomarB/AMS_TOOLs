function wordsSplitter(string) {
    const hasComma = string.includes(',');

    return string
        .split(',')
        .map(word => hasComma? word.trim() : word.trim().split(' '))
        .flat()
        .filter(word => word);
}

export default wordsSplitter;