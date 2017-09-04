const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send({name: 'Ken', likes: ['Programming', 'VideoEditing']});
    res.render('home.hbs', {
        title: 'Home Page',
        welcomeMessage: 'Welcome to the Home Page'
    });
});

app.get('/about', (req, res) => {
    // res.send('This is the About Page.');
    res.render('about.hbs', {title: 'About Page Here'});
});

app.get('/projects', (req, res) => {
    res.render('projects', {title: 'Projects Page', welcomeMessage: 'View my Portfolio'});
});

app.get('/bad', (req, res) => {
    res.json({errorMessage: 'Can not handle reques'});
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});