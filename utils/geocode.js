const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaHVza2ViYXNpMjExIiwiYSI6ImNrOTFmYXd3bjBhNXgzbGxoenp0ZGc2ZGsifQ.K5szK8P-GJtEbt8b58hs1Q&limit=1"
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Geocoder service!', undefined) 
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try another search.', undefined)
        } else {
            const {center:lonLat, place_name:location} = body.features[0]
            callback(undefined, {
                longitude: lonLat[0],
                latitude: lonLat[1],
                location
            })
        }
    })

}

module.exports = geocode