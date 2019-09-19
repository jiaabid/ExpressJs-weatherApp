const request = require('request')

const forecast = (long,lat,callback)=>{
    const url ='https://api.darksky.net/forecast/3c666f048446983fca161d00a221464a/'+long+',' +lat +'?units=si'
    request(url,(error,{body})=>{
        if(error)
        {
            callback('network is not available',undefined)
        }
        else if(body.length === 0)
        {
            callback('No results found,try with another place',undefined)
        }
        else{
            callback(undefined,JSON.parse(body)  )
        }
    })
}
module.exports = forecast
// forecast(40.7648,-73.00496,(error,data)=>{
//     console.log(error)
//     console.log(data)
// })