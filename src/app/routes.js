module.exports = (aplicacion, pasaporte) => {

    // index routes
    aplicacion.get('/', (requiere, resultado) => {
        resultado.render('indice');
        
    });

    //login view
    aplicacion.get('/login', (requiere, resultado) => {
        resultado.render('login', {
            message: requiere.flash('loginMessage')
        });
        
    });

    aplicacion.post('/login', pasaporte.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // signup view
    aplicacion.get('/signup', (requiere, resultado) => {
        resultado.render('signup', {
            message: requiere.flash('signupMessage')
        });
        
    });

    aplicacion.post('/signup', pasaporte.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true  // allow flash messages
    }));

    //profile view
    aplicacion.get('/profile', logeado, (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });

    aplicacion.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

function logeado(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}