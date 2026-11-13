const tiers = [];

console.log(
    tiers
    .map(string => string.trim())
    .sort()
    .reduce((array, string) => {
        if(!array.includes(string)) array.push(string);
        return array;
    }, [])
    .join('\',**-**\'')
);