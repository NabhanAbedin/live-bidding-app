const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
}

const formatDate = (date) => {
    let dateParts;
    if (date.includes('T')) {
        const parts = date.split('T');
        dateParts = parts[0].split('-');
    } else {
        dateParts = date.split('-');
    }
    const year = dateParts[0];
    const month = months[dateParts[1]];

    return `${month} ${dateParts[2]}, ${year}`;
}

export default formatDate;