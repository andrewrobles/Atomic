const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getStreak = (dates, today, start) => {
    const endDate = new Date(today)
    const startDate = dates.length === 0 ? new Date(start) : dates[dates.length - 1]
    const daysSince = calculateDaysBetween(startDate, endDate)
    return daysSince === 0 ? daysSince : daysSince - 1
}

const calculateDaysBetween = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)

    const differenceInMillis = Math.abs(d2 - d1)

    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24)

    return differenceInDays
}

const heatmap = (dates, today, started = null) => {
    const matrix = []
    const todayDate = parseDate(today)

    let earliestDate
    if (dates.length === 0) {
        earliestDate = started === null ? todayDate : parseDate(started)
    } else {
        earliestDate = started === null ? parseDate(dates[0]) : parseDate(started)
    }
    const latestDate = dates.length === 0 ? todayDate : parseDate(dates[dates.length - 1])

    let month = earliestDate.getMonth()
    let year = earliestDate.getFullYear()
    
    const numberOfMonths = Math.max(12, getMonthsDifference(earliestDate, latestDate))
    const dateSet = new Set(dates)
    const date = new Date(year, month, 1)

    for (let i = 0; i < numberOfMonths; i++) {
        const days = [[], [], [], [], [], [], []]
        const firstDateOfNextMonth = new Date(year, month + 1, 1)
        const nextMonth = firstDateOfNextMonth.getMonth()
        while (date.getMonth() !== nextMonth) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
            const value = earliestDate < date && date < todayDate ? !dateSet.has(dateString) : false 
            days[date.getDay()].push(value)
            date.setDate(date.getDate() + 1)
        }

        // if the first day of the month falls in the middle of the week, add null to the end of each array before this day
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        if (firstDayOfMonth > 0) {
            for (let i = 0; i < firstDayOfMonth; i++) {
                days[i].unshift(null)
            }
        }

        // if the last day of the month falls in the middle of the week, add null to the end of each array after this day
        const firstDayOfNextMonth = new Date(year, month + 1, 0).getDay();
        if (firstDayOfNextMonth > 0) {
            for (let i = firstDayOfNextMonth + 1; i < days.length; i++) {
                days[i].push(null)
            }
        }

        matrix.push({
            days,
            year,
            month: months[month],
        })

        month = date.getMonth()
        year = date.getFullYear()
    }

    return matrix;
}

const parseDate = date => {
    const month = date.split('-')[1] - 1
    const year = date.split('-')[0]
    const day = date.split('-')[2]
    return new Date(year, month, day)
}

const getMonthsDifference = (date1, date2) => {
    const yearDiff = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();

    return yearDiff * 12 + monthDiff;
}

module.exports = { heatmap, getStreak }
