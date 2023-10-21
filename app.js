const app = require('./config/server');
const { isAuthenticated, isNotAuthenticated } = require('./middlewares/auth');
const sims = require('./utils/sims');
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
const FormData = require('form-data');

/* KODE STATUS */
const tokenExpired = 108;

/* LAYOUT */
const layout = 'layouts/main-layouts';

/* URL */
const URL = 'https://take-home-test-api.nutech-integrasi.app';

/* HOME */
app.get('/', isAuthenticated, async (req, res) => {
    const token = req.session.token;
    try {
        const dataProfile = await sims.getProfile(token); 
        const dataSaldo = await sims.getSaldo(token); 
        const dataServices = await sims.getServices(token);
        const dataBanner = await sims.getBanner(token);
        if (dataBanner.status === tokenExpired) {
            req.session.response = dataBanner;
            res.redirect('/logout');
        } else {
            res.render('index', {
                currentPath: '/',
                layout,
                title: 'Home - SIMS PPOB',
                dataProfile,
                dataSaldo,
                dataServices,
                dataBanner,
            });
        }
    } catch (error) {
        console.error(error);
    }
});

/* SERVICES */
app.get('/services', async (req, res) => {
    const token = req.session.token;
    try {
        const dataServices = await sims.getServices(token);
        if (dataServices.status === tokenExpired) {
            req.session.response = dataServices;
            res.redirect('/logout');
        } else {
            res.render('services', {
                currentPath: '/services',
                layout,
                dataServices,
            });
        }
    } catch (error) {
        console.error(error);
    }
});

/* TOPUP */
app.get('/topup', isAuthenticated, async (req, res) => {
    const token = req.session.token
    const response = req.session.response;
    delete req.session.response;

    const dataProfile = await sims.getProfile(token);
    const dataSaldo = await sims.getSaldo(token);
    if (dataProfile.status === 108) {
        req.session.response = dataProfile;
        res.redirect('/logout')
    }else{
        res.render('topup', {
            currentPath: '/topup',
            layout,
            title: 'Topup - SIMS PPOB',
            response,
            dataSaldo,
            dataProfile,
        });
    }
});

/* TOPUP POST */
app.post('/topup', isAuthenticated, async (req, res) => {
    const inp = req.body.nominal;
    const top_up_amount = parseInt(inp.replace('Rp', '').replace(/\./g, ''));
    const token = req.session.token;

    try {
        const response = await sims.topup(token, { top_up_amount });
        req.session.response = response;
        if (response.status === tokenExpired) {
            res.redirect('/logout')
        }else{
            res.redirect('/topup')
        }
    } catch (error) {
        console.error(error);
    }
});

/* TRANSACTION */
app.get('/transaction', isAuthenticated, async (req, res) => {
    const token = req.session.token;
    const offset = req.query.offset || 0;
    const response = req.session.response;
    delete req.session.response;
    try {
        const dataProfile = await sims.getProfile(token)
        const dataSaldo = await sims.getSaldo(token)
        const dataHistory = await sims.historyTransaction(token, offset);
        if (dataHistory.status === tokenExpired) {
            req.session.response = dataHistory;
            res.redirect('/logout');
        } else if (offset === 0) {
            res.render('history_transaction', {
                currentPath: '/transaction',
                layout,
                title: 'History - SIMS PPOB',
                response,
                dataHistory,
                dataProfile,
                dataSaldo,
            });
        } else {
            res.json(dataHistory);
        }
    } catch (error) {
        console.error(error);
    }
});

/* TRANSACTION POST */
app.get('/transaction/:service_code', isAuthenticated, async (req, res) => {
    const token = req.session.token;
    const service_code = req.params.service_code;
    const response = req.session.response
    delete req.session.response

    try {
        const dataServices = await sims.getServices(token);
        const dataProfile = await sims.getProfile(token);
        const dataSaldo = await sims.getSaldo(token);
        if (dataSaldo.status === tokenExpired) {
            req.session.response = dataSaldo;
            res.redirect('/logout');
        } else {
            res.render('transaction', {
                currentPath: `/transaction/${service_code}`,
                layout,
                title: `${service_code} - SIMS PPOB`,
                dataServices: dataServices.data.filter(code => code.service_code == service_code),
                dataProfile,
                dataSaldo,
                response,
            });
        }
    } catch (error) {
        console.error(error);
    }
});

