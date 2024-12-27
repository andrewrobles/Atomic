const { format, formatDates } = require('./dates');

test('formatDates logs days', () => {
    const dates = ['2024-12-29', '2024-12-31',]
    const result = formatDates(dates, '2025-01-01')
    const december = {
        year: 2024,
        month: 'Dec',
        days: [
            [false, false, false, false, false], // Sundays
            [false, false, false, false, true], // Mondays
            [false, false, false, false, false],  // Tuesdays
            [false, false, false, false, null],  // Wednesdays
            [false, false, false, false, null],  // Thursdays
            [false, false, false, false, null],  // Fridays
            [false, false, false, false, null],  // Saturdays
        ]
    }
    const january = {
        year: 2025,
        month: 'Jan',
        days: [
            [null, false, false, false, false],  // Sundays
            [null, false, false, false, false],  // Mondays
            [null, false, false, false, false],  // Tuesdays
            [false, false, false, false, false],  // Wednesdays
            [false, false, false, false, false], // Thursdays
            [false, false, false, false, false], // Fridays 
            [false, false, false, false, null],  // Saturdays 
        ]
    }
    expect(result.length).toEqual(12)
    expect(result[0]).toEqual(december)
    expect(result[1]).toEqual(january)
})

test('formatDates handles months starting in the middle of the week', () => {
    const dates = [
        '2025-01-31',
    ]
    const expected = {
        year: 2025,
        month: 'Jan',
        days: [
            [null, false, false, false, false],  // Sundays
            [null, false, false, false, false],  // Mondays
            [null, false, false, false, false],  // Tuesdays
            [false, false, false, false, false],  // Wednesdays
            [false, false, false, false, false], // Thursdays
            [false, false, false, false, false], // Fridays 
            [false, false, false, false, null],  // Saturdays 
        ]
    }
    const result = formatDates(dates, '2025-01-01');
    expect(result[0]).toEqual(expected);
});

test('formatDates handles habits less than a year old', () => {
    const dates = [
        '2024-12-24',
    ]
    const result = formatDates(dates, '2025-01-01');
    expect(result.length).toEqual(12);
});

test('formatDates handles habits more than a year old', () => {
    const dates = [
        '2024-12-24',
        '2026-01-01'
    ]
    const result = formatDates(dates, '2025-01-01');
    expect(result.length).toEqual(13);
});

