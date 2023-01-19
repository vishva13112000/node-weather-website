const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlzaHZhNjciLCJhIjoiY2xkMDF4b3NyMXM4eTNvczVyY3g1NDNhdCJ9.uAR9zAg95v14LfEy-po-TQ&limit=1'
    request({url:url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connecr to GeoCoading service',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location!,try another',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })

}

module.exports = geocode