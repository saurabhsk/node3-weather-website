const req = require('request')


const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/dcaab4fb221fac10440ef4a7cd82ad34/'+ latitude+ ',' + longitude +'?units=si'
     
    req({url, json:true},(error,{ body })=>{
       if(error){
        callback('Unable to connect to weather service!', undefined)
       }else if(body.error){
        callback('Unable to find location! Try search again!', undefined)
       }else{
            callback(undefined,body.daily.data[0].summary +'It is currently '+ body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
       }
    })

}


module.exports=forecast