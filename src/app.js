const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlers engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))



app.get('',(req, res)=>{
    res.render('index',{

        title:'Weather App',
        name:'Saurabh'
    } )  
})

app.get('/about',(req, res)=>{
       res.render('about',{
           title:'About me',
           name:'Saurabh'
       })
})


app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Page',
        helpText:'I am here to help you out!!',
        name:'Saurabh'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude,location} = { })=>{
      if(error){
          return res.send(error)
      }

      forecast(latitude, longitude, (error, forecastData)=>{
          if(error){
              return res.send({error})
          }

          res.send({
              forecast:forecastData,
              location,
              address:req.query.address
          })
      })
    })
})

    // res.send({
    //     forecast:'It is raining',
    //     location:'Gurgaon',
    //     address:req.query.address
    // })


app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
   res.send({
      products:[]
   })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Saurabh',
        errorMessage:'Help article not found'
    })
})
//* -> wildcard entry
app.get('*', (req, res)=>{
     res.render('404',{
         title:'404',
         name:'Saurabh',
         errorMessage:'Page Not Found'
     })
})
//app.com
//app.com/help
//app.com/about

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})