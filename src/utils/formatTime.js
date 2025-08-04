const formatTime = (startingTime) => { 
     const parts = startingTime.split('T');
     const date = parts[0];
     let time = parts[1].split(':');
     time = time[0] + ':' + time[1]; 

     return {date, time};
}

export default formatTime;