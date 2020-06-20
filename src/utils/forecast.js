const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=815f5e3640cc4b40804e43647349fbcb`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Error 404 ....', undefined);
        }
        else if (body.error) {
            callback("unable to find location", undefined);
        }
        else {
            callback(undefined, {
                minTemp: body.daily[0].temp.min,
                maxTemp: body.daily[0].temp.max,
                currTemp: body.current.temp,
                windSpeed: body.current.wind_speed,
                weather: body.daily[0].weather[0].description,
                icon: body.daily[0].weather[0].icon

            })

        }
    })
}

module.exports = forecast;