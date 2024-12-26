const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const format = (dates) => {
    const earliestMonth = dates[0].split('-')[1]
    const earliestYear = dates[0].split('-')[0]
    const earliestDay = dates[0].split('-')[2]
    const formattedDates = []

    let year = parseInt(earliestYear);
    let month = parseInt(earliestMonth) - 1; // Convert to 0-based month index

    const latestMonth = dates[dates.length - 1].split('-')[1]
    const latestYear = dates[dates.length - 1].split('-')[0]
    const latestDay = dates[dates.length - 1].split('-')[2]
    const latestDate = new Date(latestYear, latestMonth, latestDay)
    const earliestDate = new Date(earliestYear, earliestMonth, earliestDay)
    const max_months = Math.max(12, getMonthsDifference(earliestDate, latestDate))

    let monthCount = 1
    

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

const getMonthsDifference = (date1, date2) => {
    const yearDiff = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();
  
    return yearDiff * 12 + monthDiff;
  }

module.exports = { format };