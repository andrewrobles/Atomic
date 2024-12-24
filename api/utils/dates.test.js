const { format } = require('./dates');

test('formatDate returns the correct date format', () => {
    const dates = [
        '2024-12-24',
    ]
    const expected = [{
        'Dec': [
            { date: 1, day: 'Sun', value: false }, { date: 2, day: 'Mon', value: false }, { date: 3, day: 'Tue', value: false },
            { date: 4, day: 'Wed', value: false }, { date: 5, day: 'Thu', value: false }, { date: 6, day: 'Fri', value: false },
            { date: 7, day: 'Sat', value: false }, { date: 8, day: 'Sun', value: false }, { date: 9, day: 'Mon', value: false },
            { date: 10, day: 'Tue', value: false }, { date: 11, day: 'Wed', value: false }, { date: 12, day: 'Thu', value: false },
            { date: 13, day: 'Fri', value: false }, { date: 14, day: 'Sat', value: false }, { date: 15, day: 'Sun', value: false },
            { date: 16, day: 'Mon', value: false }, { date: 17, day: 'Tue', value: false }, { date: 18, day: 'Wed', value: false },
            { date: 19, day: 'Thu', value: false }, { date: 20, day: 'Fri', value: false }, { date: 21, day: 'Sat', value: false },
            { date: 22, day: 'Sun', value: false }, { date: 23, day: 'Mon', value: false }, { date: 24, day: 'Tue', value: true },
            { date: 25, day: 'Wed', value: false }, { date: 26, day: 'Thu', value: false }, { date: 27, day: 'Fri', value: false },
            { date: 28, day: 'Sat', value: false }, { date: 29, day: 'Sun', value: false }, { date: 30, day: 'Mon', value: false },
            { date: 31, day: 'Tue', value: false }
        ]
    }]
    const result = format(dates);
    expect(result).toEqual(expected);
});
