const format = (dates) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const earliestMonth = dates[0].split('-')[1]
    const earliestYear = dates[0].split('-')[0]
    const formattedDates = []
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    let year = parseInt(earliestYear);
    let month = parseInt(earliestMonth) - 1; // Convert to 0-based month index

    while (year < currentYear || (year === currentYear && month <= currentMonth)) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthData = {};
        const daysArray = [[], [], [], [], [], [], []];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day)
            const dayName = date.toLocaleString('en-US', { weekday: 'short' })
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const dateSet = new Set(dates);
            const dayToIndex = {
                'Sun': 0,
                'Mon': 1, 
                'Tue': 2,
                'Wed': 3,
                'Thu': 4,
                'Fri': 5,
                'Sat': 6
            };
            daysArray[dayToIndex[dayName]].push(dateSet.has(dateString));
        }

        monthData.year = year
        monthData.month = months[month]
        monthData.days = daysArray
        formattedDates.push(monthData)

        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
    }

    return formattedDates;
}

module.exports = { format };