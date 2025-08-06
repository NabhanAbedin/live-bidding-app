const minTimeValue = (formData,today) => {
    if (formData.date === today) {
        const now = Temporal.Now.zonedDateTimeISO();
        const hour = now.hour;
        const minute = now.minute;
        return `${hour}:${minute}`;
    }
    return '';
}

export default minTimeValue;