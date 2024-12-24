const { format } = require('./dates');

test('formatDate returns the correct day format', () => {
    const dates = [
        '2024-12-24',
    ]
    const expected = [{
        month: 'Dec',
        days: [
            { day: 1, weekday: 'Sun', value: false }, { day: 2, weekday: 'Mon', value: false }, { day: 3, weekday: 'Tue', value: false },
            { day: 4, weekday: 'Wed', value: false }, { day: 5, weekday: 'Thu', value: false }, { day: 6, weekday: 'Fri', value: false },
            { day: 7, weekday: 'Sat', value: false }, { day: 8, weekday: 'Sun', value: false }, { day: 9, weekday: 'Mon', value: false },
            { day: 10, weekday: 'Tue', value: false }, { day: 11, weekday: 'Wed', value: false }, { day: 12, weekday: 'Thu', value: false },
            { day: 13, weekday: 'Fri', value: false }, { day: 14, weekday: 'Sat', value: false }, { day: 15, weekday: 'Sun', value: false },
            { day: 16, weekday: 'Mon', value: false }, { day: 17, weekday: 'Tue', value: false }, { day: 18, weekday: 'Wed', value: false },
            { day: 19, weekday: 'Thu', value: false }, { day: 20, weekday: 'Fri', value: false }, { day: 21, weekday: 'Sat', value: false },
            { day: 22, weekday: 'Sun', value: false }, { day: 23, weekday: 'Mon', value: false }, { day: 24, weekday: 'Tue', value: true },
            { day: 25, weekday: 'Wed', value: false }, { day: 26, weekday: 'Thu', value: false }, { day: 27, weekday: 'Fri', value: false },
            { day: 28, weekday: 'Sat', value: false }, { day: 29, weekday: 'Sun', value: false }, { day: 30, weekday: 'Mon', value: false },
            { day: 31, weekday: 'Tue', value: false }
        ],
    }]
    const result = format(dates);
    expect(result).toEqual(expected);
});
