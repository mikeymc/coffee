const {sort} = require('./sort.js');

test('sorting by date descending', () => {
    let sortedCoffees = sort(unsortedCoffees);

    expect(sortedCoffees[0]['name']).toBe('coffee-month-five')
    expect(sortedCoffees[1]['name']).toBe('coffee-month-four')
    expect(sortedCoffees[2]['name']).toBe('coffee-month-three')
    expect(sortedCoffees[3]['name']).toBe('coffee-month-two')
    expect(sortedCoffees[4]['name']).toBe('coffee-month-one')
});

let unsortedCoffees = [
    {
        "name": 'coffee-month-two',
        "score": 87.5,
        "arrived": new Date(2020, 2, 0)
    },
    {
        "name": 'coffee-month-four',
        "score": 88.3,
        "arrived": new Date(2020, 4, 0)
    },
    {
        "name": 'coffee-month-three',
        "score": 88.8,
        "arrived": new Date(2020, 3, 0)
    },
    {
        "name": 'coffee-month-one',
        "score": 87.6,
        "arrived": new Date(2020, 1, 0)
    },
    {
        "name": 'coffee-month-five',
        "score": 89.5,
        "arrived": new Date(2020, 5, 0)
    }
]