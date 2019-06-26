const compare = (a, b) => {
    let itemA;
    let itemB;

    if (a.price) {
        itemA = a.title.toUpperCase();
        itemB = b.title.toUpperCase();
    } else {
        itemA = a.name.toUpperCase();
        itemB = b.name.toUpperCase();
    }

    let comparison = 0;
    if (itemA > itemB) {
        comparison = 1;
    } else if (itemA < itemB) {
        comparison = -1;
    }
    return comparison;
};

module.exports = { compare };
