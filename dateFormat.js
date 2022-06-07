exports.time = () => {
    let date = new Date();
    let hours = date.getHours();
    let newHours = hours - 12;
    let minutes = date.getMinutes();
    let modifiedMinutes = "0" + minutes;
    let timeOfDay = "am";
    let time = " ";
    let standardHour;

    if (hours >= 12) {
        timeOfDay = "pm";
    } else {
        timeOfDay = "am";
    }

    if (minutes < 10) {
        return `${newHours}:${modifiedMinutes}${timeOfDay}`;
    }
        
    switch (hours) {
        case 13:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time
        
        case 14:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time
        
        case 15:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time

        case 16:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time
        
        case 17:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time

        case 18:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time

        case 19:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time

        case 20:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time
        
        case 21:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time

        case 22:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time
        
        case 23:
            standardHour = hours - 12;
            time = `${standardHour}:${minutes}${timeOfDay}`;
            return time
        
        default:
            time = `${hours}:${minutes}${timeOfDay}`;
            return time
    };
}

exports.month = () => {
    let date = new Date();
    let month = date.getMonth();

    switch (month) {
        case 0:
            return "January"

        case 1:
            return "February"

        case 2:
            return "March"

        case 3:
            return "April"

        case 4:
            return "May"

        case 5:
            return "June"
        
        case 6:
            return "July"
        
        case 7:
            return "August"

        case 8:
            return "September"

        case 9:
            return "October"

        case 10:
            return "November"

        case 11:
            return "December"

        default:
            return "Month doesn't exist..."
    }
}

exports.dayOfMonth = () => {
    let date = new Date()
    return date.getDate();
}

exports.day = () => {
    let date = new Date();
    let weekday = date.getDay();

    switch (weekday) {
        case 0:
            return "Sunday"

        case 1:
            return "Monday"

        case 2:
            return "Tuesday"

        case 3:
            return "Wednesday"

        case 4:
            return "Thursday"

        case 5:
            return "Friday"

        case 6:
            return "Saturday"

        default:
            return "Day doesn't exist..."
    }
}

exports.year = () => {
    let date = new Date();
    return date.getFullYear();
}