const dates = require('./dates')

test('parses dates', () => {
    const input = ['2024-12-22', '2024-12-23']
    const result = dates(input)
    const expectedFirstRow = [true, true, null, null, null]
    expect(result[0]).toEqual(expectedFirstRow)
});