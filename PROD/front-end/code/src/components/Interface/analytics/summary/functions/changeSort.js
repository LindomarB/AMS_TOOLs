function changeSort({type, order, currentSort}) {
    const newSort = {
        label: {},
        value: {}
    };

    if(type === 'label') {
        newSort.value = {
            order: 0,
            tooltip: `Sort values in ascending`
        }
    } else {
        newSort.label = {
            order: 0,
            tooltip: `Sort labels in ascending`
        }
    }

    if(typeof order === 'number') {
        newSort[type].order = order;
    } else {
        if (currentSort[type].order) {
            newSort[type].order = currentSort[type].order === 1? -1 : 0;
        } else {
            newSort[type].order = 1;
        }
    }

    let tooltip = `Sort ${type}s in ascending`;

    if(newSort[type].order === 1) {
        tooltip = `Sort ${type}s in descending`;
    } else if(newSort[type].order === -1) {
        tooltip = 'Disable sort';
    }

    newSort[type].tooltip = tooltip;

    return newSort;
}

export default changeSort;