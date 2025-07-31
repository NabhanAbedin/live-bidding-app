const formatDate = (date) => {
    const parts = date.split('T');
    return parts[0];
}

export default formatDate;