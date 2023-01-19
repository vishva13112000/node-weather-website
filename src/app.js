const path = require('path')
const express = require('express')
const hbs = require('hbs')
const gecocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//console.log('about',aboutPath);

//set up Handlebar engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'vishva Kotadia'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About me',
        name: 'Vishva Kotadia'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        description : 'This is our help page of Weather App',
        name:'vishva Kotadia'
    })
})
app.get('/weather',(req,res)=>{
    //console.log('we',req.query.address)
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        })
    }

    gecocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude , (error,forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address 
            })
        })
    })

    // res.send({
    //     forcast: 'It is snowing',
    //     location: 'philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products :[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 404,
        name: 'vishva Kotadia',
        errorMessage: 'Help artical not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 404,
        name: 'vishva Kotadia',
        errorMessage : 'Page not Found!'
    })
    
})



app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})