/* TRANSACTION POST */
app.post('/transaction', isAuthenticated, async (req, res) => {
    const data = req.body;
    const token = req.session.token;

    try {
        const response = await sims.addTransaction(token, data);
        req.session.response = response;
        if (response.status === tokenExpired) {
            res.redirect('/logout');
        } else if (response.status === 102) {
            res.redirect(`/transaction/${data.service_code}`);
        } else {
            res.redirect(`/transaction/${data.service_code}`);
        }
    } catch (error) {
        console.error(error);
    }
});

/* ACCOUNT */
app.get('/account', isAuthenticated, async (req, res) => {
    const token = req.session.token;
    const response = req.session.response;
    delete req.session.response;
    try {
        const dataProfile = await sims.getProfile(token);
        if (dataProfile.status === tokenExpired) {
            req.session.response = dataProfile;
            res.redirect('/logout');
        } else {
            res.render('account', {
                currentPath: '/account',
                layout,
                title: 'Account - SIMS PPOB',
                response,
                dataProfile,
            });
        }
    } catch (error) {
        console.error(error);
    }

});

/* SIGN IN */
app.get('/login', isNotAuthenticated, async (req, res) => {
    if (req.session.token) {
        return res.redirect('/');
    }
    const response = req.session.response;
    delete req.session.response;
    const old = req.session.old
    delete req.session.old
    res.render('login', {
        currentPath: '/login',
        layout,
        title: 'Login - SIMS PPOB',
        response,
        old,
    });
});

/* SIGN IN POST */
app.post('/login', async (req, res) => {
    const data = req.body;
    try {
        const response = await sims.login(data);
        if (response.status === 0) {
            req.session.token = response.data.token;
            res.redirect('/');
        } else {
            req.session.response = response;
            req.session.old = data
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
    }
});

/* SIGN UP */
app.get('/signup', isNotAuthenticated, async (req, res) => {
    if (req.session.token) {
        return res.redirect('/');
    }
    const response = req.session.response;
    delete req.session.response;
    const old = req.session.old;
    delete req.session.old;
    res.render('signup', {
        currentPath: '/signup',
        layout,
        title: 'Register - SIMS PPOB',
        response,
        old,
    });
});

// /* SIGN UP POST */
app.post('/signup', async (req, res) => {
    const data = req.body;
    try {
        const response = await sims.register(data);
        req.session.response = response;
        if (response.status === 0) {
            res.redirect('/login');
        } else {
            req.session.old = data
            res.redirect('/signup');
        }
    } catch (error) {
        console.error(error);
    }
});

/* UPDATE PROFILE */
app.post('/profile/update', async (req, res) => {
    const token = req.session.token;
    try {
        const response = await sims.udpateProfile(token, req.body);
        req.session.response = response;
        if (response.status === tokenExpired) {
            res.redirect('/logout');
        } else {
            res.redirect('/account');
        }
    } catch (error) {
        console.error(error);
    }
});

/* UPDATE IMAGE */
app.post('/profile/image', upload.single('file'), async (req, res) => {
    const token = req.session.token;
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
        filename: req.file.originalname, 
        contentType: req.file.mimetype,
    });

    try {
        const response = await sims.updateImage(token, formData);
        req.session.response = response;
        if (response.status === tokenExpired) {
            res.redirect('/logout');
        }else{
            res.redirect('/account');
        }
    } catch (error) {
        console.error(error);
    }
});

/* LOGOUT */
app.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error(error);
        }
    });
    res.redirect('/login');
});

app.use((req, res, next) => {
    // res.status(404).send('404 Not Found');
    res.render('404', {
        currentPath: '/',
        layout,
        title: '404',
    })
});