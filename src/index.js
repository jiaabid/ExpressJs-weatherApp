const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
console.log(__dirname)
//for showing the static page
const htmlPath = path.join(__dirname, '../public')
app.use(express.static(htmlPath))
//for the dynamic pages
const viewPath = path.join(__dirname, '../tempelates/views')
const partialPath = path.join(__dirname, '../tempelates/partials')

app.set('view engine', 'hbs')
//to see the view folder
app.set('views', viewPath)
//setting the partials (partials are the reusable tempelates e.g header ,footer ,menus)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'home'
    })
})
app.get('/weather', (req, res) => {
    //render the html pages
    if (!req.query.address) {
        return res.send('do enter the address')
    }
    geocode(req.query.address, (error, { longitude, latitude, place }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, data) => {
            if (error) {
                res.send(error)
            }
            else {

                res.send({
                    temperature: data.currently.temperature,
                    icon: data.currently.icon,
                    dew: data.currently.dewPoint,
                    humidity: data.currently.humidity,
                    pressure: data.currently.pressure,
                    summary: data.currently.summary,
                    location: req.query.address,
                    place: place
                })

            }
        })


    })
})

app.get('/about', (req, res) => {
    //render the html pages
    res.render('about', {
        title: 'about',
        description: 'just a beginning babess'
    })
})
app.get('/help', (req, res) => {
    //render the html pages
    res.render('help', {
        title: 'Help',
        description: 'just a beginning babess'
    })
})

app.get('/help/*', (req, res) => {
    res.render('fallback', {
        title: 'no further help articles found'
    }
    )
}
)
app.get('*', (req, res) => {
    res.render('fallback', {
        title: 'error 404 \n page not found'
    })
})

app.listen(port, () => {
    console.log('server started')
})

// app.get('',(req,res)=>{
//     res.send('hello world!')

// })
// app.get('/help',(req,res)=>{
//     res.send('this is a help page')
// })
// app.get('/about',(req,res)=>{
//     res.send(`<h1>about page</h1>`)
// })
// app.get('/weather',(req,res)=>{
//     res.send(`<a href="#!">click here to get weather</a>`)
// })
