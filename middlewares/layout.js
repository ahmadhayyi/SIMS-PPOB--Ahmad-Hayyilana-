const layout = 'layouts/main-layouts';

function setLayout(req, res, next) {
    res.locals.layout = layout;
    next();
}

module.exports = { setLayout, layout };