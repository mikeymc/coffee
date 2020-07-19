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

function parseDate(dateString) {
    let dateTokens = dateString.split(' ');
    const monthNumLookupTable = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3,
        'May': 4, 'June': 5, 'July': 6, 'August': 7,
        'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return new Date(dateTokens[1], monthNumLookupTable[dateTokens[0]], 1)
}


module.exports = {sort, parseDate}
