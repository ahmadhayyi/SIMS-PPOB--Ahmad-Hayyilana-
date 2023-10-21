const express = require('express');
const expressLayouts = require('express-ejs-layouts')

/* CONFIG */
const app = express()
const port = 3000;

/* SET VIEW ENGINE */
app.set('view engine', 'ejs')
/* SET LAYOUT */
app.use(expressLayouts);

// /* STATIS */
const statics = require('./statics')
app.use(statics)

/* MENGURAI URL PADA METHOD POST */
app.use(express.urlencoded({ extended: true }))
app.use(express.text())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

module.exports = app