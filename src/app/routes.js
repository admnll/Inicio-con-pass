module.exports = (aplicacion, pasaporte) => {

    aplicacion.get('/', (requiere, resultado) => {
        resultado.render('indice');
        
    });

    aplicacion.get('/login', (requiere, resultado) => {
        resultado.render('login', {
            message:requiere.flash('loginMessage')
        });
        
    });

    // aplicacion.post('/login', pasaporte.authenticate(''));

    aplicacion.get('/signup', (requiere, resultado) => {
        resultado.render('signup', {
            message:requiere.flash('signupMessage')
        });
        
    });

    aplicacion.post('/signup', pasaporte.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
    }));

    aplicacion.get('/profile', (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });

};