const path = require('path')
const express = require('express') // express exposes a single function express()
const hbs = require('hbs')
const pry = require('pryjs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// fetch the port value from heroku |OR| set 3000 if it fails (e.g. locally)
const port = process.env.PORT || 3000

// set view engine as hbs, which is handlebar integration for express
app.set('view engine','hbs')

// set views path
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)


const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// setup root server directory
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    // render file 'templates/index.hbs' passing data to the renderer
    res.render('index', {
        title: 'Weather',
        name: 'Riccardo'
    })
})

app.get('/about', (req,res) => {
    // render file 'templates/about.hbs' passing data to the renderer
    res.render('about', {
        title: 'About Me',
        name: 'Riccardo'
    })
})

app.get('/help', (req, res) => {
    // render file 'templates/help.hbs' passing data to the renderer
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Helper',
        name: 'Riccardo'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    // eval(pry.it)
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
            // eval(pry.it)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            // eval(pry.it)
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('errors',{
        title: '404',
        error: 'Help article not found!',
        name: 'Riccardo'
    })
})

// * matches everything unmatched until now, so it catches 404
app.get('*',(req,res) => {
    res.render('errors',{
        title: '404',
        error: '404 Page not found!',
        name: 'Riccardo'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})