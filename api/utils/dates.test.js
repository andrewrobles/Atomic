const { format, formatDates } = require('./dates');

test('format dates', () => {
    const dates = ['2024-12-31']
    const result = formatDates(dates)
    const expected = {
        year: 2024,
        month: 'Dec',
        days: [
            [false, false, false, false, false], // Sundays
            [false, false, false, false, false], // Mondays
            [false, false, false, false, false],  // Tuesdays
            [false, false, false, false, null],  // Wednesdays
            [false, false, false, false, null],  // Thursdays
            [false, false, false, false, null],  // Fridays
            [false, false, false, false, null],  // Saturdays
        ]
    }
    expect(result[0]).toEqual(expected)
})


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
            [false, false, false, false, null],  // Wednesdays
            [false, false, false, false, null],  // Thursdays
            [false, false, false, false, null],  // Fridays
            [false, false, false, false, null],  // Saturdays
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
        '2026-01-01'
    ]
    const result = format(dates);
    expect(result.length).toEqual(13);
});

test('test 2', () => {
    const dates = [
        '2025-01-01',
    ]
    const expected = {
        year: 2025,
        month: 'Jan',
        days: [
            [null, false, false, false, false],  // Sundays
            [null, false, false, false, false],  // Mondays
            [null, false, false, false, false],  // Tuesdays
            [true, false, false, false, false],  // Wednesdays
            [false, false, false, false, false], // Thursdays
            [false, false, false, false, false], // Fridays 
            [false, false, false, false, null],  // Saturdays 
        ]
    }
    const result = format(dates);
    expect(result[0]).toEqual(expected);
});