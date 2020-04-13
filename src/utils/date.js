const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function generateDate(time) {
    if (!time) return '';
    let date = new Date(time);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

export function generateDateFull(time) {
    if (!time) return '';
    let date = new Date(time);
    return month[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + '\xa0\xa0\xa0\xa0' + weekday[date.getDay()];
}
