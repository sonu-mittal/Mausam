const request = require('request');

const geocode = (add, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(add)}.json?access_token=pk.eyJ1Ijoic29udW1pdHRhbCIsImEiOiJja2F0ZHdrZnYwZnRrMnhwdDB6MXd3NGRsIn0.tma0j2q5WT5uF-NXhITKPQ&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to loaction services!!', undefined);
        }
        else if (body.features.length === 0) {
            callback("Unable to find location. Try another search....", undefined);
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode;