const { format } = require('./dates');


test('formatDate returns the correct day format', () => {
    const dates = [
        '2024-12-24',
    ]
    const expected = [{
        year: 2024,
        month: 'Dec',
        days: [
            [false, false, false, false, false], // Sundays
            [false, false, false, false, false], // Mondays
            [false, false, false, true, false],  // Tuesdays
            [false, false, false, false],  // Wednesdays
            [false, false, false, false],  // Thursdays
            [false, false, false, false],  // Fridays
            [false, false, false, false],  // Saturdays
        ]
    }]
    const result = format(dates);
    expect(result).toEqual(expected);
});

