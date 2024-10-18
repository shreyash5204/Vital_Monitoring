const express = require('express');
const path = require('path');
const quescontroller = require('./controllers/model')
const parameterController = require('./controllers/parameters');
// const { mongoconnect } = require('./util/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', (req, res) => {
    res.send(parameterController.cdata);
});

app.post('/submit', parameterController.submit);

app.post('/ask', quescontroller.model);

app.use('/vitals', (req, res, next) => {
    res.render('tabs/vitals', {
        pageTitle: 'Vitals',
        mode:(parameterController.mode)?parameterController.mode:false,
        data:parameterController.cdata
    });
})

app.use('/ml-model', (req, res, next) => {
    res.render('tabs/ml-model', {
        pageTitle: 'ML-Model',
        mode:(parameterController.mode)?parameterController.mode:false,
    });
})

app.use('/about', (req, res, next) => {
    res.render('tabs/about', {
        pageTitle: 'About',
        mode:(parameterController.mode)?parameterController.mode:false,
    });
})

app.use('/', (req, res, next) => {
    res.render('tabs/vitals', {
        pageTitle: 'Home Page',
        mode:(parameterController.mode)?parameterController.mode:false,
        data:parameterController.cdata
    });
})



app.listen(3000);
