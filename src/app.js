const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

const port = process.env.PORT || 3000

//define path for express config
const dirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static dir to server
app.use(express.static(dirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Mausam",
        name: "Sonu Mittal"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Sonu Mittal"
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Contact",
        name: "Sonu Mittal"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })



    // res.send({
    //     forecast: "It is around 31 degrees",
    //     location: "Mathura",
    //     address: req.query.address
    // });
});

// app.get('/contact/*', (req, res) => {
//     res.render('404', {
//         errorMsg: "Help article not found!!"
//     });
// });

app.get('/*', (req, res) => {
    res.render('404', {
        errorMsg: "Page not found."
    });
});

app.listen(port, () => {
    console.log("Server is up on port" + port);
});
