const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8e9ca36d8e50401ab9121f727be6c7b4&query=' + latitude + ',' + longitude + '&units=f'

    request({url:url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to Weather service',undefined)
        }else if(body.error){
            callback('Unable to find location!,try another',undefined)
        }else{
            callback(undefined,'It is current ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })  
}

module.exports = forecast