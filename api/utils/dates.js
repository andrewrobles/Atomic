const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const format = (dates) => {
    const formattedDates = []

    const earliestDate = parseDate(dates[0]) 
    const latestDate = parseDate(dates[dates.length - 1])

    let monthCount = 1
    const earliestDateString = dates[0]
    let month = parseInt(earliestDateString.split('-')[1]) - 1; // Convert to 0-based month index
    let year = parseInt(earliestDateString.split('-')[0]);
    const max_months = Math.max(12, getMonthsDifference(earliestDate, latestDate))

    

    while (monthCount <= max_months) {
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

        // if the first day of the month falls in the middle of the week, add null to the end of each array before this day
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        if (firstDayOfMonth > 0) {
            for (let i = 0; i < firstDayOfMonth; i++) {
                daysArray[i].unshift(null)
            }
        }
        
        // if the last day of the month falls in the middle of the week, add null to the end of each array after this day
        const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
        if (lastDayOfMonth > 0) {
            for (let i = lastDayOfMonth + 1; i < daysArray.length; i++) {
                daysArray[i].push(null)
            }
        }

        monthData.year = year
        monthData.month = MONTHS[month]
        monthData.days = daysArray
        formattedDates.push(monthData)

        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        monthCount += 1
    }

    return formattedDates;
}

const parseDate = date => {
    const month = date.split('-')[1]
    const year = date.split('-')[0]
    const day = date.split('-')[2]
    return new Date(year, month, day)
}

const getMonthsDifference = (date1, date2) => {
    const yearDiff = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();

    return yearDiff * 12 + monthDiff;
}

module.exports = { format };