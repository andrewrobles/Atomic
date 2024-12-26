const { format } = require('./dates');


test('test 1', () => {
    const dates = [
        '2024-12-24',
    ]
    const expected = {
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
    }
    const result = format(dates);
    expect(result[0]).toEqual(expected);
});

test('test 2', () => {
    const dates = [
        '2024-12-24',
    ]
    const result = format(dates);
    expect(result.length).toEqual(12);
});

test('test 3', () => {
    const dates = [
        '2024-12-24',
        '2026-1-1'
    ]
    const result = format(dates);
    expect(result.length).toEqual(13);
});