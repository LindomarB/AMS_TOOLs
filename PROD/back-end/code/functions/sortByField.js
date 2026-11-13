function sortByField(array, field, order = 1) {
    const getValue = (obj) => {
        let value = obj;

        for(let key of field) {
            value = value[key];
        }

        return value;
    }

    if(typeof field === 'string') {
        field = [field];
    }

    array.sort((next, current) => {
        let nextValue = getValue(next);
        let currentValue = getValue(current);

        if(typeof nextValue === 'string') {
            nextValue = nextValue.toLowerCase();
        }

        if(typeof currentValue === 'string') {
            currentValue = currentValue.toLowerCase();
        }

        if(nextValue > currentValue) return 1 * order;
        else if(nextValue < currentValue) return -1 * order;
        else return 0;
    });

    return array;
}

module.exports = sortByField;