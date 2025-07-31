const formatDuration = (duration) => {
   if (duration < 60) {
    return `${duration} minutes`;
   } else {
    const hours = Math.floor(duration / 60);
    const remainder = duration % 60;
    return `${hours} hours ${remainder} minutes`;
   }
}

export default formatDuration;