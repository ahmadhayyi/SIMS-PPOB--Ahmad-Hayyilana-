const app = require('../config/server')
const session = require('express-session')

app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
}));

function isAuthenticated(req, res, next) {
    if(req.session.token) {
        return next();
    }
    return res.redirect('/login')
}

function isNotAuthenticated(req, res, next) {
    if(req.session.token) {
        return res.redirect('/')
    }
    return next();
}

module.exports = { isAuthenticated, isNotAuthenticated }