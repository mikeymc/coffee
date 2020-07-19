function sort(coffeeArray) {
    return coffeeArray.sort((x, y) => {
        if(x['arrived'] < y['arrived']) {
            return 1;
        }
        if(x['arrived'] > y['arrived']) {
            return -1;
        }
        return 0;
    });
}

module.exports = {sort}
