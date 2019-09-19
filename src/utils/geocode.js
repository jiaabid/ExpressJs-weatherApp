const request = require('request')

const geocode = (place,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ place +'.json?access_token=pk.eyJ1Ijoid2FqaWhheHh4IiwiYSI6ImNrMGppMWQzYjBheGEzY3F0YmFpcXNmZnYifQ.SZG3kIEuY5bebNiHdxF-UQ&limit=1'
    request(url ,(error,{body})=>{
        if(error)
        {
            callback("unable to find such location ,try again",undefined)
        }
        else if(body.length === 0)
        {
            callback("unable to find such location,try with another place",undefined)
        }
        else{
            const obj = JSON.parse(body)
            callback(undefined, {
                longitude :obj.features[0].center[1],
             latitude : obj.features[0].center[0],
              place : obj.features[0].place_name
            })
        }
    }) 
}


module.exports = geocode 