import ajax from "./ajax";
import jsonp from 'jsonp'

export const login = (username, password) => ajax('/login', {username, password}, 'POST');
export const addUser = (user) => ajax('/manage/user/add', user, 'POST');

/*export function loadWeather(city) {
/!*
    const url = 'https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=M7dALzgDCqkPJrmzNlirt7g0InShcE3SbXMvVtScfi4&product=observation&name=Berlin-Tegel';
*!/
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4
9MVra6urFRGOT9s8UBWr2`;
    return new Promise((resolve, reject) => {
        jsonp(url, {
            param: 'callback'
        }, (error, response) => {
            if (!error) {
                /!*const {dayPictureUrl, weather} = response.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})*!/
                console.log(response);
                resolve(response);
            } else {
                alert('Fail to load weather ')
            }
        });
    })
}*/

export function reqWeather(city) {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    return new Promise((resolve, reject) => {
        jsonp(url, {
            param: 'callback'
        }, (error, response) => {
            if (!error && response.status === 'success') {
                /*const {dayPictureUrl, weather} = response.results[0].weather_data[0];
                resolve({dayPictureUrl, weather});*/
            } else {
                alert('获取天气信息失败');
            }
        })
    })
}
reqWeather('北京');
