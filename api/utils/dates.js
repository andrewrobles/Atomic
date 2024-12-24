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
            
            if (dayName === 'Sun') {
                daysArray[0].push(dates.includes(dateString))
            }
            else if (dayName === 'Mon') {
                daysArray[1].push(dates.includes(dateString))
            }
            else if (dayName === 'Tue') {
                daysArray[2].push(dates.includes(dateString))
            }
            else if (dayName === 'Wed') {
                daysArray[3].push(dates.includes(dateString))
            }
            else if (dayName === 'Thu') {
                daysArray[4].push(dates.includes(dateString))
            }
            else if (dayName === 'Fri') {
                daysArray[5].push(dates.includes(dateString))
            }
            else if (dayName === 'Sat') {
                daysArray[6].push(dates.includes(dateString))
            }
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