const request = require('request')
pry = require('pryjs')

const forecast = (lat, lon , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=e18db704b27b6be659211d59ce81a40c&query=' + lat + ',' + lon 


    request({url, json: true}, (error, {body}) => {
        // eval(pry.it)
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location: ' + body.error.info,undefined)
        } else {
            const {temperature:temp, feelslike:feel, weather_descriptions:desc} = body.current
            // eval(pry.it)
            callback(undefined, desc[0] + ': it is currently '+ temp + '˚ degrees out. It feels like ' + feel + '° out.')
        }
    })
}

module.exports = forecast