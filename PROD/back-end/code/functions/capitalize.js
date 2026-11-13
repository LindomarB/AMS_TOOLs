function capitalize(text, onlyFirstLetter = false) {
    if(!text) return text;
    
    if(onlyFirstLetter) {
        return text.slice(0, 1).toUpperCase() + text.slice(1);
    } else {
        const words = text.split(' ');
        return words.map(word => capitalize(word, true)).join(' ');
    }
}

module.exports = capitalize;