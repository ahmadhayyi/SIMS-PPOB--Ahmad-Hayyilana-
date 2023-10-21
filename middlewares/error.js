function handleErrors(err, req, res, next) {
    res.render('404', {
        currentPath: '/',
        layout: 'layouts/main-layouts',
        title: '404',
    })
}

module.exports = { handleErrors };